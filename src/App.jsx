import { useState } from 'react';
import CalendarCard from './components/calendar/CalendarCard';
import ThemeSelector from './components/calendar/ThemeSelector';
import DateNavigation from './components/calendar/DateNavigation';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [theme, setTheme] = useState('park');

  const themes = [
    { name: 'park', label: 'Park', icon: '🌳', gradient: 'from-lime-400 to-emerald-600' },
    { name: 'beach', label: 'Beach', icon: '🏖️', gradient: 'from-sky-400 to-blue-600' },
    { name: 'forest', label: 'Forest', icon: '🌲', gradient: 'from-green-500 to-green-800' },
    { name: 'tundra', label: 'Tundra', icon: '❄️', gradient: 'from-cyan-400 to-sky-700' }
  ];

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
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
            DogTale Daily
          </h1>
          
          <p className="text-center text-gray-600 mb-6">
            Your daily dose of dog joy 🐾
          </p>

          <DateNavigation 
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />

          <ThemeSelector 
            currentTheme={theme}
            onThemeChange={setTheme}
            themes={themes}
          />

          <CalendarCard
            date={currentDate}
            theme={theme}
            onJournalClick={handleJournalClick}
            onAiClick={handleAiClick}
            onFavoritesClick={handleFavoritesClick}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
