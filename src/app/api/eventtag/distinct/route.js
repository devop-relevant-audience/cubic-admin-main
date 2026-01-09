import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Eventtag } from '@/lib/models/eventtag.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const field = filter.field || '';
  
  try {
    const eventtags = await Eventtag.distinct(field);
    
    return NextResponse.json({
      type: 'S',
      message: 'Distinct Success',
      eventtags,
    });
  } catch (error) {
    console.log('distinct eventtag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

