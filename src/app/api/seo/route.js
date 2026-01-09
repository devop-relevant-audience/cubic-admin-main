import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Seo } from '@/lib/models/seo.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const sort = JSON.parse(searchParams.get('sort') || '{}');
  const limit = parseInt(searchParams.get('limit') || '100');
  const skip = parseInt(searchParams.get('skip') || '0');
  const select = searchParams.get('select') || '';
  
  try {
    const seos = await Seo.find(filter)
      .select(select)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean({ virtuals: true });
    
    const count = await Seo.countDocuments(filter);
    
    return NextResponse.json({
      type: 'S',
      message: 'Get Success',
      seos,
      count,
    });
  } catch (error) {
    console.log('get seo error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const seo = new Seo(data);
    await seo.save();
    
    return NextResponse.json({
      type: 'S',
      _id: seo._id,
      message: 'Create Success',
    }, { status: 201 });
  } catch (error) {
    console.log('create seo error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

