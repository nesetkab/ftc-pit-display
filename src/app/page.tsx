"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const [eventCode, setEventCode] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventCode) {
      alert('event code');
      return;
    }

    router.push(`/teams?eventCode=${eventCode}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold mb-6">ftc pit display</h1>
      <p className="text-lg mb-4">enter event code:</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="event code"
          value={eventCode}
          onChange={(e) => setEventCode(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
