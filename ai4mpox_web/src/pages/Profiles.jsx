import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';

function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchItems('people').then((res) => {
      setProfiles(res.data.data.data);
    });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Meet Our Team
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {profiles.map((person, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-2xl transition group"
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
                className="w-50 h-50 object-cover rounded-full border-4 border-blue-200 mb-4 group-hover:scale-105 transition-transform"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
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
                className="w-56 h-56 object-cover rounded-full border-4 border-blue-200 mb-4"
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
              <div className="text-gray-700 mb-3 text-center whitespace-pre-line text-base md:text-lg">
                {person.bio}
              </div>
            )}
            {person.contact && (
              <div className="text-center text-sm md:text-base text-gray-500 mb-2">
                <span className="font-semibold">Contact:</span> {person.contact}
              </div>
            )}
            {person.description && (
              <div className="text-center text-sm md:text-base text-gray-500 mb-2">
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
