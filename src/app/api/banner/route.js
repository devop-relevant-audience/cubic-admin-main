import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Banner } from '@/lib/models/banner.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const sort = JSON.parse(searchParams.get('sort') || '{}');
  const limit = parseInt(searchParams.get('limit') || '100');
  const skip = parseInt(searchParams.get('skip') || '0');
  const select = searchParams.get('select') || '';
  
  try {
    const banners = await Banner.find(filter)
      .select(select)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean({ virtuals: true });
    
    const count = await Banner.countDocuments(filter);
    
    return NextResponse.json({
      type: 'S',
      message: 'Get Success',
      banners,
      count,
    });
  } catch (error) {
    console.log('get banner error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const banner = new Banner(data);
    await banner.save();
    
    return NextResponse.json({
      type: 'S',
      _id: banner._id,
      message: 'Create Success',
    }, { status: 201 });
  } catch (error) {
    console.log('create banner error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

