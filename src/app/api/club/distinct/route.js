import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Club } from '@/lib/models/club.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const field = filter.field || '';
  
  try {
    const clubs = await Club.distinct(field);
    
    return NextResponse.json({
      type: 'S',
      message: 'Distinct Success',
      clubs,
    });
  } catch (error) {
    console.log('distinct club error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

