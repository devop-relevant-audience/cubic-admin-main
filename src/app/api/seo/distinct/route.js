import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Seo } from '@/lib/models/seo.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const field = filter.field || '';
  
  try {
    const seos = await Seo.distinct(field);
    
    return NextResponse.json({
      type: 'S',
      message: 'Distinct Success',
      seos,
    });
  } catch (error) {
    console.log('distinct seo error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

