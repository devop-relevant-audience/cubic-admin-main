import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Trainer } from '@/lib/models/trainer.model';

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const trainers = await Trainer.insertMany(data.trainers);
    
    return NextResponse.json({
      type: 'S',
      message: 'Create Many Success',
      trainers,
    }, { status: 201 });
  } catch (error) {
    console.log('create many trainer error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

