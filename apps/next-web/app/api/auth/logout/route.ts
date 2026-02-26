import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  try {
    // MUST match original cookie options exactly
    const deleteCookie = serialize("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      expires: new Date(0),  // absolute delete
      maxAge: 0,             // double enforcement
    });

    const res = NextResponse.json({ ok: true, message: "logged_out" });
    res.headers.set("Set-Cookie", deleteCookie);

    return res;
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

