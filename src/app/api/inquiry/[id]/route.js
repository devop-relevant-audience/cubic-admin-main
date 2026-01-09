import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Inquiry } from '@/lib/models/inquiry.model';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const inquiry = await Inquiry.findById(id).lean({ virtuals: true });
    return NextResponse.json({ type: 'S', message: 'Get Id Success', inquiry });
  } catch (error) {
    console.log('get inquiry by id error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = await params;
  const data = await request.json();
  
  try {
    await Inquiry.findOneAndUpdate({ _id: id }, data);
    return NextResponse.json({ type: 'S', message: 'Update Success' });
  } catch (error) {
    console.log('update inquiry error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    await Inquiry.findByIdAndDelete(id);
    return NextResponse.json({ type: 'S', message: 'Remove Success' });
  } catch (error) {
    console.log('remove inquiry error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

