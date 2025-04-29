"use client";

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchRankings, fetchSchedule } from '@/utils/api';
import { Header } from '@/components/display/Header';
import { Footer } from '@/components/display/Footer';
import { Rankings } from '@/components/display/Rankings';
import { Performance } from '@/components/display/Performance';
import { CurrentMatch } from '@/components/display/CurrentMatch';
import { NextMatch } from '@/components/display/NextMatch';
import 'react-resizable/css/styles.css';

type Ranking = {
  teamNumber: number;
  rank: number;
  wins: number;
  losses: number;
  ties: number;
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

  const fetchData = useCallback(async () => {
    if (!eventCode || !team) {
      setError('Missing event code or team.');
      return;
    }

    try {
      console.log(`Fetching data for eventCode: ${eventCode}, team: ${team}`);

      const [rankingsData, scheduleData] = await Promise.all([
        fetchRankings('2024', eventCode),
        fetchSchedule('2024', eventCode, team),
      ]);

      setRankings(rankingsData);
      setSchedule(scheduleData);

      const now = new Date();
      const futureMatches = scheduleData.filter(
        (match: Match) => new Date(match.startTime) > now
      );
      const sortedMatches = futureMatches.sort(
        (a: Match, b: Match) => 
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );

      setCurrentMatch(sortedMatches[0] || null);
      setNextMatch(sortedMatches[1] || null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    }
  }, [eventCode, team]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const teamRanking = rankings.find(
    (ranking) => ranking.teamNumber === parseInt(team)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header teamNumber={team} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Rankings rankings={rankings} />
          <Performance teamRanking={teamRanking} />
          <CurrentMatch match={currentMatch} />
          <NextMatch match={nextMatch} />
        </div>
      </main>

      <Footer onRefresh={fetchData} />
    </div>
  );
};

export default DisplayPage;