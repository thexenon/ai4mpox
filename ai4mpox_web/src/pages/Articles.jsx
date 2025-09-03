import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';
import NewsExpandedView from '../components/NewsExpandedView';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchItems('news').then((res) => {
      setArticles(res.data.data.data);
    });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-purple-200 relative overflow-hidden">
      <VirusCellAnimation />
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 drop-shadow animate-fade-in">
        Mpox News
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {articles.map((article, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 cursor-pointer border-2 hover:border-blue-400 hover:scale-[1.03] animate-fade-in`}
            onClick={() => setExpanded(idx)}
            tabIndex={0}
            role="button"
            onKeyPress={(e) => {
              if (e.key === 'Enter') setExpanded(idx);
            }}
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-2 line-clamp-2">
              {article.title}
            </h2>
            <p className="text-gray-500 italic mb-2">
              By: {article.sender?.name || article.author}
            </p>
            {(article.image ||
              (Array.isArray(article.images) && article.images.length > 0)) && (
              <img
                src={article.image || article.images[0]}
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg mb-3 shadow"
              />
            )}
            <p
              className={
                'text-gray-700 transition-all line-clamp-3 text-sm mb-2'
              }
            >
              {article.content}
            </p>
            <div className="flex justify-end mt-2">
              <button
                className="text-blue-600 hover:text-blue-800 text-xs font-semibold underline focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(idx);
                }}
              >
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
      {expanded !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-8 relative animate-fade-in flex flex-col max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setExpanded(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <NewsExpandedView article={articles[expanded]} />
          </div>
        </div>
      )}
    </div>
  );
}

function VirusCellAnimation() {
  return (
    <svg
      className="absolute top-0 right-0 animate-virus-spin pointer-events-none opacity-30"
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ zIndex: 0 }}
    >
      <circle cx="90" cy="90" r="70" fill="url(#virusGradient)" />
      <g>
        <circle cx="90" cy="40" r="8" fill="#a78bfa" />
        <circle cx="140" cy="90" r="8" fill="#818cf8" />
        <circle cx="90" cy="140" r="8" fill="#f472b6" />
        <circle cx="40" cy="90" r="8" fill="#38bdf8" />
        <circle cx="120" cy="60" r="6" fill="#fbbf24" />
        <circle cx="60" cy="120" r="6" fill="#34d399" />
      </g>
      <defs>
        <radialGradient
          id="virusGradient"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(90 90) scale(70)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#818cf8" />
          <stop offset="1" stopColor="#f472b6" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default Articles;
