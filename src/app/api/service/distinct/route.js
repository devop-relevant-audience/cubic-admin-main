import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Service } from '@/lib/models/service.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const field = filter.field || '';
  
  try {
    const services = await Service.distinct(field);
    
    return NextResponse.json({
      type: 'S',
      message: 'Distinct Success',
      services,
    });
  } catch (error) {
    console.log('distinct service error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

