import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { createClient } from '@/utils/supabase/server';
import { userPage } from './constants/userPath';

const LANDING_PAGE = '/';
const USER_PAGE = userPage;

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (LANDING_PAGE === pathname || USER_PAGE.includes(pathname)) {
    return await updateSession(request);
  }

  const supabase = createClient();
  const { data } = await supabase
    .from('links')
    .select()
    .is('active', true)
    .eq('nickname', pathname.slice(1))
    .single();

  console.log('data', data);

  if (data?.url) {
    await supabase
      .from('links')
      .update({ view: data?.view + 1 })
      .match({ nickname: pathname.slice(1) });

    return NextResponse.redirect(data.url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
