import { NextResponse } from 'next/server';
import { verifyAdminCredentials, signAdminToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    const isValid = await verifyAdminCredentials(email, password);
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }

    const token = signAdminToken({
      email: email.trim().toLowerCase(),
      role: 'admin',
      name: 'Shivansh Admin'
    });

    const response = NextResponse.json({ 
      success: true, 
      message: 'Login successful',
      user: { email, name: 'Shivansh Admin', role: 'admin' }
    });

    // Set secure cookie
    response.cookies.set({
      name: 'shivansh_admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 });
  }
}
