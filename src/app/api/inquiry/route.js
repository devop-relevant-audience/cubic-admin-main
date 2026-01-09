import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Inquiry } from '@/lib/models/inquiry.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const sort = JSON.parse(searchParams.get('sort') || '{}');
  const limit = parseInt(searchParams.get('limit') || '100');
  const skip = parseInt(searchParams.get('skip') || '0');
  const select = searchParams.get('select') || '';
  
  try {
    const inquiries = await Inquiry.find(filter)
      .select(select)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean({ virtuals: true });
    
    const count = await Inquiry.countDocuments(filter);
    
    return NextResponse.json({
      type: 'S',
      message: 'Get Success',
      inquiries,
      count,
    });
  } catch (error) {
    console.log('get inquiry error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const inquiry = new Inquiry(data);
    await inquiry.save();
    
    return NextResponse.json({
      type: 'S',
      _id: inquiry._id,
      message: 'Create Success',
    }, { status: 201 });
  } catch (error) {
    console.log('create inquiry error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

