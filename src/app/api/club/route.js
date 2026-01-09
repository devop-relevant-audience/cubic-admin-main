import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Club } from '@/lib/models/club.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const sort = JSON.parse(searchParams.get('sort') || '{}');
  const limit = parseInt(searchParams.get('limit') || '100');
  const skip = parseInt(searchParams.get('skip') || '0');
  const select = searchParams.get('select') || '';
  
  try {
    const clubs = await Club.find(filter)
      .select(select)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean({ virtuals: true });
    
    const count = await Club.countDocuments(filter);
    
    return NextResponse.json({
      type: 'S',
      message: 'Get Success',
      clubs,
      count,
    });
  } catch (error) {
    console.log('get club error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const club = new Club(data);
    await club.save();
    
    return NextResponse.json({
      type: 'S',
      _id: club._id,
      message: 'Create Success',
    }, { status: 201 });
  } catch (error) {
    console.log('create club error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

