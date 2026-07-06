import { NextRequest, NextResponse } from 'next/server';

const ADMIN_REALM = 'Wedding RSVP Admin';

export function middleware(request: NextRequest) {
  const username = process.env.WEDDING_ADMIN_USERNAME;
  const password = process.env.WEDDING_ADMIN_PASSWORD;

  if (!username || !password) {
    return new NextResponse('Not found', { status: 404 });
  }

  const authorization = request.headers.get('authorization');
  if (!isAuthorized(authorization, username, password)) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': `Basic realm="${ADMIN_REALM}", charset="UTF-8"`,
      },
    });
  }

  return NextResponse.next();
}

function isAuthorized(authorization: string | null, username: string, password: string): boolean {
  if (!authorization?.startsWith('Basic ')) {
    return false;
  }

  try {
    const credentials = atob(authorization.slice('Basic '.length));
    const separatorIndex = credentials.indexOf(':');

    if (separatorIndex === -1) {
      return false;
    }

    const submittedUsername = credentials.slice(0, separatorIndex);
    const submittedPassword = credentials.slice(separatorIndex + 1);

    return submittedUsername === username && submittedPassword === password;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ['/wedding/admin/:path*'],
};
