import { NextResponse } from 'next/server';
import { fetchQueuingData } from '@/utils/api';

export async function GET() {
  try {
    const teamNumber = '12345'; // Replace with actual team number
    const data = await fetchQueuingData(teamNumber);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch queuing data' }, { status: 500 });
  }
}