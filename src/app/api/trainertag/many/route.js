import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Trainertag } from '@/lib/models/trainertag.model';

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const trainertags = await Trainertag.insertMany(data.trainertags);
    
    return NextResponse.json({
      type: 'S',
      message: 'Create Many Success',
      trainertags,
    }, { status: 201 });
  } catch (error) {
    console.log('create many trainertag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

