import { NextResponse } from 'next/server';
import { getPackages, updatePackage } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const packages = await getPackages();
    return NextResponse.json({ success: true, packages });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Package ID required' }, { status: 400 });
    }

    const updated = await updatePackage(id, updateData);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, package: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update package' }, { status: 500 });
  }
}
