// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// const SECRET_KEY = 'secret';

// export async function GET(req) {
//   const cookies = req.cookies.get('token');

//   if (!cookies) {
//     return NextResponse.json({ isValid: false }, { status: 401 });
//   }

//   try {
//     const decoded = jwt.verify(cookies.value, SECRET_KEY);
//     return NextResponse.json({ isValid: true, role: decoded.role });
//   } catch (error) {
//     return NextResponse.json({ isValid: false }, { status: 403 });
//   }
// }


import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secret';

export async function GET(req) {
  const cookies = req.cookies.get('authToken');

  if (!cookies) {
    return NextResponse.json({ isValid: false }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(cookies.value, SECRET_KEY);
    return NextResponse.json({ isValid: true, role: decoded.role });
  } catch (error) {
    return NextResponse.json({ isValid: false }, { status: 403 });
  }
}
