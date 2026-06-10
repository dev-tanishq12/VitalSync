import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/api-auth";
import { db } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (auth.error || !auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const goalsSnapshot = await db.collection("goals")
      .where("userId", "==", auth.user.id)
      .orderBy("startDate", "desc")
      .get();

    const goals = goalsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ goals });
  } catch (error) {
    console.error("Goals GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (auth.error || !auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const data = await req.json();
    
    const newGoalData = {
      userId: auth.user.id,
      title: data.title,
      description: data.description || "",
      targetValue: parseFloat(data.targetValue),
      currentValue: 0,
      unit: data.unit,
      status: "active",
      startDate: new Date().toISOString(),
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
    };

    const docRef = await db.collection("goals").add(newGoalData);

    return NextResponse.json({ goal: { id: docRef.id, ...newGoalData } }, { status: 201 });
  } catch (error) {
    console.error("Goals POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
