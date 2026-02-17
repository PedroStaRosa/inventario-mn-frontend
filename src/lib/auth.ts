"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@/types/api";
import { getUserService } from "@/services/userService";

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

export async function getUser(): Promise<User | null> {
  try {
    const token = await getToken();

    if (!token) {
      return null;
    }
    // Verificar se o token expirou antes de fazer a requisição
    const decoded = jwt.decode(token) as { exp?: number } | null;
    if (decoded?.exp) {
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        // Token expirado - apenas retornar null, não modificar cookies aqui
        return null;
      }
    }
    const user = await getUserService(token);

    if (!user) {
      /* await removeToken(); */
      return null;
    }

    return user;
  } catch (err) {
    /* await removeToken(); */
    console.log("Erro ao obter usuário:", err);
    return null;
  }
}
