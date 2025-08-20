import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems('reports')
      .then((data) => {
        setReports(data.data.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load reports');
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Disease Reports</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
          onClick={() => navigate('/add-new/report')}
        >
          + Add New
        </button>
      </div>
      {loading ? (
        <div className="text-center text-lg text-gray-500">
          Loading reports...
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : reports.length === 0 ? (
        <div className="text-center text-gray-500">No reports found.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {reports.map((report, idx) => (
            <div
              key={report._id || idx}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() =>
                navigate(`/add-new/editreport?id=${report._id || report.id}`)
              }
              tabIndex={0}
              role="button"
              onKeyPress={(e) => {
                if (e.key === 'Enter')
                  navigate(`/add-new/editreport?id=${report._id || report.id}`);
              }}
            >
              <div className="mb-2">
                <span className="font-semibold">Address:</span> {report.address}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Location:</span>{' '}
                {report.location && report.location.coordinates
                  ? `Lng: ${report.location.coordinates[0]}, Lat: ${report.location.coordinates[1]}`
                  : 'N/A'}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Disease Status:</span>{' '}
                {report.diseaseStatus}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                {report.createdAt
                  ? new Date(report.createdAt).toLocaleString()
                  : ''}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
