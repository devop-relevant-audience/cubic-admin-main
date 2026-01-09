import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Inquiry } from '@/lib/models/inquiry.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const field = filter.field || '';
  
  try {
    const inquiries = await Inquiry.distinct(field);
    
    return NextResponse.json({
      type: 'S',
      message: 'Distinct Success',
      inquiries,
    });
  } catch (error) {
    console.log('distinct inquiry error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

