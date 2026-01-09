import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Service } from '@/lib/models/service.model';

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const services = await Service.insertMany(data.services);
    
    return NextResponse.json({
      type: 'S',
      message: 'Create Many Success',
      services,
    }, { status: 201 });
  } catch (error) {
    console.log('create many service error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

