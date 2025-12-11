import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const BACKEND_LOGIN = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sign-in`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
  console.log(BACKEND_LOGIN)
    // Forward login to backend
    const backendRes = await fetch(BACKEND_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const backendText = await backendRes.text();
    let backendJson: any;
    try {
      backendJson = JSON.parse(backendText);
    } catch (e) {
      // backend didn't return JSON
      backendJson = { raw: backendText };
    }

    if (!backendRes.ok) {
      // return backend error to client
      return NextResponse.json(backendJson, { status: backendRes.status });
    }

    // If backend returned a token in JSON, use it to set cookie on frontend origin
    const token = backendJson?.token ?? backendJson?.data?.token ?? backendJson?.data?.sendUserToken ?? null;

    // If token present, set cookie from Next.js (frontend) origin
    if (token) {
      const cookieSerialized = serialize('token', String(token), {
        httpOnly: true,
        secure: true,        // frontend is HTTPS — keep this true in prod
        sameSite: 'none',    // allow cross-site if needed; safe here since cookie is set by frontend
        path: '/',
        maxAge: 24 * 60 * 60, // 1 day
      });

      const res = NextResponse.json({ ok: true, data: backendJson }, { status: 200 });
      res.headers.set('Set-Cookie', cookieSerialized);
      return res;
    }

    // If backend set Set-Cookie headers itself, forward them to the client
    const backendSetCookie = backendRes.headers.get('set-cookie');
    if (backendSetCookie) {
      // Forward backend Set-Cookie header(s) directly
      const res = NextResponse.json({ ok: true, data: backendJson }, { status: 200 });
      res.headers.set('Set-Cookie', backendSetCookie);
      return res;
    }

    // Fallback: return backend body without setting cookie
    return NextResponse.json({ ok: true, data: backendJson }, { status: 200 });
  } catch (err: any) {
    console.error('Sign-in proxy error:', err);
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}

