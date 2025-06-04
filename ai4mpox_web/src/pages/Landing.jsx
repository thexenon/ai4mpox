import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';
import { Link } from 'react-router-dom';

function Landing() {
  const [news, setNews] = useState([]);
  const [reports, setReports] = useState([]);
  const [profiles, setProfiles] = useState([]);

  // Slides for welcome/about mpox
  const slides = [
    {
      title: 'Welcome',
      image: '/img/mpox01.jpg',
      content: (
        <>
          Mpox (formerly monkeypox) continues to pose a significant public
          health threat in Africa, with outbreaks escalating and spreading
          across multiple countries. As of November 3, 2024, 18 African
          countries have reported mpox cases, with the Democratic Republic of
          Congo (DRC) being the most affected, reporting over 8,662 confirmed
          cases and 43 fatalities. The outbreak has evolved from primarily
          zoonotic transmission to extensive human-to-human spread, compounded
          by limited vaccine availability and widespread misinformation. These
          challenges have underscored the urgent need for innovative and
          data-driven approaches to outbreak management and public health
          preparedness.
          <br />
          In response to these challenges, the AI4 Mpox Project in Ghana
          leverages Artificial Intelligence (AI), Big Data, and Mathematical
          Modelling to enhance mpox outbreak surveillance, forecasting, vaccine
          distribution, and misinformation mitigation. This project forms part
          of a broader Africa-wide initiative, AI4PEP, focused on using
          AI-powered tools originally developed for the COVID-19 pandemic to
          strengthen public health systems and response strategies for mpox and
          future outbreaks.
        </>
      ),
    },
    {
      title: 'Overview of Mpox in Ghana',
      image: '/img/mpox02.jpg',
      content: (
        <>
          Mpox, formerly known as monkeypox, is an infectious viral disease
          caused by the West African clade of the mpox virus. It manifests with
          symptoms including fever, rash (progressing from blisters to crusts),
          headache, muscle aches, back pain, swollen lymph nodes, and general
          fatigue. While usually mild and self-limiting within two to four
          weeks, severe cases can occur, particularly in vulnerable populations
          such as children, pregnant women, and immunocompromised individuals.
          <br />
          The disease primarily spreads through close contact with infected
          persons, animals (mainly rodents), or contaminated materials.
          Human-to-human transmission occurs via physical contact or sexual
          relations, often within families and close contacts.
        </>
      ),
    },
    {
      title: 'Mpox Outbreak in Ghana',
      image: '/img/mpox01.jpg',
      content: (
        <>
          Ghana recorded its first two confirmed mpox cases on May 15, 2025, in
          the Accra Metropolitan area of the Greater Accra Region. Subsequently,
          two more cases were confirmed on May 18, 2025, in the Western and
          Greater Accra Regions, bringing the initial total to four cases.{' '}
          <br />
          As of May 21, 2025, four additional cases were confirmed, raising the
          total number of confirmed mpox cases in Ghana to nine. These new cases
          were recorded in the Western Region and Greater Accra Region, with
          three cases previously identified in Accra and two in the Western
          Region. Importantly, the four new confirmed cases are reported to be
          unrelated, suggesting multiple chains of transmission.
          <br />
          No deaths have been reported, and health authorities emphasize that
          there is no cause for alarm. Public health investigations, including
          contact tracing and active case searches, are underway to contain the
          outbreak.
          <br />
          On May 27, 2025, the Ghana Health Service confirmed 10 new cases of
          Mpox, bringing the country’s total case count to 19. According to
          health officials, five of the confirmed cases are currently in
          admission and are receiving treatment. No fatalities have been
          recorded so far in the latest outbreak. The new confirmed cases, we
          gathered are from the Northern, Western and Greater Accra regions.
          <br />
          In response, health authorities are urging the public to observe
          strict preventive measures. These include frequent handwashing,
          avoiding physical contact with symptomatic individuals, especially
          those with unexplained rashes, and reporting suspected cases to the
          nearest health facility without delay. The GHS has heightened
          surveillance and public education efforts nationwide to contain the
          spread of the virus.
          <br />
          In countries such as the Democratic Republic of Congo (DRC) and
          Nigeria, Mpox remains endemic, with intermittent surges in cases,
          often exacerbated by gaps in healthcare infrastructure, inadequate
          public health education, and challenges in rural surveillance. The
          DRC, in particular, continues to report the highest number of cases
          globally, underscoring the need for a coordinated regional strategy.
          <br />
          The World Health Organization (WHO) has recently called for increased
          investment in Mpox diagnostics, vaccine research, and public education
          campaigns across Africa, warning that the virus could spread further
          if not contained effectively. WHO also advocates for de-stigmatising
          public discourse around Mpox to ensure that affected individuals are
          not marginalised or deterred from seeking care.
        </>
      ),
    },
    {
      title: 'Clinical Surveillance and Laboratory Findings',
      image: '/img/mpox02.jpg',
      content: (
        <>
          All 16 regions of Ghana have recorded suspected mpox cases in 2025,
          indicating widespread vigilance.
          <br />
          <br />
          Recent confirmed cases include:
          <br />A 32-year-old male on antiretroviral therapy with fever, chills,
          and pustular/vesicular lesions on the trunk, gluteal, and anorectal
          areas. A 34-year-old male with a two-week history of generalized rash
          who sought hospital care after unsuccessful self-medication. The
          National Public Health & Reference Laboratory (NPHRL) completed
          genomic sequencing of two new confirmed cases, identifying both as
          Clade II, consistent with the West African mpox clade. Laboratories
          including NPHRL, NMIMR, and KCCR continue testing samples from routine
          surveillance efforts. Sample collection and transport logistics have
          been pre-positioned across districts to facilitate rapid diagnosis.
          <br />
          <br />
          Preventive Measures and Public Health Recommendations
          <br />
          The Ghana Health Service (GHS) has urged the public to adhere strictly
          to preventive measures to curb the spread of mpox: <br />
          Avoid handling or ingesting bushmeat, especially rodents. <br />
          Practice regular hand hygiene using soap and water. <br />
          Avoid close physical contact with individuals showing symptoms such as
          rash, vesicles, or scabs. <br />
          Avoid contact with personal items of infected persons, including
          household linen, clothing, and bedding. <br />
          Isolate sick individuals at home or in health facilities. <br />
          Use appropriate personal protective equipment when caring for
          patients. <br />
          Promptly report suspected cases to the nearest health facility for
          early diagnosis and management.
          <br />
          <br />
          Mpox outbreaks continue to escalate in Africa, with 18 countries
          affected as of November 3, 2024. The Democratic Republic of Congo
          (DRC) remains the most impacted, reporting over 8,662 confirmed cases
          and 43 fatalities. The WHO declared Mpox a Public Health Emergency of
          International Concern on August 14, 2024. Transmission patterns have
          shifted from primarily zoonotic to extensive human-to-human spread.
          Challenges include limited vaccine access and widespread
          misinformation.
        </>
      ),
    },
  ];
  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((idx) => (idx + 1) % slides.length);
    }, 60000); // 1 minute
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    fetchItems('news').then((res) => setNews(res.data.data.data.slice(0, 5)));
    fetchItems('reports').then((res) =>
      setReports(res.data.data.data.slice(0, 5))
    );
    fetchItems('people').then((res) =>
      setProfiles(res.data.data.data.slice(0, 5))
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-0">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-8 drop-shadow">
          Welcome to AI4Mpox Ghana
        </h1>
        <div className="w-[80vw] max-w-5xl mx-auto mb-10 text-center transition-all duration-700 relative overflow-hidden rounded-xl shadow-lg min-h-[360px]">
          {/* Background image for slide */}
          <img
            src={slides[slideIdx].image}
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
                    className="w-20 h-20 object-cover rounded-full border-2 border-blue-200 mb-2"
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
