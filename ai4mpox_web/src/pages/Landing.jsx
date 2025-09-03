import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';
import { Link } from 'react-router-dom';

function Landing() {
  const [news, setNews] = useState([]);
  const [reports, setReports] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [slides, setSlides] = useState([]);
  const [slideIdx, setSlideIdx] = useState(0);
  const [modal, setModal] = useState({ type: null, idx: null });

  useEffect(() => {
    async function fetchAll() {
      try {
        const [slideRes, newsRes, reportRes, peopleRes] = await Promise.all([
          fetchItems('slide'),
          fetchItems('news'),
          fetchItems('reports'),
          fetchItems('people'),
        ]);
        setSlides(slideRes.data.data.data);
        setNews(newsRes.data.data.data.slice(0, 5));
        setReports(reportRes.data.data.data.slice(0, 5));
        setProfiles(peopleRes.data.data.data.slice(0, 5));
      } catch (err) {}
    }
    fetchAll();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((idx) => (idx + 1) % slides.length);
    }, 60000); // 1 minute
    return () => clearInterval(interval);
  }, [slides, slides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-purple-200 p-0 relative overflow-hidden">
      {/* Animated virus cell SVG */}
      <VirusCellAnimation />
      {/* Brand image below header */}
      <div className="max-w-6xl mx-auto px-4 mb-8 flex justify-center">
        <img
          src="/img/brand.jpg"
          alt="AI4Mpox Brand"
          className="w-full max-w-xl rounded-xl shadow-2xl object-cover animate-fade-in"
        />
      </div>
      <div className="max-w-6xl mx-auto py-0 px-4">
        {/* Slides as grid of cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-10">
          {slides.map((slide, idx) => (
            <SlideCard key={idx} slide={slide} />
          ))}
        </div>
        {/* Partners Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800 flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-blue-400 rounded mr-2"></span>
            Project Partners
          </h2>
          <div className="overflow-hidden w-full">
            <div
              className="flex gap-12 animate-partner-scroll items-center"
              style={{ minWidth: '1200px' }}
            >
              <PartnerLogo
                src="/img/partners/fcdo.png"
                url="https://www.gov.uk/government/organisations/foreign-commonwealth-development-office"
                alt="FCDO"
              />
              <PartnerLogo
                src="/img/partners/idrc.jpg"
                url="https://www.idrc.ca"
                alt="IDRC"
              />
              <PartnerLogo
                src="/img/partners/knust.jpg"
                url="https://www.knust.edu.gh"
                alt="KNUST"
              />
              <PartnerLogo
                src="/img/partners/svm.jpg"
                url="https://svm.knust.edu.gh/"
                alt="SVM"
              />
              <PartnerLogo
                src="/img/partners/uot.png"
                url="https://www.utoronto.ca"
                alt="UOT"
              />
              <PartnerLogo
                src="/img/partners/york.png"
                url="https://www.yorku.ca"
                alt="York University"
              />
              {/* Repeat logos for endless effect */}
              <PartnerLogo
                src="/img/partners/fcdo.png"
                url="https://www.gov.uk/government/organisations/foreign-commonwealth-development-office"
                alt="FCDO"
              />
              <PartnerLogo
                src="/img/partners/idrc.jpg"
                url="https://www.idrc.ca"
                alt="IDRC"
              />
              <PartnerLogo
                src="/img/partners/knust.jpg"
                url="https://www.knust.edu.gh"
                alt="KNUST"
              />
              <PartnerLogo
                src="/img/partners/svm.jpg"
                url="https://svm.knust.edu.gh/"
                alt="SVM"
              />
              <PartnerLogo
                src="/img/partners/uot.png"
                url="https://www.utoronto.ca"
                alt="UOT"
              />
              <PartnerLogo
                src="/img/partners/york.png"
                url="https://www.yorku.ca"
                alt="York University"
              />
            </div>
          </div>
        </section>
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
                onClick={() => setModal({ type: 'news', idx })}
              >
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
                  {item.newsmessage}
                </p>
                <div className="text-xs text-gray-400">
                  {item.createdAt &&
                    new Date(item.createdAt).toLocaleDateString()}
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
                className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer"
                onClick={() => setModal({ type: 'report', idx })}
              >
                <div className="font-bold text-blue-700 mb-1">
                  {report.address || 'No address'}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Status: {report.diseaseStatus.toUpperCase()}
                </div>
                <div className="text-xs text-gray-400">
                  {report.date && new Date(report.date).toLocaleDateString()}
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
                className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
                onClick={() => setModal({ type: 'profile', idx })}
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
        {/* Details Modal */}
        {modal.type && (
          <DetailsModal
            type={modal.type}
            item={
              modal.type === 'news'
                ? news[modal.idx]
                : modal.type === 'report'
                ? reports[modal.idx]
                : profiles[modal.idx]
            }
            onClose={() => setModal({ type: null, idx: null })}
          />
        )}
      </div>
    </div>
  );
}

