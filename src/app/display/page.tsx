"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchMatchData, fetchQueuingData } from '@/utils/api';
import { format } from 'date-fns';

const DisplayPage = () => {
  const [matchData, setMatchData] = useState<any[] | null>(null);
  const [queueData, setQueueData] = useState<{ teamNumber: string; matchNumber: number; queuePosition: number; }[] | null>(null);
  const searchParams = useSearchParams();

  const eventCode = searchParams.get('eventCode');
  const team = searchParams.get('team');

  useEffect(() => {
    if (!eventCode || !team) {
      alert('Missing event code or team. Redirecting to the landing page.');
      window.location.href = '/';
      return;
    }

    const fetchData = async () => {
      try {
        const matchData = await fetchMatchData(eventCode, parseInt(team));
        setMatchData(matchData);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchData();
  }, [eventCode, team]);

  useEffect(() => {
    if (!eventCode) {
      return;
    }

    const fetchQueueData = async () => {
      try {
        const queueData = await fetchQueuingData(eventCode);
        const transformedQueueData = queueData.map((item: { teamNumber: number; matchNumber?: number; queuePosition?: number }) => ({
          teamNumber: item.teamNumber.toString(),
          matchNumber: item.matchNumber || 0,
          queuePosition: item.queuePosition || 0,
        }));
        setQueueData(transformedQueueData);
      } catch (error) {
        console.error('Error fetching queue data:', error);
      }
    };

    fetchQueueData();
  }, [eventCode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-3xl font-bold mb-6">Team {team} - Event {eventCode}</h1>
      <h2 className="text-2xl mb-4">Match Schedule:</h2>
      <div className="flex flex-col gap-4">
        {matchData && matchData.map((match: any) => (
          <div key={match.matchId} className="bg-white p-4 rounded shadow w-96 text-black">
            <h3 className="text-xl font-bold mb-2 text-black">Match {match.match.matchNum} - {match.match.description}</h3>
            <p><strong>Scheduled Time:</strong> {format(new Date(match.match.scheduledStartTime), 'PPpp')}</p>
            <p><strong>Alliance:</strong> {match.alliance}</p>
            <p><strong>Partner:</strong> {match.match.teams.filter((t: any) => t.team.number !== parseInt(team || '0')).map((t: any) => t.team.number).join(', ')}</p>
            <p><strong>Opponents:</strong> {match.match.teams.filter((t: any) => t.team.number !== parseInt(team || '0') && t.team.number !== match.teamNumber).map((t: any) => t.team.number).join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayPage;