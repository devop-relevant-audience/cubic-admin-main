import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Tag } from '@/lib/models/tag.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const field = filter.field || '';
  
  try {
    const tags = await Tag.distinct(field);
    
    return NextResponse.json({
      type: 'S',
      message: 'Distinct Success',
      tags,
    });
  } catch (error) {
    console.log('distinct tag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

