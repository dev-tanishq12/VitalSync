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
    const docRef = db.collection("user_profiles").doc(auth.user.id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      return NextResponse.json({ profile: docSnap.data() });
    } else {
      // Return a default profile if none exists
      return NextResponse.json({ 
        profile: { 
          weight: 0, 
          height: 0, 
          bloodType: "-", 
          location: "Unknown",
          bio: "VitalSync User" 
        } 
      });
    }
  } catch (error) {
    console.error("Profile GET error:", error);
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
    const docRef = db.collection("user_profiles").doc(auth.user.id);
    
    // Merge true to only update provided fields
    await docRef.set(data, { merge: true });

    return NextResponse.json({ success: true, profile: data });
  } catch (error) {
    console.error("Profile POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
