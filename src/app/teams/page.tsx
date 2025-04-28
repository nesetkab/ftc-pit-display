"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchTeams } from '@/utils/api';

const TeamSelectionPage = () => {
  const [teams, setTeams] = useState<{ teamNumber: number }[]>([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const eventCode = searchParams?.get('eventCode') || '';

  useEffect(() => {
    if (!eventCode) {
      alert('Event code is missing. Redirecting to the landing page.');
      router.push('/');
      return;
    }

    const fetchTeamsData = async () => {
      try {
        const teamsData = await fetchTeams('2024', eventCode);
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError('Failed to fetch teams. Please try again later.');
      }
    };

    fetchTeamsData();
  }, [eventCode, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTeam) {
      alert('Please select a team.');
      return;
    }

    router.push(`/display?eventCode=${eventCode}&team=${selectedTeam}`);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Select Your Team</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-64"
        >
          <option value="" disabled>Select a team</option>
          {teams.map((team) => (
            <option key={team.teamNumber} value={team.teamNumber}>
              {team.teamNumber}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default TeamSelectionPage;