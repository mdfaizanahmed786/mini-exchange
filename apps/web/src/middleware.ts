import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token=await getToken({req: request})
  const url=request.nextUrl;
 
  if(token 
    &&
    (url.pathname.startsWith("/api/auth/signin") || url.pathname.startsWith("/api/auth/signout"))

  ){
    return NextResponse.redirect(new URL('/', request.url))
  
  }
  
  if(!token && url.pathname.startsWith("/")){
    return NextResponse.redirect(new URL('/api/auth/signin', request.url))
  }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/api/:path*'],
}