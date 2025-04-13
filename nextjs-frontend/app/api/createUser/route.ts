import { prisma } from '@/prisma'; // Ensure this path is correct
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse json form the protected page
    const { email, fullName } = await request.json();
    console.log('Received email:', email);
    console.log('Received fullName:', fullName);

    // Validate the data (you can add more checks as needed)
    if (!email || !fullName) {
      return NextResponse.json({ error: 'Email and full name are required' }, { status: 400 });
    }

    // Attempt to create the user in the database
    const user = await prisma.user.create({
      data: {
        email: email || "", // Default to empty string if undefined
        fullName: fullName || "", // Default to empty string if undefined
      },
    });

    console.log('Created user:', user);

    return NextResponse.json({ message: 'User created successfully', user }, { status: 200 });
  } catch (error) {
    console.error('Error creating user:', error);

    // Provide more detailed error response

    //Linitng issue so solved while prod

    // @ts-expect-error - component type is not inferred correctly
    return NextResponse.json({ error: 'Failed to create user', details: error.message  }, { status: 500 });
  }
}
