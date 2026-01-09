import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Inquiry } from '@/lib/models/inquiry.model';

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const inquiries = await Inquiry.insertMany(data.inquiries);
    
    return NextResponse.json({
      type: 'S',
      message: 'Create Many Success',
      inquiries,
    }, { status: 201 });
  } catch (error) {
    console.log('create many inquiry error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

