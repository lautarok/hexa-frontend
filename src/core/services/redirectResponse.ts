"use server"

import { NextRequest, NextResponse } from "next/server";

export default function redirectResponse(req: NextRequest, url: string) {
    console.log(444)
    return NextResponse.redirect(
        new URL(url, req.nextUrl.origin)
    )
}