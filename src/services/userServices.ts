// services/userService.ts
import { prisma } from '../lib/prisma';

interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  role:string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
}

export async function createUser({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  gender,
  role,
  birthDay,
  birthMonth,
  birthYear,
}: CreateUserInput) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      role,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      birthDay,
      birthMonth,
      birthYear,
    },
  });
  return user;
}
