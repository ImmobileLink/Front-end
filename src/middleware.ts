import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Database } from "../lib/database.types";

let locales = ["pt", "en"];

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const pathnameIsMissingLocale = locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );
    const res = NextResponse.next();
    const supabase = createMiddlewareClient<Database>({ req, res });
    await supabase.auth.getSession();

    const isNotArchive = 
    pathname.includes('.ico') || pathname.includes('.png') || pathname.includes('.jpg') 
      || pathname.includes('.jpeg') || pathname.includes('.svg');
      
        if (pathnameIsMissingLocale && !isNotArchive) {
            let lang = "";
            let referer = req.headers.get("referer");
            if (referer != null) {
                let langUrl = new URL(referer);
                lang = langUrl.pathname.split("/")?.[1];
                console.log(referer);
            }
            if (!locales.includes(lang)) {
                lang = "pt";
            }
            const locale: string = lang; // pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3

            // if(pathname.substring(3) == "/auth") {
            //   return NextResponse.redirect(
            //     new URL(`/${locale}/feed`, req.url)
            //   )
            // }

            return NextResponse.redirect(
                new URL(`/${locale}/${pathname}`, req.url)
            );
        }

    return res;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
