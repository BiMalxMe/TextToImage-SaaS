import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    return NextResponse.json({ exists: !!user }); // ✅ return true if user found, false otherwise
  } catch (error) {
    console.error('Error checking user:', error);
    return NextResponse.json(
      { error: 'Failed to check user', exists: false },
      { status: 500 }
    );
  }
}
