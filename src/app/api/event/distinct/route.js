import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Event } from '@/lib/models/event.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const field = filter.field || '';
  
  try {
    const events = await Event.distinct(field);
    
    return NextResponse.json({
      type: 'S',
      message: 'Distinct Success',
      events,
    });
  } catch (error) {
    console.log('distinct event error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

