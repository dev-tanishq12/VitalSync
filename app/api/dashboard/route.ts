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
    // Fetch today's records
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const recordsSnapshot = await db.collection("health_records")
      .where("userId", "==", userId)
      .where("recordedAt", ">=", today.toISOString())
      .get();

    const records = recordsSnapshot.docs.map(doc => doc.data());

    // Default metrics if no data yet
    const metrics = {
      heartRate: records.find(r => r.metricType === "heart_rate" || r.metricType === "Heart Rate (BPM)")?.value || 62,
      steps: records.find(r => r.metricType === "steps" || r.metricType === "Steps")?.value || 8432,
      sleep: records.find(r => r.metricType === "sleep")?.value || 7.2,
      calories: records.find(r => r.metricType === "calories")?.value || 1850,
      readinessScore: 84, // mock data for UI
    };

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
