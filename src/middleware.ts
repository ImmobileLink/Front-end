import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
 
let locales = ['pt', 'en']

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  
  const pathname = req.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
  
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });
  await supabase.auth.getSession();


  if (pathnameIsMissingLocale) {
    const locale: string = req.headers.get('accept-language')?.slice(0,2) || 'pt'; // pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3
    // const i18nCookies: string[] = ['i18n', locale]
    
 
    // e.g. incoming req is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, req.url)
    )
  }

  return res;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};