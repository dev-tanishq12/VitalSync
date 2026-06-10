import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/api-auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  const authResult = await authenticateRequest(req);
  if (authResult.error || !authResult.user) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Provide a system instruction as part of the model configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are 'Vital AI Coach', an elite, highly professional, and encouraging health and fitness advisor built into the VitalSync app. Your tone is expert yet human. Answer questions concisely and focus on actionable insights. Address the user by their name: ${authResult.user.name}.`,
    });

    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
      history,
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const responseText = result.response.text();

    return NextResponse.json({ message: responseText }, { status: 200 });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 });
  }
}
