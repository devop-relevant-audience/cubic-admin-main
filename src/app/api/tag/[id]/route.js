import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Tag } from '@/lib/models/tag.model';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const tag = await Tag.findById(id).lean({ virtuals: true });
    return NextResponse.json({ type: 'S', message: 'Get Id Success', tag });
  } catch (error) {
    console.log('get tag by id error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = await params;
  const data = await request.json();
  
  try {
    await Tag.findOneAndUpdate({ _id: id }, data);
    return NextResponse.json({ type: 'S', message: 'Update Success' });
  } catch (error) {
    console.log('update tag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    await Tag.findByIdAndDelete(id);
    return NextResponse.json({ type: 'S', message: 'Remove Success' });
  } catch (error) {
    console.log('remove tag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

