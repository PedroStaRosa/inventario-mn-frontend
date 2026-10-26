"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const COOKIE_NAME = "inventario-mn";
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

  export async function getToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if(!token){
      return null;
    }
    return token;
  }

  export async function requireToken(): Promise<string> {
    const token = await getToken();
    if (!token) redirect("/auth/login");
    return token;
  }

  export async function deleteToken(): Promise<void> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if(!token){
      redirect("/auth/login");
    }
    cookieStore.delete(COOKIE_NAME);
  }