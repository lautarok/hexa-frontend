import { NextRequest, NextResponse } from "next/server";

type AppGuard = {
    canActivate?: (req: NextRequest) => Promise<void | NextResponse>
    matchers?: RegExp[]
}

export default AppGuard