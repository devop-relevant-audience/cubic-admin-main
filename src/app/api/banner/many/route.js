import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Banner } from '@/lib/models/banner.model';

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const banners = await Banner.insertMany(data.banners);
    
    return NextResponse.json({
      type: 'S',
      message: 'Create Many Success',
      banners,
    }, { status: 201 });
  } catch (error) {
    console.log('create many banner error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

