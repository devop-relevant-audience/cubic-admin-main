import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Service } from '@/lib/models/service.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const sort = JSON.parse(searchParams.get('sort') || '{}');
  const limit = parseInt(searchParams.get('limit') || '100');
  const skip = parseInt(searchParams.get('skip') || '0');
  const select = searchParams.get('select') || '';
  
  try {
    const services = await Service.find(filter)
      .select(select)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean({ virtuals: true });
    
    const count = await Service.countDocuments(filter);
    
    // Sort by current_index
    const sortedServices = services.sort((a, b) => a.current_index - b.current_index);
    
    return NextResponse.json({
      type: 'S',
      message: 'Get Success',
      services: sortedServices,
      count,
    });
  } catch (error) {
    console.log('get service error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const totalService = await Service.countDocuments();
    const service = new Service({
      ...data,
      current_index: totalService + 1,
    });
    await service.save();
    
    return NextResponse.json({
      type: 'S',
      _id: service._id,
      message: 'Create Success',
    }, { status: 201 });
  } catch (error) {
    console.log('create service error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

