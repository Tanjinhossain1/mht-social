// app/api/users/route.ts
import { prisma } from '@/lib/prisma';
import { createUser } from '@/services/userServices';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { email, password, firstName, lastName, dateOfBirth, gender } = await req.json();

    if (!email || !password || !firstName) {
        return NextResponse.json({ error: 'Email, password, and first name are required' }, { status: 400 });
    }
   // Check if user already exists
   const existingUser = await prisma.user.findUnique({ where: { email } });
        
   if (existingUser) {
       return NextResponse.json({success:false, error: 'User already exists' }, { status: 400 });
   }

    try {
        const user = await createUser({ email, password, firstName, lastName, dateOfBirth, gender });
        return NextResponse.json({ success: true, message: "User created successfully", data: user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}
