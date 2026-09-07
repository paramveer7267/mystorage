import { api } from "./api";

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
}

export interface RegisterResponse {
  message: string;
  userId: string;
  email: string;
}

export async function login(email: string, password: string) {
  return api<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function register(email: string, password: string) {
  return api<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function getMe(token: string) {
  return api<{
    userId: string;
    email: string;
  }>("/auth/me", {
    token,
  });
}
