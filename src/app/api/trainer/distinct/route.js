import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Trainer } from '@/lib/models/trainer.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const field = filter.field || '';
  
  try {
    const trainers = await Trainer.distinct(field);
    
    return NextResponse.json({
      type: 'S',
      message: 'Distinct Success',
      trainers,
    });
  } catch (error) {
    console.log('distinct trainer error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

