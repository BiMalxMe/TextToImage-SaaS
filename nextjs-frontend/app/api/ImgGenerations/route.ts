import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Use getAuth to get the authentication object

  
  // Get prompt and image URL from the request body
  const { prompt, imageUrl ,email} = await req.json();

  // Ensure prompt and imageUrl are provided
  if (!prompt || !imageUrl) {
    return new NextResponse(JSON.stringify({ error: "Missing prompt or image URL" }), { status: 400 });
  }

  // Find the user in the database by userId
  const dbUser = await prisma.user.findFirst({
    where: { id: email },  // Use userId to find the user in the database
  });

  if (!dbUser) {
    return new NextResponse(JSON.stringify({ error: "User not found in database" }), { status: 404 });
  }

  // Create a new image generation record in the database
  const imageGenerated = await prisma.imageGenerated.create({
    data: {
      prompt,        
      imageUrl,     
      userId: dbUser.id,  
    },
  });
  

  return new NextResponse(JSON.stringify({ imageGenerated }), { status: 201 });
}