function SlideCard({ slide }) {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <div
      className={`flip-card relative w-full rounded-xl shadow-lg cursor-pointer group${
        flipped ? ' flipped z-20' : ''
      }`}
      onClick={() => setFlipped((f) => !f)}
      tabIndex={0}
      role="button"
      onKeyPress={(e) => {
        if (e.key === 'Enter') setFlipped((f) => !f);
      }}
      style={{
        minHeight: flipped ? '256px' : '256px',
        height: flipped ? 'auto' : '16rem',
        maxHeight: flipped ? '42rem' : '16rem',
      }}
    >
      <div className="flip-card-inner rounded-xl h-full w-full">
        {/* Front Side */}
        <div
          className="flip-card-front absolute inset-0 w-full h-full rounded-xl flex flex-col justify-end items-center p-4 bg-cover bg-center"
          style={{
            backgroundImage: `url(${slide.image || '/img/mpox01.jpg'})`,
            minHeight: '256px',
            maxHeight: '16rem',
          }}
        >
          <div className="bg-white/80 rounded px-4 py-2 shadow text-xl font-bold text-blue-800 mb-2 w-full text-center">
            {slide.title}
          </div>
        </div>
        {/* Back Side */}
        <div className="flip-card-back inset-0 w-full rounded-xl flex flex-col justify-center items-center p-4 bg-white/90 text-gray-800 text-lg overflow-y-auto pt-16">
          <div className="text-center">{slide.content}</div>
        </div>
      </div>
    </div>
  );
}

function PartnerLogo({ src, url, alt }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block">
      <img
        src={src}
        alt={alt}
        className="h-28 w-auto object-contain rounded shadow hover:scale-105 transition-transform"
        style={{ maxWidth: '300px' }}
      />
    </a>
  );
}

function DetailsModal({ type, item, onClose }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[2000] bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
        <button
          className="absolute top-2 right-2 bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-bold shadow hover:bg-blue-700"
          onClick={onClose}
        >
          ×
        </button>
        {type === 'news' && (
          <>
            <h3 className="text-2xl font-bold text-blue-700 mb-2">
              {item.title}
            </h3>
            {item.images &&
              Array.isArray(item.images) &&
              item.images.length > 0 && (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
            <div className="text-gray-700 mb-2 overflow-scroll max-h-96">
              {item.newsmessage}
            </div>
            <div className="text-xs text-gray-400">
              {item.createdAt && new Date(item.createdAt).toLocaleDateString()}
            </div>
          </>
        )}
        {type === 'report' && (
          <>
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              Report Details
            </h3>
            <div className="mb-2">
              Region: <span className="font-semibold">{item.address}</span>
            </div>
            <div className="mb-2">
              Status:{' '}
              <span className="font-semibold">{item.diseaseStatus}</span>
            </div>
            <div className="mb-2">
              Location:{' '}
              <span className="font-semibold">
                {item.location
                  ? `${item.location.coordinates[1]}, ${item.location.coordinates[0]}`
                  : 'N/A'}
              </span>
            </div>
            <div className="text-xs text-gray-400">
              {item.createdAt && new Date(item.createdAt).toLocaleDateString()}
            </div>
          </>
        )}
        {type === 'profile' && (
          <>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-full border-2 border-blue-200 mb-2 mx-auto"
              />
            )}
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              {item.name}
            </h3>
            <div className="mb-2">
              Title: <span className="font-semibold">{item.title}</span>
            </div>
            <div className="mb-2">
              Position: <span className="font-semibold">{item.position}</span>
            </div>
          </>
        )}
      </div>
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

export default Landing;
