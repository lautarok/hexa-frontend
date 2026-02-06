import { NextRequest } from "next/server";

export default function getRequestLocale(req: NextRequest) {
    const { pathname } = req.nextUrl,
        locale = pathname.split('/')[1] || 'es'
        
    return locale
}