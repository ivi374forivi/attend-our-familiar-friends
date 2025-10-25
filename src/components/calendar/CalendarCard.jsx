import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarCard = ({
  date,
  theme = 'park',
  onJournalClick,
  onAiClick,
  onFavoritesClick,
  journalEntry = null,
  favoriteCount = 0
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [todayImage, setTodayImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Theme gradients
  const themeGradients = {
    park: 'from-lime-400 to-emerald-600',
    beach: 'from-sky-400 to-blue-600',
    forest: 'from-green-500 to-green-800',
    tundra: 'from-cyan-400 to-sky-700'
  };

  // Fetch daily image
  useEffect(() => {
    const fetchDailyImage = async () => {
      setLoading(true);
      try {
        const isDog = !isFlipped;
        const endpoint = isDog
          ? 'https://dog.ceo/api/breeds/image/random'
          : 'https://api.thecatapi.com/v1/images/search';

        const response = await fetch(endpoint);
        const data = await response.json();

        const imageUrl = isDog ? data.message : data[0].url;
        setTodayImage(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyImage();
  }, [isFlipped, date]);

  const formatDate = () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative preserve-3d">
        <motion.div
          className={`glass-effect rounded-custom-lg p-6 bg-gradient-to-br ${themeGradients[theme]}`}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Card Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-xl font-bold">{formatDate()}</h3>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Flip card"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Image Container */}
          <div className="relative h-64 mb-4 rounded-custom overflow-hidden bg-white/10">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.img
                  key={todayImage}
                  src={todayImage}
                  alt={isFlipped ? "Cat of the day" : "Dog of the day"}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            )}

            {/* Animal Type Badge */}
            <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-white text-sm font-medium">
                {isFlipped ? '🐱 Cat Mode' : '🐕 Dog Mode'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={onJournalClick}
              className="glass-effect p-3 rounded-custom hover:bg-white/20 transition-all text-white flex flex-col items-center gap-1"
            >
              <span className="text-2xl">📝</span>
              <span className="text-xs">Journal</span>
            </button>

            <button
              onClick={onAiClick}
              className="glass-effect p-3 rounded-custom hover:bg-white/20 transition-all text-white flex flex-col items-center gap-1"
            >
              <span className="text-2xl">✨</span>
              <span className="text-xs">AI Chat</span>
            </button>

            <button
              onClick={onFavoritesClick}
              className="glass-effect p-3 rounded-custom hover:bg-white/20 transition-all text-white flex flex-col items-center gap-1 relative"
            >
              <span className="text-2xl">⭐</span>
              <span className="text-xs">Favorites</span>
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </button>
          </div>

          {/* Journal Entry Preview */}
          {journalEntry && (
            <div className="mt-4 p-3 glass-effect rounded-custom">
              <p className="text-white/80 text-sm truncate">{journalEntry}</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CalendarCard;
