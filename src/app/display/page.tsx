"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchRankings, fetchSchedule } from '@/utils/api';
import { format } from 'date-fns';

type Ranking = {
  teamNumber: number;
  rank: number;
};

type Match = {
  matchNumber: number;
  startTime: string;
  teams: { teamNumber: number; alliance: string }[];
};

const DisplayPage = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [schedule, setSchedule] = useState<Match[]>([]);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [nextMatch, setNextMatch] = useState<Match | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const eventCode = searchParams?.get('eventCode') || '';
  const team = searchParams?.get('team') || '';

  useEffect(() => {
    if (!eventCode || !team) {
      setError('Missing event code or team.');
      return;
    }

    const fetchData = async () => {
      try {
        console.log(`Fetching data for eventCode: ${eventCode}, team: ${team}`);

        // Fetch rankings
        const rankingsData = await fetchRankings('2024', eventCode);
        console.log('Fetched Rankings:', rankingsData);
        setRankings(rankingsData);

        // Fetch schedule
        const scheduleData = await fetchSchedule('2024', eventCode, team);
        console.log('Fetched Schedule:', scheduleData);
        setSchedule(scheduleData);

        // Determine current and next matches
        const now = new Date();
        const futureMatches = scheduleData.filter(
          (match: Match) => new Date(match.startTime) > now
        );
        const sortedMatches = futureMatches.sort(
          (a: Match, b: Match) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );

        setCurrentMatch(sortedMatches[0] || null);
        setNextMatch(sortedMatches[1] || null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, [eventCode, team]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-3xl font-bold mb-6">Team {team} Display</h1>

      {/* Rankings Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Rankings</h2>
        {rankings.length > 0 ? (
          <ul className="list-disc pl-6">
            {rankings.map((ranking) => (
              <li key={ranking.teamNumber}>
                Team {ranking.teamNumber}: Rank {ranking.rank}
              </li>
            ))}
          </ul>
        ) : (
          <p>No rankings available.</p>
        )}
      </div>

      {/* Current Match Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Match</h2>
        {currentMatch ? (
          <div className="p-4 bg-white shadow rounded">
            <p>
              <strong>Match Number:</strong> {currentMatch.matchNumber}
            </p>
            <p>
              <strong>Start Time:</strong>{' '}
              {format(new Date(currentMatch.startTime), 'PPpp')}
            </p>
            <p>
              <strong>Teams:</strong>{' '}
              {currentMatch.teams
                .map((team) => `${team.teamNumber} (${team.alliance})`)
                .join(', ')}
            </p>
          </div>
        ) : (
          <p>No current match available.</p>
        )}
      </div>

      {/* Next Match Section */}
      <div className="mb-8 ">
        <h2 className="text-2xl font-semibold mb-4">Next Match</h2>
        {nextMatch ? (
          <div className="p-4 shadow rounded">
            <p>
              <strong>Match Number:</strong> {nextMatch.matchNumber}
            </p>
            <p>
              <strong>Start Time:</strong>{' '}
              {format(new Date(nextMatch.startTime), 'PPpp')}
            </p>
            <p>
              <strong>Teams:</strong>{' '}
              {nextMatch.teams
                .map((team) => `${team.teamNumber} (${team.alliance})`)
                .join(', ')}
            </p>
          </div>
        ) : (
          <p>No next match available.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayPage;