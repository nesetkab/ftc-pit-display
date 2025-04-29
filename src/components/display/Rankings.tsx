import React from 'react';
import { ResizableBox } from 'react-resizable';

type RankingType = {
  teamNumber: number;
  rank: number;
};

type RankingsProps = {
  rankings: RankingType[];
};

export const Rankings: React.FC<RankingsProps> = ({ rankings }) => {
  return (
    <ResizableBox
      width={300}
      height={200}
      minConstraints={[200, 150]}
      maxConstraints={[600, 400]}
      resizeHandles={['se']}
      className="p-4  shadow rounded"
    >
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
    </ResizableBox>
  );
};