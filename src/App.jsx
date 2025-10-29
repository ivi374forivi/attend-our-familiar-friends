import React, { useState } from 'react';
import CalendarCard from './components/calendar/CalendarCard';

function App() {
  const [currentDate] = useState(new Date());
  const [theme] = useState('park');

  const handleJournalClick = () => {
    console.log('Journal clicked');
    // Will connect to JournalModal
  };

  const handleAiClick = () => {
    console.log('AI Chat clicked');
    // Will connect to AiModal
  };

  const handleFavoritesClick = () => {
    console.log('Favorites clicked');
    // Will connect to FavoritesModal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          DogTale Daily
        </h1>

        <CalendarCard
          date={currentDate}
          theme={theme}
          onJournalClick={handleJournalClick}
          onAiClick={handleAiClick}
          onFavoritesClick={handleFavoritesClick}
        />
      </div>
    </div>
  );
}

export default App;
