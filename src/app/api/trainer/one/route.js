import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Trainer } from '@/lib/models/trainer.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const sort = JSON.parse(searchParams.get('sort') || '{}');
  const select = searchParams.get('select') || '';
  
  try {
    const trainer = await Trainer.findOne(filter)
      .select(select)
      .sort(sort)
      .lean({ virtuals: true });
    
    return NextResponse.json({
      type: 'S',
      message: 'Get One Success',
      trainer,
    });
  } catch (error) {
    console.log('get one trainer error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

