import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ALLOWED_HOSTS } from "@config/constants";

const TOKEN = process.env.NOTIONER_TOKEN_MINI || "";
const allowedIPs = process.env.ALLOWED_IPS?.split(",") || [];

/**
 * Validates if the given IP address is in the list of allowed IP addresses.
 *
 * @param {string} ip - The IP address to be validated.
 * @return {boolean} Returns true if the IP address is in the list of allowed IP addresses, otherwise false.
 */
const validateIP = (ip: string): boolean => {
  return allowedIPs.includes(ip);
};

/**
 * Validates if the given hostname is in the list of allowed hosts.
 *
 * @param {string} hostname - The hostname to be validated.
 * @return {boolean} Returns true if the hostname is in the list of allowed hosts, otherwise false.
 */
const validateHostname = (hostname: string): boolean => {
  return ALLOWED_HOSTS.includes(hostname);
};

/**
 * Validates the format and content of the provided token.
 *
 * @param {string} token - The token to be validated.
 * @return {boolean} Indicates whether the token is valid.
 */
const validateToken = (token: string): boolean => {
  const tokenParts = token.split(" ");
  const isValidFormat = tokenParts.length === 2 && tokenParts[0] === "Bearer";
  const providedToken = isValidFormat ? tokenParts[1] : token;

  return providedToken === TOKEN;
};

// const storeAuthStatus = (status: boolean) => {
//   localStorage.setItem("authStatus", status ? "true" : "false");
// };

/**
 * A function to verify the authentication of a request.
 *
 * @param {NextRequest} request - The request object containing URL, cookies, and headers.
 * @return {Promise<NextResponse>} A Promise that resolves to the next response.
 */
export async function verifyAuth(request: NextRequest) {
  const requestIp = request.headers.get("x-forwarded-for") || request.ip || "127.0.0.1";
  const { hostname } = new URL(request.url);
  const authToken = getAuthToken(request);

  const isAuthorized = isAuthorizedRequest(hostname, authToken, requestIp);

  if (!isAuthorized) {
    return NextResponse.rewrite(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

/**
 * Retrieves the authentication token from various sources in the request object.
 *
 * @param {NextRequest} request - The request object containing URL, cookies, and headers.
 * @return {string} The authentication token retrieved from query parameters, cookies, or headers.
 */
function getAuthToken(request: NextRequest): string {
  const searchParams = new URL(request.url).searchParams;
  const tokenFromQueryParam = searchParams.get("token");
  const tokenFromCookie = request.cookies.get("token")?.value;
  const tokenFromHeader = request.headers.get("authorization") || request.headers.get("Authorization");

  return tokenFromQueryParam || tokenFromCookie || tokenFromHeader || "";
}

/**
 * Checks if the request is authorized based on the hostname, auth token, and request IP.
 *
 * @param {string} hostname - The hostname of the request.
 * @param {string} authToken - The authentication token of the request.
 * @param {string} requestIp - The IP address of the request.
 * @return {boolean} Returns true if the request is authorized, false otherwise.
 */
function isAuthorizedRequest(hostname: string, authToken: string, requestIp: string): boolean {
  return validateHostname(hostname) || validateToken(authToken) || validateIP(requestIp);
}

export default verifyAuth;
