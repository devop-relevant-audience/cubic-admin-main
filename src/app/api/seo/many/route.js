import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Seo } from '@/lib/models/seo.model';

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const seos = await Seo.insertMany(data.seos);
    
    return NextResponse.json({
      type: 'S',
      message: 'Create Many Success',
      seos,
    }, { status: 201 });
  } catch (error) {
    console.log('create many seo error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

