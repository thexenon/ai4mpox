import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [counts, setCounts] = useState({
    news: 0,
    people: 0,
    reports: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCounts() {
      setLoading(true);
      setError('');
      try {
        const cookie = document.cookie;
        const [newsRes, peopleRes, reportsRes, usersRes] = await Promise.all([
          fetchItems('news', cookie),
          fetchItems('people', cookie),
          fetchItems('reports', cookie),
          fetchItems('users', cookie),
        ]);
        setCounts({
          news: newsRes.data.data.data.length,
          people: peopleRes.data.data.data.length,
          reports: reportsRes.data.data.data.length,
          users: usersRes.data.data.data.length,
        });
      } catch (err) {
        setError('Failed to load dashboard summary.');
      }
      setLoading(false);
    }
    fetchCounts();
  }, []);

  if (loading)
    return <div className="p-8 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SummaryCard
          label="News"
          count={counts.news}
          color="bg-blue-100 text-blue-700"
          onClick={() => navigate('/news')}
        />
        <SummaryCard
          label="People"
          count={counts.people}
          color="bg-green-100 text-green-700"
          onClick={() => navigate('/people')}
        />
        <SummaryCard
          label="Reports"
          count={counts.reports}
          color="bg-yellow-100 text-yellow-700"
          onClick={() => navigate('/reports')}
        />
        <SummaryCard
          label="Users"
          count={counts.users}
          color="bg-purple-100 text-purple-700"
          onClick={() => navigate('/admin')}
        />
      </div>
    </div>
  );
};

function SummaryCard({ label, count, color, onClick }) {
  return (
    <div
      className={`rounded shadow p-6 flex flex-col items-center cursor-pointer transition hover:scale-105 ${color}`}
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyPress={(e) => {
        if (e.key === 'Enter') onClick();
      }}
    >
      <div className="text-4xl font-bold mb-2">{count}</div>
      <div className="text-lg font-semibold">{label}</div>
    </div>
  );
}

export default Dashboard;
