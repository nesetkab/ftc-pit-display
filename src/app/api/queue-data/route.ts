import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const teamNumber = '12345'; // Replace with actual team number
    const data = await fetchQueuingData(teamNumber);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch queuing data' }, { status: 500 });
  }
}
async function fetchQueuingData(teamNumber: string) {
  const apiUrl = `https://ftc-events.firstinspires.org/api/queuing/${teamNumber}`;
  const apiKey = process.env.FTC_API_KEY; // Ensure you have this set in your environment variables

  if (!apiKey) {
    throw new Error('FTC_API_KEY is not set in environment variables');
  }

  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
}
