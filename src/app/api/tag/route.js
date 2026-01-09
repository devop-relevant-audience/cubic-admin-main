import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Tag } from '@/lib/models/tag.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const sort = JSON.parse(searchParams.get('sort') || '{}');
  const limit = parseInt(searchParams.get('limit') || '100');
  const skip = parseInt(searchParams.get('skip') || '0');
  const select = searchParams.get('select') || '';
  
  try {
    const tags = await Tag.find(filter)
      .select(select)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean({ virtuals: true });
    
    const count = await Tag.countDocuments(filter);
    
    return NextResponse.json({
      type: 'S',
      message: 'Get Success',
      tags,
      count,
    });
  } catch (error) {
    console.log('get tag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const tag = new Tag(data);
    await tag.save();
    
    return NextResponse.json({
      type: 'S',
      _id: tag._id,
      message: 'Create Success',
    }, { status: 201 });
  } catch (error) {
    console.log('create tag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

