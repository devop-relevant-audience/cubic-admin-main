import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Eventtag } from '@/lib/models/eventtag.model';

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const eventtags = await Eventtag.insertMany(data.eventtags);
    
    return NextResponse.json({
      type: 'S',
      message: 'Create Many Success',
      eventtags,
    }, { status: 201 });
  } catch (error) {
    console.log('create many eventtag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

