import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Trainer } from '@/lib/models/trainer.model';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const filter = JSON.parse(searchParams.get('filter') || '{}');
  const sort = JSON.parse(searchParams.get('sort') || '{}');
  const limit = parseInt(searchParams.get('limit') || '100');
  const skip = parseInt(searchParams.get('skip') || '0');
  const select = searchParams.get('select') || '';
  const searchText = searchParams.get('searchText');
  
  try {
    let queryFilter = { ...filter };
    
    if (searchText) {
      const searchRegex = { $regex: searchText, $options: 'i' };
      queryFilter.$or = [
        { name: searchRegex },
        { trainer_tag: { $elemMatch: searchRegex } },
      ];
    }
    
    const trainers = await Trainer.find(queryFilter)
      .select(select)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean({ virtuals: true });
    
    const count = await Trainer.countDocuments(filter);
    
    // Sort by current_index
    const sortedTrainers = trainers.sort((a, b) => a.current_index - b.current_index);
    
    return NextResponse.json({
      type: 'S',
      message: 'Get Success',
      trainers: sortedTrainers,
      count,
    });
  } catch (error) {
    console.log('get trainer error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const totalTrainer = await Trainer.countDocuments();
    const trainer = new Trainer({
      ...data,
      current_index: totalTrainer + 1,
    });
    await trainer.save();
    
    return NextResponse.json({
      type: 'S',
      _id: trainer._id,
      message: 'Create Success',
    }, { status: 201 });
  } catch (error) {
    console.log('create trainer error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

