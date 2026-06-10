import { NextRequest, NextResponse } from "next/server";
import { auth, db } from "./firebase-admin";

export async function authenticateRequest(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Missing or invalid authorization header", status: 401 };
  }

  const token = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await auth.verifyIdToken(token);
    const userRef = db.collection("users").doc(decodedToken.uid);
    const userDoc = await userRef.get();
    
    // If the user doesn't exist in our DB yet, create them.
    if (!userDoc.exists) {
      const newUser = {
        id: decodedToken.uid,
        email: decodedToken.email || "",
        name: decodedToken.name || "Optimizer User",
        createdAt: new Date().toISOString(),
      };
      await userRef.set(newUser);
      return { user: newUser, status: 200 };
    }
    
    return { user: userDoc.data() as any, status: 200 };
  } catch (error) {
    console.error("Auth error:", error);
    return { error: "Invalid token", status: 401 };
  }
}
