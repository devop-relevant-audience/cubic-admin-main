import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Club } from '@/lib/models/club.model';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const club = await Club.findById(id).lean({ virtuals: true });
    return NextResponse.json({ type: 'S', message: 'Get Id Success', club });
  } catch (error) {
    console.log('get club by id error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = await params;
  const data = await request.json();
  
  try {
    await Club.findOneAndUpdate({ _id: id }, data);
    return NextResponse.json({ type: 'S', message: 'Update Success' });
  } catch (error) {
    console.log('update club error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    await Club.findByIdAndDelete(id);
    return NextResponse.json({ type: 'S', message: 'Remove Success' });
  } catch (error) {
    console.log('remove club error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

