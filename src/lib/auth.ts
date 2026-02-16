import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "inventario-mn";

export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function setToken(token: string) {
  const cookieStore = await cookies();

  const decodedToken = jwt.decode(token) as { exp?: number };

  const expiresIn = decodedToken?.exp
    ? decodedToken.exp - Math.floor(Date.now() / 1000)
    : 60 * 60 * 24 * 7;

  const maxAge = expiresIn;

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "strict", // Proteção CSRF
    secure: process.env.NODE_ENV === "production",
  });
}

export async function removeToken() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
