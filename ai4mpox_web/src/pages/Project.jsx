import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Color map for disease status (top-level, accessible everywhere)
const STATUS_COLORS = {
  suspected: '#facc15', // yellow-400
  confirmed: '#ef4444', // red-500
  recovered: '#22c55e', // green-500
  deceased: '#6b7280', // gray-500
  other: '#3b82f6', // blue-500
};

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

function PinBadge({ report }) {
  return null;
}

function getStats(reports) {
  // Disease status counts
  const diseaseStatus = {};
  reports.forEach((r) => {
    // Disease status
    if (r.diseaseStatus)
      diseaseStatus[r.diseaseStatus] =
        (diseaseStatus[r.diseaseStatus] || 0) + 1;
  });
  return { diseaseStatus };
}

// Helper: get region from coordinates (simple bounding boxes for demonstration)
function getRegionFromCoordinates([lng, lat]) {
  // Example: very rough bounding boxes for Ghana's 5 main regions (customize as needed)
  const regions = [
    {
      name: 'Greater Accra',
      bounds: [
        [-0.5, 5.4],
        [0.7, 6.2],
      ],
    },
    {
      name: 'Central',
      bounds: [
        [-2.0, 4.9],
        [-0.5, 6.0],
      ],
    },
    {
      name: 'Western',
      bounds: [
        [-3.2, 4.5],
        [-1.6, 6.0],
      ],
    },
    {
      name: 'Western North',
      bounds: [
        [-3.0, 5.4],
        [-1.8, 6.8],
      ],
    },
    {
      name: 'Eastern',
      bounds: [
        [-1.3, 5.7],
        [0.2, 7.1],
      ],
    },
    {
      name: 'Volta',
      bounds: [
        [-0.2, 5.3],
        [1.2, 8.5],
      ],
    },
    {
      name: 'Oti',
      bounds: [
        [-0.3, 7.8],
        [0.9, 9.4],
      ],
    },
    {
      name: 'Ashanti',
      bounds: [
        [-2.2, 5.8],
        [-0.5, 7.6],
      ],
    },
    {
      name: 'Bono',
      bounds: [
        [-2.7, 7.3],
        [-1.6, 8.5],
      ],
    },
    {
      name: 'Bono East',
      bounds: [
        [-1.8, 7.2],
        [-0.4, 8.7],
      ],
    },
    {
      name: 'Ahafo',
      bounds: [
        [-2.8, 6.3],
        [-1.6, 7.5],
      ],
    },
    {
      name: 'Northern',
      bounds: [
        [-1.5, 8.2],
        [-0.2, 9.6],
      ],
    },
    {
      name: 'Savannah',
      bounds: [
        [-2.5, 8.0],
        [-1.2, 9.8],
      ],
    },
    {
      name: 'North East',
      bounds: [
        [-0.6, 9.3],
        [0.5, 10.6],
      ],
    },
    {
      name: 'Upper East',
      bounds: [
        [-1.0, 10.3],
        [0.4, 11.2],
      ],
    },
    {
      name: 'Upper West',
      bounds: [
        [-2.8, 9.6],
        [-1.0, 11.1],
      ],
    },
  ];

  for (const region of regions) {
    const [[lngMin, latMin], [lngMax, latMax]] = region.bounds;
    if (lng >= lngMin && lng <= lngMax && lat >= latMin && lat <= latMax) {
      return region.name;
    }
  }
  return 'Other';
}

