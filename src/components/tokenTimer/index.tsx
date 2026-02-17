"use client";
import { useEffect } from "react";
import { useState } from "react";
import jwt from "jsonwebtoken";
import { logoutAction } from "@/actions/userActions";

type TokenTimerProps = {
  token: string;
};

function calculateRemaining(token: string): number {
  try {
    const decoded = jwt.decode(token) as { exp?: number } | null;
    if (!decoded?.exp) {
      return 0;
    }

    const expInMs = decoded.exp * 1000;
    const nowInMs = Date.now();
    const remainingTime = expInMs - nowInMs;
    return Math.max(remainingTime, 0);
  } catch {
    return 0;
  }
}

export default function TokenTimer({ token }: TokenTimerProps) {
  const [remainingMs, setRemainingMs] = useState<number>(() =>
    calculateRemaining(token)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const reaminig = calculateRemaining(token);
      setRemainingMs(reaminig);

      if (reaminig === 0) {
        logoutAction();
      }
    }, 1000); // atualiza a cada segundo

    return () => clearInterval(interval);
  }, [token]);

  const minutes = Math.floor(remainingMs / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);

  return (
    <div className="font-bold flex ">
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}
