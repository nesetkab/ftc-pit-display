import React from 'react';
import { ResizableBox } from 'react-resizable';

type TeamRanking = {
  teamNumber: number;
  rank: number;
  wins: number;
  losses: number;
  ties: number;
};

type PerformanceProps = {
  teamRanking: TeamRanking | undefined;
};

export const Performance: React.FC<PerformanceProps> = ({ teamRanking }) => {
  return (
    <ResizableBox
      width={300}
      height={200}
      minConstraints={[200, 150]}
      maxConstraints={[600, 400]}
      resizeHandles={['se']}
      className="p-4  shadow rounded"
    >
      <h2 className="text-2xl font-semibold mb-4">Performance</h2>
      {teamRanking ? (
        <div>
          <p>
            <strong>Wins:</strong> {teamRanking.wins}
          </p>
          <p>
            <strong>Losses:</strong> {teamRanking.losses}
          </p>
          <p>
            <strong>Ties:</strong> {teamRanking.ties}
          </p>
        </div>
      ) : (
        <p>No performance data available.</p>
      )}
    </ResizableBox>
  );
};