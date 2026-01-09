import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Seo } from '@/lib/models/seo.model';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const seo = await Seo.findById(id).lean({ virtuals: true });
    return NextResponse.json({ type: 'S', message: 'Get Id Success', seo });
  } catch (error) {
    console.log('get seo by id error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = await params;
  const data = await request.json();
  
  try {
    await Seo.findOneAndUpdate({ _id: id }, data);
    return NextResponse.json({ type: 'S', message: 'Update Success' });
  } catch (error) {
    console.log('update seo error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = await params;
  
  try {
    await Seo.findByIdAndDelete(id);
    return NextResponse.json({ type: 'S', message: 'Remove Success' });
  } catch (error) {
    console.log('remove seo error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

