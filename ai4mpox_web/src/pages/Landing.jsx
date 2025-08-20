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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-0">
      {/* Brand image below header */}
      <div className="max-w-6xl mx-auto px-4 mb-8 flex justify-center">
        <img
          src="/img/brand.jpg"
          alt="AI4Mpox Brand"
          className="w-full max-w-xl rounded-xl shadow-lg object-cover"
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
          <div className="flex flex-wrap gap-8 justify-center items-center mb-4">
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
                  Status: {report.diseaseStatus.toUpperCase()}
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

export default Landing;
