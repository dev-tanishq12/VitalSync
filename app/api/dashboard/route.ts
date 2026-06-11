import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/api-auth";
import { db } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (auth.error || !auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const userId = auth.user.id;

  try {
    // Fetch records for the past 7 days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const recordsSnapshot = await db.collection("health_records")
      .where("userId", "==", userId)
      .where("recordedAt", ">=", sevenDaysAgo.toISOString())
      .get();

    const records = recordsSnapshot.docs.map(doc => doc.data());

    // Group the latest values for each metric
    const latestMetrics: any = {
      heartRate: 0,
      steps: 0,
      sleep: 0,
      calories: 0,
      hydration: 0,
      activeMinutes: 0
    };

    const weeklyActivity = [0, 0, 0, 0, 0, 0, 0]; // 0 is 6 days ago, 6 is today

    records.forEach(r => {
      const type = r.metricType?.toLowerCase() || "";
      const recordDate = new Date(r.recordedAt);
      
      // Weekly activity grouping
      const recordDay = new Date(recordDate);
      recordDay.setHours(0, 0, 0, 0);
      const dayDiff = Math.floor((today.getTime() - recordDay.getTime()) / (1000 * 3600 * 24));
      
      if (dayDiff >= 0 && dayDiff <= 6 && r.recordType !== "goal") {
        const dayIndex = 6 - dayDiff;
        if (type.includes("step")) {
          weeklyActivity[dayIndex] = Math.max(weeklyActivity[dayIndex], Number(r.value));
        } else if (type.includes("active") || type.includes("minute")) {
          // Fallback: active minutes * 100 roughly equivalent to steps
          weeklyActivity[dayIndex] += Number(r.value) * 100;
        }
      }

      // Today's metrics grouping
      if (recordDate >= today && r.recordType !== "goal") {
        if (type.includes("heart") && !latestMetrics.heartRate) latestMetrics.heartRate = Number(r.value);
        if (type.includes("step")) latestMetrics.steps = Math.max(latestMetrics.steps, Number(r.value));
        if (type.includes("sleep")) latestMetrics.sleep = Math.max(latestMetrics.sleep, Number(r.value));
        if (type.includes("calor")) latestMetrics.calories = Math.max(latestMetrics.calories, Number(r.value));
        if (type.includes("water") || type.includes("hydrat")) {
          latestMetrics.hydration += Number(r.value); // sum hydration
        }
        if (type.includes("active") || type.includes("minute")) {
          latestMetrics.activeMinutes += Number(r.value); // sum active minutes
        }
      }
    });

    // Calculate a dynamic readiness score
    let score = 50;
    if (latestMetrics.sleep >= 7) score += 15;
    else if (latestMetrics.sleep > 5) score += 5;
    
    if (latestMetrics.steps > 8000) score += 15;
    else if (latestMetrics.steps > 4000) score += 5;
    
    if (latestMetrics.activeMinutes > 30) score += 10;
    
    if (latestMetrics.heartRate > 50 && latestMetrics.heartRate < 70) score += 10;

    latestMetrics.readinessScore = Math.min(100, Math.max(0, score));

    // Convert weekly activity to percentages for the graph
    const maxActivity = Math.max(...weeklyActivity, 5000); // Minimum scale of 5000 steps
    const weeklyPercentages = weeklyActivity.map(val => Math.round(Math.min(100, (val / maxActivity) * 100)));

    return NextResponse.json({ 
      metrics: latestMetrics,
      weeklyActivity: weeklyPercentages
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
