import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const currentUser = request.cookies.get("userId")?.value;

  

  if (currentUser) {
    if (pathname === "/Login" || pathname === "/Signup") {
    
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (pathname !== "/Login" && pathname !== "/Signup") {
      console.log("Redirecting non-logged-in user to /Login");
      return NextResponse.redirect(new URL("/Login", request.url));
    }
  }

  console.log("Allowing request to proceed as normal");
  return NextResponse.next();
}

export const config = {
  matcher: ["/Login", "/Signup"],
};