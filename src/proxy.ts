import "server-only"

import type { NextRequest } from 'next/server'
import runGuards from "./core/guards/runGuards"
import hasUsernameGuard from "./core/guards/hasUsernameGuard"
import authGuard from "./core/guards/authGuard"
import emptyUsernameGuard from "./core/guards/emptyUsernameGuard"
import guestGuard from "./core/guards/guestGuard"

export default async function AppProxy(request: NextRequest) {
  return await runGuards(request, [
    authGuard(),
    guestGuard(),
    emptyUsernameGuard(),
    hasUsernameGuard()
  ])
}

export const config = {
  matcher: ["/es/:path*", "/en/:path*", "/fr/:path*", "/pt/:path*", "/nl/:path*"],
}