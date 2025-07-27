import React, { useEffect, useState } from 'react';
import '../styles/globals.css';
import { Link } from 'react-router-dom';
import { fetchItems, deleteItem } from '../services/api';

const Slide = () => {
  const [slide, setSlide] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItems('slide')
      .then((data) => {
        setSlide(data.data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load slide');
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) return;
    try {
      const item = slide.find((p) => p.id === id || p._id === id);
      await deleteItem(item, 'slide');
      setSlide((prev) => prev.filter((p) => p.id !== id && p._id !== id));
      alert('Person deleted successfully.');
    } catch (err) {
      alert('Failed to delete slide.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Slide</h1>
          <Link
            to="../add-new/slide"
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-200"
          >
            + Add New
          </Link>
        </div>
        {loading ? (
          <div className="text-center text-lg text-gray-500">
            Loading slide...
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : slide.length === 0 ? (
          <div className="text-center text-gray-500">No slide found.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {slide.map((slide) => (
              <div
                key={slide.id}
                className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
              >
                <div
                  className="flex flex-col items-center group w-full cursor-pointer"
                  onClick={() =>
                    window.location.assign(`/add-new/editslide?id=${slide.id}`)
                  }
                  tabIndex={0}
                  role="button"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter')
                      window.location.assign(
                        `/add-new/editslide?id=${slide.id}`
                      );
                  }}
                >
                  {slide.image && (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-24 h-24 object-cover rounded-full border border-gray-200 shadow mb-4 group-hover:scale-105 transition-transform"
                    />
                  )}
                  <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">
                    {slide.title}
                  </h2>
                </div>
                {slide.content && (
                  <p className="text-gray-600 text-center mb-2 line-clamp-3">
                    {slide.content}
                  </p>
                )}
                <div className="mt-auto text-xs text-gray-400">
                  {slide.createdAt
                    ? new Date(slide.createdAt).toLocaleString()
                    : ''}
                </div>
                <button
                  className="mt-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded shadow"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(slide.id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide;
