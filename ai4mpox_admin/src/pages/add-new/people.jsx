import React, { useState } from 'react';
import { submitPost } from '../../services/user_api';

const initialState = {
  name: '',
  title: '',
  bio: '',
  contact: '',
  image: null,
  position: '',
  profiles: [''],
};

export default function AddTeamMember() {
  const [form, setForm] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm({ ...form, image: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleProfileChange = (idx, value) => {
    const newProfiles = [...form.profiles];
    newProfiles[idx] = value;
    setForm({ ...form, profiles: newProfiles });
  };

  const addProfileField = () => {
    setForm({ ...form, profiles: [...form.profiles, ''] });
  };

  const removeProfileField = (idx) => {
    const newProfiles = form.profiles.filter((_, i) => i !== idx);
    setForm({ ...form, profiles: newProfiles });
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Server Images'); // Replace with your Cloudinary upload preset
    formData.append('folder', 'people-images');
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/du0sqginv/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url || '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      let imageUrl = '';
      if (form.image) {
        imageUrl = await uploadImageToCloudinary(form.image);
      }
      const peopleData = {
        name: form.name,
        title: form.title,
        description: form.bio,
        contact: form.contact,
        image: imageUrl,
        position: form.position,
        profiles: form.profiles.filter((p) => p.trim() !== ''),
      };
      const result = await submitPost(peopleData, 'people');
      if (result.status === 201 || result.status === 200) {
        setMessage('Team member added!');
        setForm(initialState);
        setImagePreview(null);
      } else {
        setMessage(result?.data?.message || 'Failed to add team member');
      }
    } catch (err) {
      setMessage('An error occurred.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Team Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Description/Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Contact Details</label>
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded border"
            />
          )}
        </div>
        <div>
          <label className="block font-medium">Association</label>
          <input
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Profile Links</label>
          {form.profiles.map((profile, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <input
                type="text"
                placeholder="https://..."
                value={profile}
                onChange={(e) => handleProfileChange(idx, e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              {form.profiles.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProfileField(idx)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addProfileField}
            className="text-blue-500 mt-1"
          >
            + Add another link
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Member'}
        </button>
        {message && (
          <div className="mt-2 text-center text-sm text-blue-700">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
