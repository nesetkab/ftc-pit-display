"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { gql, request } from 'graphql-request';

const GRAPHQL_ENDPOINT = 'https://api.ftcscout.org/graphql';

const TeamSelectionPage = () => {
  const [teams, setTeams] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const eventCode = searchParams.get('eventCode');

  useEffect(() => {
    if (!eventCode) {
      alert('Event code is missing. Redirecting to the landing page.');
      router.push('/');
      return;
    }

    const fetchTeams = async () => {
      try {
        const query = gql`
          query GetTeams($season: Int!, $code: String!) {
            eventByCode(season: $season, code: $code) {
              teams {
                teamNumber
              }
            }
          }
        `;

        const variables = { season: 2024, code: eventCode };
        interface Team {
          teamNumber: number;
        }

        interface EventByCodeResponse {
          eventByCode: {
            teams: Team[];
          };
        }

        const data: EventByCodeResponse = await request(GRAPHQL_ENDPOINT, query, variables);
        const teamNumbers = data.eventByCode.teams.map((team) => team.teamNumber.toString());
        setTeams(teamNumbers);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, [eventCode, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTeam) {
      alert('Please select a team.');
      return;
    }

    // Redirect to the main display page with event code and team
    router.push(`/display?eventCode=${eventCode}&team=${selectedTeam}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-3xl font-bold mb-6">Select Your Team</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-64"
        >
          <option value="" disabled>Select a team</option>
          {teams.map((team) => (
            <option key={team} value={team}>{team}</option>
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