import axios from 'axios';

const FTC_EVENTS_API_URL = "https://ftc-api.firstinspires.org/v2.0/";
const HEADERS = { "Authorization": `Basic ${Buffer.from(process.env.FTC_API_KEY || '').toString('base64')}` };

export const fetchRankings = async (season: string, eventCode: string) => {
  const url = `/api/proxy`;
  try {
    console.log(`Fetching rankings for season: ${season}, eventCode: ${eventCode}`);
    const response = await axios.get(url, {
      params: { path: `${season}/rankings/${eventCode}` },
    });
    console.log('Rankings Response:', response.data);
    return response.data.rankings || [];
  } catch (error: any) {
    console.error('Error in fetchRankings:', error.response?.data || error.message);
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
    console.error('Error in fetchRankings:', error.response?.data || error.message);
    throw error;
  }
};


export const fetchMatches = async (season: string, eventCode: string) => {
  const url = `${FTC_EVENTS_API_URL}/${season}/matches/${eventCode}`;
  try {
    const response = await axios.get(url, { headers: HEADERS });
    return response.data.matches || [];
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};

export const fetchTeams = async (season: string, eventCode: string) => {
  const url = `/api/proxy`;
  try {
    const response = await axios.get(url, {
      params: { path: `${season}/teams`, eventCode },
    });
    return response.data.teams || []; // Ensure we access the `teams` property
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};