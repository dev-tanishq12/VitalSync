import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/api-auth";
import { db } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (auth.error || !auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const recordsSnapshot = await db.collection("health_records")
      .where("userId", "==", auth.user.id)
      .orderBy("recordedAt", "desc")
      .limit(50)
      .get();

    const records = recordsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ records });
  } catch (error) {
    console.error("Records GET error:", error);
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
    const newRecordData = {
      userId: auth.user.id,
      metricType: data.metricType,
      value: parseFloat(data.value),
      unit: data.unit || "unit",
      recordType: data.recordType || "metric",
      recordedAt: data.recordedAt ? new Date(data.recordedAt).toISOString() : new Date().toISOString(),
    };

    const docRef = await db.collection("health_records").add(newRecordData);

    return NextResponse.json({ record: { id: docRef.id, ...newRecordData } }, { status: 201 });
  } catch (error) {
    console.error("Records POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (auth.error || !auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const recordsSnapshot = await db.collection("health_records")
      .where("userId", "==", auth.user.id)
      .where("recordedAt", ">=", today.toISOString())
      .get();

    const batch = db.batch();
    recordsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    return NextResponse.json({ success: true, count: recordsSnapshot.size });
  } catch (error) {
    console.error("Records DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
