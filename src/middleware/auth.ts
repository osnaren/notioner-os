import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY || "";

const allowedIPs = process.env.ALLOWED_IPS?.split(",") || [];

export async function verifyAuth(req: NextRequest) {
  const requestIP = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";
  const { hostname, searchParams } = new URL(req.url);

  const unauthorized =
    !validateHostname(hostname) || !validateToken(searchParams.get("token") || "") || !validateIP(requestIP);

  if (unauthorized) {
    return NextResponse.rewrite(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

const validateIP = (ip: string) => {
  return allowedIPs.includes(ip);
};
const validateHostname = (hostname: string) => {
  return hostname === "localhost" || hostname === "127.0.0.1";
};

const validateToken = (token: string): boolean => {
  const tokenParts = token.split(" ");
  const isValidFormat = tokenParts.length === 2 && tokenParts[0] === "Bearer";
  const providedToken = isValidFormat ? tokenParts[1] : token;

  try {
    const decoded = jwt.verify(providedToken, JWT_SECRET);
    return !!decoded;
  } catch {
    return false;
  }
};

export default verifyAuth;