function StatsPanel({ reports }) {
  // Define all possible values
  const ALL_STATUSES = [
    'suspected',
    'confirmed',
    'recovered',
    'deceased',
    'other',
  ];
  const ALL_REGIONS = [
    'Greater Accra',
    'Ashanti',
    'Northern',
    'Volta',
    'Western',
    'Eastern',
    'Central',
    'Western North',
    'Bono',
    'Bono East',
    'Oti',
    'Upper East',
    'Upper West',
    'Savanna',
    'North East',
    'Ahafo',
  ];

  // Color map for disease status
  const STATUS_COLORS = {
    suspected: 'bg-yellow-200 text-yellow-800',
    confirmed: 'bg-red-200 text-red-800',
    recovered: 'bg-green-200 text-green-800',
    deceased: 'bg-gray-400 text-gray-900',
    other: 'bg-blue-200 text-blue-800',
  };

  // Disease status counts
  const statusCounts = {};
  // Region counts
  const regionCounts = {};

  reports.forEach((r) => {
    // Disease status
    const status = r.diseaseStatus || 'unknown';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
    // Region
    let region = 'Unknown';
    if (r.location && r.location.coordinates) {
      region = getRegionFromCoordinates(r.location.coordinates);
    }
    regionCounts[region] = (regionCounts[region] || 0) + 1;
  });

  // Ensure all possible values are shown, even if zero
  ALL_STATUSES.forEach((status) => {
    if (!(status in statusCounts)) statusCounts[status] = 0;
  });
  ALL_REGIONS.forEach((region) => {
    if (!(region in regionCounts)) regionCounts[region] = 0;
  });

  return (
    <div className="fixed bottom-8 left-8 z-[1001] bg-white bg-opacity-95 rounded-xl shadow-2xl p-8 w-[420px] border-2 border-blue-300 text-base">
      <div className="font-bold text-blue-700 mb-4 text-lg">
        Live Statistics
      </div>
      <div className="mb-4">
        <div className="font-semibold text-gray-700 mb-1">
          By Disease Status:
        </div>
        <ul className="ml-2 flex flex-wrap gap-2">
          {ALL_STATUSES.map((status) => (
            <li
              key={status}
              className={`px-3 py-1 rounded-full font-bold flex items-center ${
                STATUS_COLORS[status] || 'bg-gray-100 text-gray-700'
              }`}
            >
              <span className="capitalize">{status}</span>
              <span className="ml-2">{statusCounts[status]}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="font-semibold text-gray-700 mb-1">By Region:</div>
        <ul className="ml-2 flex flex-wrap gap-2">
          {ALL_REGIONS.map((region) => (
            <li
              key={region}
              className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center"
            >
              <span className="capitalize">{region}</span>
              <span className="ml-2">{regionCounts[region]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function getMarkerIcon(status) {
  // SVG pin with color
  const color = STATUS_COLORS[status] || '#3b82f6';
  const svg = encodeURIComponent(
    `<svg width="32" height="41" viewBox="0 0 32 41" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="16" cy="13" rx="13" ry="13" fill="${color}"/><rect x="13" y="13" width="6" height="20" rx="3" fill="${color}"/></svg>`
  );
  return new L.Icon({
    iconUrl: `data:image/svg+xml,${svg}`,
    iconSize: [32, 41],
    iconAnchor: [16, 41],
    popupAnchor: [0, -41],
  });
}

function BarChart({ reports }) {
  // Defensive: ensure reports is always an array
  const safeReports = Array.isArray(reports) ? reports : [];
  const ALL_REGIONS = [
    'Greater Accra',
    'Ashanti',
    'Northern',
    'Volta',
    'Western',
    'Eastern',
    'Central',
    'Western North',
    'Bono',
    'Bono East',
    'Oti',
    'Upper East',
    'Upper West',
    'Savanna',
    'North East',
    'Ahafo',
  ];
  // Count cases by region
  const regionCounts = {};
  safeReports.forEach((r) => {
    let region = r.address || 'Unknown';
    regionCounts[region] = (regionCounts[region] || 0) + 1;
  });
  // Ensure all regions are shown
  ALL_REGIONS.forEach((region) => {
    if (!(region in regionCounts)) regionCounts[region] = 0;
  });
  const max = Math.max(...ALL_REGIONS.map((r) => regionCounts[r] || 0), 1);
  return (
    <div className="fixed bottom-8 right-8 z-[1001] bg-white bg-opacity-95 rounded-xl shadow-2xl p-8 w-[420px] border-2 border-blue-300 text-base flex flex-col items-center">
      <div className="font-bold text-blue-700 mb-4 text-lg">
        Cases by Region
      </div>
      <div className="w-full flex flex-col gap-3">
        {ALL_REGIONS.map((region) => (
          <div key={region} className="flex items-center gap-3">
            <span className="capitalize w-32 font-semibold text-blue-700">
              {region}
            </span>
            <div className="flex-1 h-6 bg-gray-100 rounded relative">
              <div
                className="h-6 rounded bg-blue-400"
                style={{
                  width: `${((regionCounts[region] || 0) / max) * 100}%`,
                  transition: 'width 0.5s',
                }}
              ></div>
              <span className="absolute right-2 top-1 text-xs font-bold text-gray-700">
                {regionCounts[region] || 0}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Project() {
  const [reports, setReports] = useState([]);
  // Center on Ghana
  const [center, setCenter] = useState([7.9465, -1.0232]);

  useEffect(() => {
    fetchItems('reports').then((res) => {
      setReports(res.data.data.data || []);
    });
  }, []);

  // Ghana GeoJSON (simplified, for demonstration)
  const ghanaGeoJson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-3.255, 11.175],
              [-3.255, 4.71],
              [1.199, 4.71],
              [1.199, 11.175],
              [-3.255, 11.175],
            ],
          ],
        },
        properties: { name: 'Ghana' },
      },
    ],
  };

  const stats = getStats(reports);

  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-100 via-blue-300 to-purple-200 overflow-hidden">
      <VirusCellAnimation />
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100vw' }}
        className="animate-fade-in"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Ghana regional boundary (simple polygon) */}
        <GeoJSON
          data={ghanaGeoJson}
          style={{ color: '#2563eb', weight: 2, fillOpacity: 0.08 }}
        />
        {reports.map((report, idx) =>
          report.location && report.location.coordinates ? (
            <Marker
              key={idx}
              position={[
                report.location.coordinates[1],
                report.location.coordinates[0],
              ]}
              icon={getMarkerIcon(report.diseaseStatus)}
            >
              <Popup>
                <div className="text-sm animate-fade-in">
                  <div className="font-bold text-blue-700 mb-1">
                    {report.address || 'No address'}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    Status: {report.diseaseStatus}
                  </div>
                  <div>
                    <span className="font-semibold">Region:</span>{' '}
                    {report.address}
                  </div>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
      {/* Stats panel at bottom left */}
      <div className="z-[1001] animate-fade-in">
        <StatsPanel reports={reports} />
      </div>
      {/* Bar chart at bottom right */}
      <div className="z-[1001] animate-fade-in">
        <BarChart reports={reports} />
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

export default Project;
