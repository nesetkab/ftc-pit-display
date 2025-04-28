import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const FTC_EVENTS_API_URL = "https://ftc-api.firstinspires.org/v2.0/";
const HEADERS = { "Authorization": `Basic ${process.env.FTC_API_KEY}` };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path, ...query } = req.query;

  if (!path) {
    return res.status(400).json({ error: "Missing 'path' parameter in query." });
  }

  try {
    const url = `${FTC_EVENTS_API_URL}${path}`;
    const response = await axios.get(url, {
      headers: HEADERS,
      params: query,
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error in proxy:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
  }
}

export const fetchRankings = async (season: string, eventCode: string) => {
  const url = `/api/proxy`;
  try {
    const response = await axios.get(url, {
      params: { path: `${season}/rankings/${eventCode}` },
    });
    return response.data.rankings || [];
  } catch (error) {
    console.error('Error fetching rankings:', error);
    throw error;
  }
};

export const fetchTeams = async (season: string, eventCode: string) => {
  const url = `/api/proxy`;
  try {
    const response = await axios.get(url, {
      params: { path: `${season}/teams`, eventCode },
    });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const fetchSchedule = async (season: string, eventCode: string, teamNumber: string) => {
  const url = `/api/proxy`;
  try {
    console.log(`Fetching schedule for season: ${season}, eventCode: ${eventCode}`);
    const response = await axios.get(url, {
      params: { path: `${season}/schedule/${eventCode}?teamNumber=${teamNumber}` },
    });
    console.log('Schedule Response:', response.data);
    return response.data.schedule || [];
  } catch (error: any) {
    console.error('Error in fetchSchedule:', error.response?.data || error.message);
    throw error;
  }
};