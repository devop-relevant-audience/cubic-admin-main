import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Trainertag } from '@/lib/models/trainertag.model';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const trainertag = await Trainertag.findById(id).lean({ virtuals: true });
    return NextResponse.json({ type: 'S', message: 'Get Id Success', trainertag });
  } catch (error) {
    console.log('get trainertag by id error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = await params;
  const data = await request.json();
  
  try {
    await Trainertag.findOneAndUpdate({ _id: id }, data);
    return NextResponse.json({ type: 'S', message: 'Update Success' });
  } catch (error) {
    console.log('update trainertag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    await Trainertag.findByIdAndDelete(id);
    return NextResponse.json({ type: 'S', message: 'Remove Success' });
  } catch (error) {
    console.log('remove trainertag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

