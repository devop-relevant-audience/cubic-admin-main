import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Event } from '@/lib/models/event.model';

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const events = await Event.insertMany(data.events);
    
    return NextResponse.json({
      type: 'S',
      message: 'Create Many Success',
      events,
    }, { status: 201 });
  } catch (error) {
    console.log('create many event error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

