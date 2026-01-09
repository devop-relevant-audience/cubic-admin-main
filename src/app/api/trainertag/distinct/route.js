import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Trainertag } from '@/lib/models/trainertag.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const field = filter.field || '';
  
  try {
    const trainertags = await Trainertag.distinct(field);
    
    return NextResponse.json({
      type: 'S',
      message: 'Distinct Success',
      trainertags,
    });
  } catch (error) {
    console.log('distinct trainertag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

