import { NextResponse } from 'next/server';
import { fetchMatches } from '@/utils/api';

export async function GET() {
  try {
    const eventCode = 'exampleEvent'; // Replace with actual event code
    const teamNumber = '12345'; // Replace with actual team number
    const data = await fetchMatches(eventCode, teamNumber);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch match data' }, { status: 500 });
  }
}