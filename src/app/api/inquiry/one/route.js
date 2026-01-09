import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Inquiry } from '@/lib/models/inquiry.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const sort = JSON.parse(searchParams.get('sort') || '{}');
  const select = searchParams.get('select') || '';
  
  try {
    const inquiry = await Inquiry.findOne(filter)
      .select(select)
      .sort(sort)
      .lean({ virtuals: true });
    
    return NextResponse.json({
      type: 'S',
      message: 'Get One Success',
      inquiry,
    });
  } catch (error) {
    console.log('get one inquiry error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

