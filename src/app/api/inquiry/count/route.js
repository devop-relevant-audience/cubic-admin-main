import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Inquiry } from '@/lib/models/inquiry.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  
  try {
    const count = await Inquiry.countDocuments(filter);
    
    return NextResponse.json({
      type: 'S',
      message: 'Count Success',
      count,
    });
  } catch (error) {
    console.log('count inquiry error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

