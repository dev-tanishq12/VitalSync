import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/api-auth";
import { db } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (auth.error || !auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    // Just fetch some general stats or aggregated data for insights
    const recordsSnapshot = await db.collection("health_records")
      .where("userId", "==", auth.user.id)
      .orderBy("recordedAt", "desc")
      .limit(100)
      .get();
      
    const records = recordsSnapshot.docs.map(doc => doc.data());

    return NextResponse.json({ 
      trends: {
        recovery: 85,
        strain: 62,
        sleepDebt: "1.2h",
      },
      records 
    });
  } catch (error) {
    console.error("Insights API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
