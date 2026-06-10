import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/api-auth";
import { db } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (auth.error || !auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { provider } = await req.json();

    // Check if device already connected
    const devicesRef = db.collection("connected_devices");
    const snapshot = await devicesRef
      .where("userId", "==", auth.user.id)
      .where("provider", "==", provider)
      .limit(1)
      .get();

    let device;

    if (!snapshot.empty) {
      // Update sync time
      const doc = snapshot.docs[0];
      await doc.ref.update({ lastSync: new Date().toISOString() });
      device = { id: doc.id, ...doc.data(), lastSync: new Date().toISOString() };
    } else {
      // Create new connection
      const newDevice = {
        userId: auth.user.id,
        provider,
        status: "connected",
        lastSync: new Date().toISOString(),
      };
      const docRef = await devicesRef.add(newDevice);
      device = { id: docRef.id, ...newDevice };
    }

    // Since we are stubbing wearable integrations, we might optionally 
    // insert some mock data into HealthRecord here to simulate a sync.

    return NextResponse.json({ success: true, device }, { status: 200 });
  } catch (error) {
    console.error("Device Sync POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
