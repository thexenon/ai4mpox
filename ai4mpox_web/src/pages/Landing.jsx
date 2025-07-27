import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';
import { Link } from 'react-router-dom';

function Landing() {
  const [news, setNews] = useState([]);
  const [reports, setReports] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [slides, setSlides] = useState([]);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    fetchItems('slide').then((res) => setSlides(res.data.data.data));
    fetchItems('news').then((res) => setNews(res.data.data.data.slice(0, 5)));
    fetchItems('reports').then((res) =>
      setReports(res.data.data.data.slice(0, 5))
    );
    fetchItems('people').then((res) =>
      setProfiles(res.data.data.data.slice(0, 5))
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((idx) => (idx + 1) % slides.length);
    }, 60000); // 1 minute
    return () => clearInterval(interval);
  }, [slides, slides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-0">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-8 drop-shadow">
          Welcome to AI4Mpox Ghana
        </h1>
        <div className="w-[80vw] max-w-5xl mx-auto mb-10 text-center transition-all duration-700 relative overflow-hidden rounded-xl shadow-lg min-h-[360px]">
          {/* Background image for slide */}
          <img
            src={slides[slideIdx].image || '/img/mpox01.jpg'}
            alt="slide background"
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none select-none blur-[1px]"
            style={{ zIndex: 0 }}
          />
          <div className="relative z-10 px-6 py-8">
            <div className="mb-2 text-xl font-bold text-blue-800 drop-shadow-lg bg-white/80 rounded px-4 py-2 shadow">
              {slides[slideIdx].title}
            </div>
            <p className="text-lg md:text-xl text-gray-800 mb-4 min-h-[48px] flex items-center justify-center drop-shadow-lg bg-white/80 rounded px-4 py-2 shadow">
              {slides[slideIdx].content}
            </p>
            <div className="flex justify-center gap-2 mt-2 mb-2">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`inline-block w-3 h-3 rounded-full ${
                    i === slideIdx ? 'bg-blue-600' : 'bg-blue-200'
                  }`}
                ></span>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <button
                className="px-4 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-semibold transition"
                onClick={() =>
                  setSlideIdx((slideIdx - 1 + slides.length) % slides.length)
                }
                aria-label="Previous slide"
              >
                Prev
              </button>
              <button
                className="px-4 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-semibold transition"
                onClick={() => setSlideIdx((slideIdx + 1) % slides.length)}
                aria-label="Next slide"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {/* News Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800 flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-blue-400 rounded mr-2"></span>
            Recent News
            <Link
              to="/articles"
              className="ml-auto text-blue-500 underline text-sm"
            >
              See all
            </Link>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer"
              >
                {/* Show first image if available in images array, else fallback to image */}
                {item.images &&
                Array.isArray(item.images) &&
                item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                ) : item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                ) : null}
                <h3 className="text-lg font-semibold text-blue-700 mb-1 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-1">
                  {item.content}
                </p>
                <div className="text-xs text-gray-400">
                  {item.date && new Date(item.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Reports Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800 flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-blue-400 rounded mr-2"></span>
            Recent Reports
            <Link
              to="/project"
              className="ml-auto text-blue-500 underline text-sm"
            >
              See map
            </Link>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
              >
                <div className="font-bold text-blue-700 mb-1">
                  {report.address || 'No address'}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {report.occupation} | {report.gender} | Age: {report.age} |
                  Status: {report.diseaseStatus}
                </div>
                <div className="text-xs text-gray-400">
                  {report.date && new Date(report.date).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500">
                  {report.maritalStatus}
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Profiles Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800 flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-blue-400 rounded mr-2"></span>
            Meet the Team
            <Link
              to="/profiles"
              className="ml-auto text-blue-500 underline text-sm"
            >
              See all
            </Link>
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {profiles.map((person, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition"
              >
                {person.image && (
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-30 h-30 object-cover rounded-full border-2 border-blue-200 mb-2"
                  />
                )}
                <div className="text-blue-700 font-bold text-base text-center mb-1">
                  {person.name}
                </div>
                <div className="text-gray-600 text-xs text-center mb-1">
                  {person.title}
                </div>
                <div className="text-xs text-gray-400 text-center">
                  {person.position}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Landing;
