import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/api-auth";
import { db } from "@/lib/firebase-admin";

export const runtime = 'nodejs';

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

export async function DELETE(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (auth.error || !auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing goal id" }, { status: 400 });
  }

  try {
    const goalRef = db.collection("goals").doc(id);
    const goalDoc = await goalRef.get();

    if (!goalDoc.exists) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    if (goalDoc.data()?.userId !== auth.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await goalRef.delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Goals DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
