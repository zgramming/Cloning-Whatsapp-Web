import { NextRequest, NextResponse } from 'next/server';
import { KEY_COOKIES_LOGIN } from '@/utils/constant';

const excludePathCheckingToken = (path: string) => {
  const startWithLogin = path.startsWith('/login');
  const startWithNext = path.startsWith('/_next');
  const startWithFavicon = path.startsWith('/favicon');
  const startWithRegister = path.startsWith('/register');
  const startWithUnsupport = path.startsWith('/unsupport');

  return startWithLogin || startWithNext || startWithFavicon || startWithRegister || startWithUnsupport;
};

function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const accessToken = request.cookies.get(KEY_COOKIES_LOGIN);

  const startWithLogin = url.startsWith('/login');
  const startWithRegister = url.startsWith('/register');
  const startWithUnsupport = url.startsWith('/unsupport');

  if (accessToken !== undefined && (startWithLogin || startWithRegister || startWithUnsupport)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  /// Check apakah url sekarang termaksud kedalam url yang tidak diikut sertakan pengecekan token
  if (excludePathCheckingToken(url)) {
    return NextResponse.next();
  }

  if (!excludePathCheckingToken(url)) {
    if (accessToken === undefined) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// eslint-disable-next-line import/prefer-default-export
export { middleware };
