import React, { useEffect, useState } from 'react';
import '../styles/globals.css';
import { Link } from 'react-router-dom';
import { fetchItems, deleteItem } from '../services/api';

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItems('people')
      .then((data) => {
        setPeople(data.data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load people');
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this person?')) return;
    try {
      const item = people.find((p) => p.id === id || p._id === id);
      const cookie =
        document.cookie.split('; ').find((row) => row.startsWith('jwt=')) || '';
      await deleteItem(item, 'people', cookie);
      setPeople((prev) => prev.filter((p) => p.id !== id && p._id !== id));
      alert('Person deleted successfully.');
    } catch (err) {
      alert('Failed to delete person.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">People</h1>
          <Link
            to="../add-new/people"
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-200"
          >
            + Add New
          </Link>
        </div>
        {loading ? (
          <div className="text-center text-lg text-gray-500">
            Loading people...
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : people.length === 0 ? (
          <div className="text-center text-gray-500">No people found.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {people.map((person) => (
              <div
                key={person.id}
                className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
              >
                <div
                  className="flex flex-col items-center group w-full cursor-pointer"
                  onClick={() =>
                    window.location.assign(
                      `/add-new/editpeople?id=${person.id}`
                    )
                  }
                  tabIndex={0}
                  role="button"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter')
                      window.location.assign(
                        `/add-new/editpeople?id=${person.id}`
                      );
                  }}
                >
                  {person.image && (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-24 h-24 object-cover rounded-full border border-gray-200 shadow mb-4 group-hover:scale-105 transition-transform"
                    />
                  )}
                  <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">
                    {person.name}
                  </h2>
                </div>
                {person.role && (
                  <div className="text-sm text-blue-600 mb-2">
                    {person.role}
                  </div>
                )}
                {person.description && (
                  <p className="text-gray-600 text-center mb-2 line-clamp-3">
                    {person.description}
                  </p>
                )}
                <div className="mt-auto text-xs text-gray-400">
                  {person.createdAt
                    ? new Date(person.createdAt).toLocaleString()
                    : ''}
                </div>
                <button
                  className="mt-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded shadow"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(person.id);
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

export default People;
