import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Tag } from '@/lib/models/tag.model';

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const tags = await Tag.insertMany(data.tags);
    
    return NextResponse.json({
      type: 'S',
      message: 'Create Many Success',
      tags,
    }, { status: 201 });
  } catch (error) {
    console.log('create many tag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

