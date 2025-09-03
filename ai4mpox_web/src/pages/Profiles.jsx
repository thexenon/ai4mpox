import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';

function VirusCellAnimation() {
  return (
    <div className="flex justify-center mb-6 animate-fade-in">
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="virus-spin drop-shadow-lg"
      >
        <circle cx="40" cy="40" r="28" fill="url(#virusGradient)" />
        <g stroke="#3b82f6" strokeWidth="2">
          <line x1="40" y1="12" x2="40" y2="2" />
          <line x1="40" y1="68" x2="40" y2="78" />
          <line x1="12" y1="40" x2="2" y2="40" />
          <line x1="68" y1="40" x2="78" y2="40" />
          <line x1="18" y1="18" x2="8" y2="8" />
          <line x1="62" y1="18" x2="72" y2="8" />
          <line x1="18" y1="62" x2="8" y2="72" />
          <line x1="62" y1="62" x2="72" y2="72" />
        </g>
        <circle cx="40" cy="40" r="18" fill="#fff" fillOpacity="0.15" />
        <circle cx="40" cy="40" r="8" fill="#3b82f6" fillOpacity="0.3" />
        <defs>
          <radialGradient
            id="virusGradient"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(40 40) scale(28)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#60a5fa" />
            <stop offset="1" stopColor="#1e3a8a" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchItems('people').then((res) => {
      setProfiles(res.data.data.data);
    });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 animate-fade-in">
      <VirusCellAnimation />
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700 drop-shadow-lg animate-fade-in">
        Meet Our Team
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {profiles.map((person, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-2xl transition group animate-fade-in"
            onClick={() => setSelected(person)}
            tabIndex={0}
            role="button"
            onKeyPress={(e) => {
              if (e.key === 'Enter') setSelected(person);
            }}
          >
            {person.image && (
              <img
                src={person.image}
                alt={person.name}
                className="w-44 h-44 object-cover rounded-full border-4 border-blue-200 mb-4 group-hover:scale-110 transition-transform duration-300"
              />
            )}
            <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">
              {person.name}
            </h2>
            {person.title && (
              <div className="text-blue-600 font-semibold mb-2">
                {person.title}
              </div>
            )}
            {person.role && (
              <div className="text-xs text-gray-500 mb-1">{person.role}</div>
            )}
          </div>
        ))}
      </div>
      {selected && (
        <ProfileModal person={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function ProfileModal({ person, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-8 relative animate-fade-in flex justify-center"
        style={{ minHeight: '400px', maxHeight: '80vh', overflow: 'hidden' }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="w-full flex flex-row gap-8">
          <div className="flex flex-col items-center flex-shrink-0 min-w-[220px] max-w-[260px]">
            {person.image && (
              <img
                src={person.image}
                alt={person.name}
                className="w-56 h-56 object-cover rounded-full border-4 border-blue-200 mb-4 animate-fade-in"
              />
            )}
            <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-1">
              {person.name}
            </h2>
            {person.title && (
              <div className="text-center text-blue-600 font-semibold mb-2 text-lg md:text-xl">
                {person.title}
              </div>
            )}

            {person.position && (
              <div className="text-center text-xs md:text-base text-gray-500 mb-2">
                <span className="font-semibold">Association:</span>{' '}
                {person.position}
              </div>
            )}
            {person.profiles &&
              Array.isArray(person.profiles) &&
              person.profiles.length > 0 && (
                <div className="text-center mt-2 mb-2">
                  <span className="font-semibold text-gray-700 text-base md:text-lg">
                    Links:
                  </span>
                  <ul className="flex flex-col items-center gap-2 mt-2">
                    {person.profiles.map((link, idx) => {
                      // Show only the domain and first 10 chars of the path
                      let display = link.trim();
                      try {
                        const url = new URL(
                          display.startsWith('http')
                            ? display
                            : 'https://' + display
                        );
                        display =
                          url.hostname +
                          (url.pathname.length > 1
                            ? url.pathname.slice(0, 10) +
                              (url.pathname.length > 10 ? '...' : '')
                            : '');
                      } catch (e) {
                        display =
                          display.slice(0, 18) +
                          (display.length > 18 ? '...' : '');
                      }
                      return (
                        <li key={idx} className="w-full">
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-600 underline hover:text-blue-800 text-sm md:text-base font-medium truncate text-left max-w-full"
                            title={link.trim()}
                          >
                            {display}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
          </div>
          <div
            className="flex-1 overflow-y-auto pr-2"
            style={{ maxHeight: '64vh' }}
          >
            {person.bio && (
              <div className="text-gray-700 mb-3 text-center whitespace-pre-line text-base md:text-lg animate-fade-in">
                {person.bio}
              </div>
            )}
            {person.contact && (
              <div className="text-center text-sm md:text-base text-gray-500 mb-2 animate-fade-in">
                <span className="font-semibold">Contact:</span> +233-
                {person.contact}
              </div>
            )}
            {person.description && (
              <div className="text-center text-sm md:text-base text-gray-500 mb-2 animate-fade-in">
                <span className="font-semibold">Description:</span>{' '}
                {person.description}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
