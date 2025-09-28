import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    backend: true,
    message: "CaRTiFY backend is live 🚀",
    timestamp: new Date().toISOString(),
  });
}
