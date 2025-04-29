import React from 'react';
import { ResizableBox } from 'react-resizable';
import { format } from 'date-fns';

type MatchType = {
  matchNumber: number;
  startTime: string;
  teams: { teamNumber: number; alliance: string }[];
};

type CurrentMatchProps = {
  match: MatchType | null;
};

export const CurrentMatch: React.FC<CurrentMatchProps> = ({ match }) => {
  return (
    <ResizableBox
      width={300}
      height={200}
      minConstraints={[200, 150]}
      maxConstraints={[600, 400]}
      resizeHandles={['se']}
      className="p-4  shadow rounded"
    >
      <h2 className="text-2xl font-semibold mb-4">Current Match</h2>
      {match ? (
        <div>
          <p>
            <strong>Match Number:</strong> {match.matchNumber}
          </p>
          <p>
            <strong>Start Time:</strong>{' '}
            {format(new Date(match.startTime), 'PPpp')}
          </p>
          <p>
            <strong>Teams:</strong>{' '}
            {match.teams
              .map((team) => `${team.teamNumber} (${team.alliance})`)
              .join(', ')}
          </p>
        </div>
      ) : (
        <p>No current match available.</p>
      )}
    </ResizableBox>
  );
};