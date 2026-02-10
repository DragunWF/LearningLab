/*
// Notes: This middleware is used to redirect the user to the about page

import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.redirect(new URL("/about", request.url));
}
*/

import { auth } from "./app/_lib/auth";

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
