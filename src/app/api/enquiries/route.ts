import { NextResponse } from 'next/server';
import { getEnquiries, createEnquiry } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const enquiries = await getEnquiries();
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      fullName, 
      mobile, 
      email, 
      eventType, 
      eventDate, 
      eventLocation, 
      guestCount, 
      approxBudget, 
      decorationPreference, 
      message 
    } = body;

    // Validate required fields
    if (!fullName || !mobile || !email || !eventType || !eventDate || !eventLocation) {
      return NextResponse.json({ 
        success: false, 
        error: 'Please fill in all required fields (Name, Mobile, Email, Event Type, Date, Location).' 
      }, { status: 400 });
    }

    // Basic mobile validation (at least 10 digits)
    const cleanedPhone = mobile.replace(/[^0-9]/g, '');
    if (cleanedPhone.length < 10) {
      return NextResponse.json({
        success: false,
        error: 'Please enter a valid 10-digit mobile number.'
      }, { status: 400 });
    }

    const newEnquiry = await createEnquiry({
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      email: email.trim().toLowerCase(),
      eventType,
      eventDate,
      eventLocation: eventLocation.trim(),
      guestCount: Number(guestCount) || 100,
      approxBudget: approxBudget || 'Flexible / To Be Discussed',
      decorationPreference: decorationPreference || '',
      message: message || ''
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you! Shivansh Decoration will contact you shortly.',
      enquiry: newEnquiry 
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return NextResponse.json({ success: false, error: 'Internal server error while saving enquiry' }, { status: 500 });
  }
}
