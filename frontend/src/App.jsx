import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, User, X } from 'lucide-react';

function App() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const query = debouncedSearch ? `?search=${encodeURIComponent(debouncedSearch)}` : '';
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const res = await fetch(`${apiUrl}/list${query}`);
        const data = await res.json();
        setGames(data);
      } catch (error) {
        console.error('Failed to fetch', error);
      }
    };
    fetchGames();
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen bg-eneba-bg text-eneba-text font-sans pb-10">
      <header className="flex items-center justify-between px-6 py-4 bg-eneba-bg sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-8 w-full max-w-7xl mx-auto">
          <div className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-red-500 overflow-hidden flex items-center justify-center">
              <span className="text-white text-xs">E</span>
            </div>
            <span className="hidden md:block">eneba</span>
          </div>

          <div className="flex-1 max-w-2xl relative">
            <div className="flex items-center bg-[#4f358f] rounded-md border border-[#6444b0] overflow-hidden focus-within:ring-2 focus-within:ring-white/20 transition-all">
              <div className="pl-3 text-white/60">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for games..."
                className="w-full bg-transparent border-none outline-none text-white px-3 py-2.5 placeholder-white/50"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="pr-3 text-white/60 hover:text-white"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6 text-white/90">
            <div className="hidden md:flex items-center gap-1 text-sm font-medium">
              <span>English EU | EUR</span>
            </div>
            <button className="hover:text-white"><Heart size={24} /></button>
            <button className="hover:text-white"><ShoppingCart size={24} /></button>
            <button className="hover:text-white bg-slate-700/50 rounded-full p-1"><User size={24} /></button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-4 text-sm font-medium text-white/70">
          Results found: <span className="text-white">{games.length}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {games.length === 0 && (
          <div className="text-center py-20 text-white/50">
            No games found.
          </div>
        )}
      </main>
    </div>
  );
}

function GameCard({ game }) {
  const platformColor = game.platform.toLowerCase().includes('xbox') ? 'bg-[#107c10]' :
    game.platform.toLowerCase().includes('nintendo') ? 'bg-[#e60012]' :
      'bg-[#ff4747]';

  return (
    <div className="bg-eneba-card rounded-lg overflow-hidden border border-transparent hover:border-eneba-teal/50 transition-all group flex flex-col h-full">
      <div className="relative aspect-[3/4] bg-slate-800 overflow-hidden">
        <img
          src={game.image_url}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = 'https://placehold.co/350x450/492f80/FFF?text=Game'; }}
        />

        {game.cashback > 0 && (
          <div className="absolute bottom-20 left-2 bg-eneba-teal text-eneba-bg text-xs font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
            <span className="text-[10px]">↺</span> CASHBACK
          </div>
        )}

        <div className={`absolute bottom-0 left-0 right-0 h-8 ${platformColor} flex items-center px-3`}>
          <span className="text-white text-xs font-bold uppercase truncate">{game.platform}</span>
        </div>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-white font-bold text-sm leading-tight mb-2 line-clamp-2 min-h-[2.5em]">
          {game.title}
        </h3>

        <div className="mb-4">
          <span className="text-eneba-teal text-xs font-bold uppercase border border-eneba-teal/30 px-1 py-0.5 rounded-[3px]">
            {game.region}
          </span>
        </div>

        <div className="mt-auto">
          {game.discount > 0 && (
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-gray-400 text-xs line-through">
                {game.currency === 'EUR' ? '€' : '$'}{game.original_price.toFixed(2)}
              </span>
              <span className="text-white text-xs font-semibold bg-white/10 px-1 rounded-sm">
                -{game.discount}%
              </span>
            </div>
          )}

          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-gray-300">From</span>
              <span className="text-xl font-extrabold text-white">
                {game.currency === 'EUR' ? '€' : '$'}{game.price.toFixed(2)}
              </span>
              <div className="w-3.5 h-3.5 rounded-full border border-gray-500 text-gray-500 flex items-center justify-center text-[9px]">i</div>
            </div>
          </div>

          {game.cashback > 0 && (
            <div className="text-[10px] text-eneba-teal mt-0.5">
              Cashback: {game.currency === 'EUR' ? '€' : '$'}{game.cashback.toFixed(2)}
            </div>
          )}

          <div className="border-t border-white/10 mt-3 pt-2 flex items-center gap-1 text-gray-400">
            <Heart size={14} className={game.likes > 1000 ? "fill-white/10" : ""} />
            <span className="text-xs">{game.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
