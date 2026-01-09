import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Tag } from '@/lib/models/tag.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const sort = JSON.parse(searchParams.get('sort') || '{}');
  const select = searchParams.get('select') || '';
  
  try {
    const tag = await Tag.findOne(filter)
      .select(select)
      .sort(sort)
      .lean({ virtuals: true });
    
    return NextResponse.json({
      type: 'S',
      message: 'Get One Success',
      tag,
    });
  } catch (error) {
    console.log('get one tag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

