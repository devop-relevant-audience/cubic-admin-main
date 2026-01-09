import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Seo } from '@/lib/models/seo.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  
  try {
    const count = await Seo.countDocuments(filter);
    
    return NextResponse.json({
      type: 'S',
      message: 'Count Success',
      count,
    });
  } catch (error) {
    console.log('count seo error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

