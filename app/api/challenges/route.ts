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
    const challengesSnapshot = await db.collection("challenges")
      .where("userId", "==", auth.user.id)
      .get();

    const challenges = challengesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ challenges });
  } catch (error) {
    console.error("Challenges GET error:", error);
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
    
    const newChallengeData = {
      userId: auth.user.id,
      challengeId: data.challengeId,
      title: data.title,
      description: data.description || "",
      targetValue: parseFloat(data.targetValue),
      currentValue: 0,
      unit: data.unit,
      status: "active",
      joinedAt: new Date().toISOString(),
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
    };

    const docRef = await db.collection("challenges").add(newChallengeData);

    return NextResponse.json({ challenge: { id: docRef.id, ...newChallengeData } }, { status: 201 });
  } catch (error) {
    console.error("Challenges POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (auth.error || !auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const data = await req.json();
    if (!data.id) {
      return NextResponse.json({ error: "Missing challenge id" }, { status: 400 });
    }

    const challengeRef = db.collection("challenges").doc(data.id);
    const doc = await challengeRef.get();

    if (!doc.exists || doc.data()?.userId !== auth.user.id) {
      return NextResponse.json({ error: "Challenge not found or unauthorized" }, { status: 404 });
    }

    await challengeRef.update({
      status: data.status || "completed"
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Challenges PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
