import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Trainer } from '@/lib/models/trainer.model';

// Special endpoint to get popular tags from trainer_tag field
export async function GET() {
  await connectDB();
  
  try {
    const topTags = await Trainer.aggregate([
      { $unwind: '$trainer_tag' },
      { $group: { _id: '$trainer_tag', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    
    return NextResponse.json({
      type: 'S',
      message: 'Top 5 Popular Tags',
      tags: topTags,
    });
  } catch (error) {
    console.log('get popular tag error', error);
    return NextResponse.json({ type: 'E', message: error.message }, { status: 500 });
  }
}

