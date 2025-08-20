import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CustomPinIcon } from '../../layouts/mappin';
import { renderToString } from 'react-dom/server';
import { submitPost } from '../../services/user_api';

const initialState = {
  address: '',
  longitude: '',
  latitude: '',
  diseaseStatus: '',
};

// Fix default marker icon for leaflet
if (typeof window !== 'undefined' && L && L.Icon && L.Icon.Default) {
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

function LocationSelector({ value, onChange }) {
  useMapEvents({
    click(e) {
      onChange(e.latlng);
    },
  });
  if (!value) return null;
  // Render the custom SVG as a Leaflet divIcon
  const customIcon = L.divIcon({
    className: '',
    html: `<div style="transform: translate(-16px, -32px);">${renderToString(
      CustomPinIcon()
    )}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
  return <Marker position={value} icon={customIcon} />;
}

const DEFAULT_CENTER = { lat: 0, lng: 0 }; // World view if no location

function LocationSearch({ onSelect, mapRef }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const timeoutRef = useRef();

  const handleInput = (e) => {
    setQuery(e.target.value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (e.target.value.length > 2) searchLocation(e.target.value);
    }, 500);
  };

  const handleSearchClick = () => {
    if (query.length > 2) searchLocation(query);
  };

  const searchLocation = async (q) => {
    setSearching(true);
    setResults([]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          q
        )}`
      );
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    }
    setSearching(false);
  };

  return (
    <div className="mb-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder="Search for a location..."
          className="w-full border rounded px-3 py-2 mb-1"
        />
        <button
          type="button"
          onClick={handleSearchClick}
          className="bg-blue-600 text-white px-3 py-2 rounded mb-1"
        >
          Search
        </button>
      </div>
      {searching && <div className="text-xs text-gray-500">Searching...</div>}
      {results.length > 0 && (
        <div className="bg-white border rounded shadow max-h-40 overflow-y-auto mt-1">
          <ul>
            {results.slice(0, 5).map((r, idx) => (
              <li
                key={idx}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm border-b last:border-b-0"
                onClick={() => {
                  const latlng = {
                    lat: parseFloat(r.lat),
                    lng: parseFloat(r.lon),
                  };
                  onSelect(latlng);
                  setQuery(r.display_name);
                  setResults([]);
                  if (mapRef && mapRef.current) {
                    mapRef.current.setView(latlng, 15);
                  }
                }}
              >
                {r.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MapControl({ location }) {
  const map = useMap();
  React.useEffect(() => {
    if (location) {
      map.setView(location, 15);
    }
  }, [location, map]);
  return null;
}

const AddReport = () => {
  const [form, setForm] = useState(initialState);
  // Use null for location until user selects or searches
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const mapRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (latlng) => {
    setLocation(latlng);
    setForm({ ...form, longitude: latlng.lng, latitude: latlng.lat });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        address: form.address,
        diseaseStatus: form.diseaseStatus,
        location: {
          type: 'Point',
          coordinates: [parseFloat(form.longitude), parseFloat(form.latitude)],
        },
      };
      await submitPost(payload, 'reports').then((result) => {
        if (result.status === 201 || result.status === 200) {
          setSuccess('Report added successfully!');
          setTimeout(() => navigate('/reports'), 1000);
        } else {
          throw new Error(result?.data?.message || 'Failed to add report');
        }
      });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to add report. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h2 className="text-xl font-bold mb-6">Add New Disease Report</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block font-semibold mb-1">Address (Region)</label>
          <select
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select region</option>
            <option value="Greater Accra">Greater Accra</option>
            <option value="Ashanti">Ashanti</option>
            <option value="Northern">Northern</option>
            <option value="Volta">Volta</option>
            <option value="Western">Western</option>
            <option value="Eastern">Eastern</option>
            <option value="Central">Central</option>
            <option value="Western North">Western North</option>
            <option value="Bono">Bono</option>
            <option value="Bono East">Bono East</option>
            <option value="Oti">Oti</option>
            <option value="Upper East">Upper East</option>
            <option value="Upper West">Upper West</option>
            <option value="Savanna">Savanna</option>
            <option value="North East">North East</option>
            <option value="Ahafo">Ahafo</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Disease Status</label>
          <select
            name="diseaseStatus"
            value={form.diseaseStatus}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select status</option>
            <option value="suspected">Suspected</option>
            <option value="confirmed">Confirmed</option>
            <option value="recovered">Recovered</option>
            <option value="deceased">Deceased</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">
            Location (select on map)
          </label>
          <LocationSearch onSelect={handleLocationChange} mapRef={mapRef} />
          <div className="h-64 w-full rounded overflow-hidden mb-2">
            <MapContainer
              center={location || DEFAULT_CENTER}
              zoom={location ? 15 : 2}
              style={{ height: '100%', width: '100%' }}
              whenCreated={(mapInstance) => {
                mapRef.current = mapInstance;
              }}
              key={location ? `${location.lat},${location.lng}` : 'default'}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <MapControl location={location} />
              <LocationSelector
                value={location}
                onChange={handleLocationChange}
              />
            </MapContainer>
          </div>
          {location && (
            <div className="text-xs text-gray-600">
              Selected: Lng: {location.lng}, Lat: {location.lat}
            </div>
          )}
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Add Report'}
        </button>
      </form>
    </div>
  );
};

export default AddReport;
