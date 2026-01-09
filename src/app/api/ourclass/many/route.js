import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Ourclass } from '@/lib/models/ourclass.model';

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const ourclasses = await Ourclass.insertMany(data.ourclasses);
    
    return NextResponse.json({
      type: 'S',
      message: 'Create Many Success',
      ourclasses,
    }, { status: 201 });
  } catch (error) {
    console.log('create many ourclass error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

