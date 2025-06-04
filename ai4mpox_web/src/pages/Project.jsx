import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
  return (
    <div className="absolute -top-3 -right-3 z-[1000]">
      <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow border border-white min-w-[40px] text-center">
        {report.age ? `Age: ${report.age}` : ''}
        {report.gender ? ` ${report.gender}` : ''}
      </div>
    </div>
  );
}

function getStats(reports) {
  // Disease status counts
  const diseaseStatus = {};
  const gender = {};
  const region = {};
  reports.forEach((r) => {
    // Disease status
    if (r.diseaseStatus)
      diseaseStatus[r.diseaseStatus] =
        (diseaseStatus[r.diseaseStatus] || 0) + 1;
    // Gender
    if (r.gender) gender[r.gender] = (gender[r.gender] || 0) + 1;
    // Region (from address, crude split by first word or comma)
    if (r.address) {
      const reg = r.address.split(',')[0].trim();
      if (reg) region[reg] = (region[reg] || 0) + 1;
    }
  });
  return { diseaseStatus, gender, region };
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
      name: 'Ashanti',
      bounds: [
        [-2.0, 6.5],
        [-0.5, 7.5],
      ],
    },
    {
      name: 'Northern',
      bounds: [
        [-2.5, 8.5],
        [-0.5, 10.5],
      ],
    },
    {
      name: 'Volta',
      bounds: [
        [0.0, 6.0],
        [1.2, 8.0],
      ],
    },
    {
      name: 'Western',
      bounds: [
        [-3.2, 4.7],
        [-1.5, 6.0],
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
  const ALL_GENDERS = ['male', 'female', 'other'];
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
  // Gender counts
  const genderCounts = {};
  // Region counts
  const regionCounts = {};

  reports.forEach((r) => {
    // Disease status
    const status = r.diseaseStatus || 'unknown';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
    // Gender
    const gender = r.gender || 'unknown';
    genderCounts[gender] = (genderCounts[gender] || 0) + 1;
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
  ALL_GENDERS.forEach((gender) => {
    if (!(gender in genderCounts)) genderCounts[gender] = 0;
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
      <div className="mb-4">
        <div className="font-semibold text-gray-700 mb-1">By Gender:</div>
        <ul className="ml-2 flex flex-wrap gap-2">
          {ALL_GENDERS.map((gender) => (
            <li
              key={gender}
              className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center"
            >
              <span className="capitalize">{gender}</span>
              <span className="ml-2">{genderCounts[gender]}</span>
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
    <div className="fixed inset-0 z-0">
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Ghana regional boundary (simple polygon) */}
        <GeoJSON
          data={ghanaGeoJson}
          style={{ color: '#2563eb', weight: 2, fillOpacity: 0.05 }}
        />
        {reports.map((report, idx) =>
          report.location && report.location.coordinates ? (
            <Marker
              key={idx}
              position={[
                report.location.coordinates[1],
                report.location.coordinates[0],
              ]}
              icon={markerIcon}
            >
              {/* Badge overlay */}
              <div style={{ position: 'relative' }}>
                <PinBadge report={report} />
              </div>
              <Popup>
                <div className="text-sm">
                  <div className="font-bold text-blue-700 mb-1">
                    {report.address || 'No address'}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {report.occupation} | {report.gender} | Age: {report.age} |
                    Status: {report.diseaseStatus}
                  </div>
                  <div>
                    <span className="font-semibold">Occupation:</span>{' '}
                    {report.occupation}
                  </div>
                  <div>
                    <span className="font-semibold">Marital Status:</span>{' '}
                    {report.maritalStatus}
                  </div>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
      {/* Stats panel at bottom left */}
      <StatsPanel reports={reports} />
    </div>
  );
}

export default Project;
