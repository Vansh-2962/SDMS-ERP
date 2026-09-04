import { authClient } from "@/lib/auth.client";

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export async function signUp(input: SignUpInput) {
  return authClient.signUp.email({
    name: input.name,
    email: input.email,
    password: input.password,
  });
}

export async function signIn(input: SignInInput) {
  return authClient.signIn.email({
    email: input.email,
    password: input.password,
  });
}

export async function signOut() {
  return authClient.signOut();
}
