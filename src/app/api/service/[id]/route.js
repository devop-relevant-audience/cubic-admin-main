import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Service } from '@/lib/models/service.model';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const service = await Service.findById(id).lean({ virtuals: true });
    return NextResponse.json({ type: 'S', message: 'Get Id Success', service });
  } catch (error) {
    console.log('get service by id error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = await params;
  const data = await request.json();
  
  try {
    await Service.findOneAndUpdate({ _id: id }, data);
    return NextResponse.json({ type: 'S', message: 'Update Success' });
  } catch (error) {
    console.log('update service error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    await Service.findByIdAndDelete(id);
    return NextResponse.json({ type: 'S', message: 'Remove Success' });
  } catch (error) {
    console.log('remove service error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

