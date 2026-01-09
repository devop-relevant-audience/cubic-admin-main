import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Club } from '@/lib/models/club.model';

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const clubs = await Club.insertMany(data.clubs);
    
    return NextResponse.json({
      type: 'S',
      message: 'Create Many Success',
      clubs,
    }, { status: 201 });
  } catch (error) {
    console.log('create many club error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

