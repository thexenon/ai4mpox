import React, { useEffect, useState } from 'react';
import '../styles/globals.css';
import { Link } from 'react-router-dom';
import { fetchItems, deleteItem } from '../services/api';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const handleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news item?'))
      return;
    try {
      // Find the item object by id
      const item = news.find((n) => n.id === id || n._id === id);
      // Get the cookie string for jwt or token
      const cookie =
        document.cookie.split('; ').find((row) => row.startsWith('jwt=')) || '';
      await deleteItem(item, 'news', cookie);
      setExpandedId(null); // Collapse any expanded item
      alert('News item deleted successfully.');
      setNews((prev) =>
        prev.filter((item) => item.id !== id && item._id !== id)
      );
    } catch (err) {
      alert('Failed to delete news item.');
    }
  };

  useEffect(() => {
    fetchItems('news')
      .then((data) => {
        setNews(data.data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load news');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">News</h1>
          <Link
            to="../add-new/news"
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-200"
          >
            + Add New
          </Link>
        </div>
        {loading ? (
          <div className="text-center text-lg text-gray-500">
            Loading news...
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : news.length === 0 ? (
          <div className="text-center text-gray-500">No news found.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow p-6 flex flex-col cursor-pointer hover:shadow-lg transition-shadow relative"
                onClick={() =>
                  window.location.assign(
                    `/add-new/editnews?id=${item.id || item._id}`
                  )
                }
              >
                {item.images &&
                  item.images.length > 0 &&
                  (expandedId === item.id ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={item.title}
                          className="w-32 h-32 object-cover rounded border border-gray-200 shadow max-w-full max-h-32"
                          style={{ aspectRatio: '1/1' }}
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded mb-4 max-h-48"
                      style={{ objectFit: 'cover' }}
                    />
                  ))}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h2>
                <p
                  className={`text-gray-600 mb-2 ${
                    expandedId === item.id ? '' : 'line-clamp-3'
                  }`}
                >
                  {item.newsmessage || 'No description available.'}
                </p>
                {expandedId === item.id &&
                  item.socials &&
                  item.socials.length > 0 && (
                    <div className="text-sm text-blue-600 mb-2">
                      <p>
                        {(Array.isArray(item.socials)
                          ? item.socials
                          : typeof item.socials === 'string'
                          ? item.socials.split(',')
                          : []
                        ).map((link, idx) => (
                          <p>
                            <a
                              key={idx}
                              href={link.trim()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block hover:underline"
                            >
                              {link.trim()}
                            </a>
                          </p>
                        ))}
                      </p>
                    </div>
                  )}
                <div className="mt-auto text-xs text-gray-400">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : ''}
                </div>
                <button
                  className="absolute top-4 right-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded shadow"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                >
                  Delete
                </button>
                <span className="absolute bottom-4 right-4 text-xs text-blue-500 select-none">
                  {expandedId === item.id
                    ? 'Click to collapse'
                    : 'Click to expand'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
