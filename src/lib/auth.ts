import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'shivansh-luxury-decoration-secret-key-2026';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@shivanshdecoration.com';
// Default password: Shivansh@2026
const DEFAULT_PASSWORD_HASH = '$2a$10$Ua6bE56V.e9m3K/v5595r.e.yJ3D4R6F0A91/0Y1k4J42Z5G9Gg6W'; 

export function signAdminToken(payload: { email: string; role: string; name: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; role: string; name: string };
  } catch (e) {
    return null;
  }
}

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();
  
  if (normalizedEmail === ADMIN_EMAIL.toLowerCase()) {
    if (password === 'Shivansh@2026') return true;
    try {
      return await bcrypt.compare(password, DEFAULT_PASSWORD_HASH);
    } catch {
      return password === 'Shivansh@2026';
    }
  }
  return false;
}

export function getAdminSession() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('shivansh_admin_token')?.value;
    if (!token) return null;
    return verifyAdminToken(token);
  } catch (e) {
    return null;
  }
}
