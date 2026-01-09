import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Ourclass } from '@/lib/models/ourclass.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const field = filter.field || '';
  
  try {
    const ourclasses = await Ourclass.distinct(field);
    
    return NextResponse.json({
      type: 'S',
      message: 'Distinct Success',
      ourclasses,
    });
  } catch (error) {
    console.log('distinct ourclass error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

