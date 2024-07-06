// services/userService.ts
import { prisma } from '../lib/prisma';

interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
}

export async function createUser({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  gender,
}: CreateUserInput) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      gender,
    },
  });
  return user;
}
