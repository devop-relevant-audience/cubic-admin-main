import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Ourclass } from '@/lib/models/ourclass.model';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const ourclass = await Ourclass.findById(id).lean({ virtuals: true });
    return NextResponse.json({ type: 'S', message: 'Get Id Success', ourclass });
  } catch (error) {
    console.log('get ourclass by id error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = await params;
  const data = await request.json();
  
  try {
    await Ourclass.findOneAndUpdate({ _id: id }, data);
    return NextResponse.json({ type: 'S', message: 'Update Success' });
  } catch (error) {
    console.log('update ourclass error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    await Ourclass.findByIdAndDelete(id);
    return NextResponse.json({ type: 'S', message: 'Remove Success' });
  } catch (error) {
    console.log('remove ourclass error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

