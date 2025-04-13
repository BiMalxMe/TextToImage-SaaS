import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, imageUrl, email } = await req.json();

  if (!prompt || !imageUrl) {
    return new NextResponse(JSON.stringify({ error: "Missing prompt or image URL" }), { status: 400 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { email },  // Fixed: query by email, not id
  });

  if (!dbUser) {
    return new NextResponse(JSON.stringify({ error: "User not found in database" }), { status: 404 });
  }
// generate using connection with userid
  const imageGenerated = await prisma.imageGenerated.create({
    data: {
      prompt,
      imageUrl,
      userId: dbUser.id,
    },
  });

  return new NextResponse(JSON.stringify({ imageGenerated }), { status: 201 });
}
