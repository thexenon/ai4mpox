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
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 drop-shadow">
        Mpox News
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {articles.map((article, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 cursor-pointer border-2 hover:border-blue-400`}
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

export default Articles;
