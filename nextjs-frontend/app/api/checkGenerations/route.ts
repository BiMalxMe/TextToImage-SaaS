import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  email: string;
}
//get the clients email as a body
export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
//finding user based on email as email is unique
// also including the imageGeneration to ensure it is found along
    const user = await prisma.user.findFirst({
      where: { email },
      include: { imageGenerations: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const transactions = user.imageGenerations;

    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
