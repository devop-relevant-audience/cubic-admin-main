import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Banner } from '@/lib/models/banner.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const field = filter.field || '';
  
  try {
    const banners = await Banner.distinct(field);
    
    return NextResponse.json({
      type: 'S',
      message: 'Distinct Success',
      banners,
    });
  } catch (error) {
    console.log('distinct banner error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

