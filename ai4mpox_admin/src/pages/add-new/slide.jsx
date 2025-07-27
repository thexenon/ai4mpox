import React, { useState } from 'react';
import { submitPost } from '../../services/user_api';

const initialState = {
  title: '',
  content: '',
  image: null,
};

export default function AddSlide() {
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

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Server Images'); // Replace with your Cloudinary upload preset
    formData.append('folder', 'AI4MPOX/slide-images');
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
      const slideData = {
        title: form.title,
        content: form.content,
        image: imageUrl,
      };
      const result = await submitPost(slideData, 'slide');
      if (result.status === 201 || result.status === 200) {
        setMessage('Slide added!');
        setForm(initialState);
        setImagePreview(null);
      } else {
        setMessage(result?.data?.message || 'Failed to add slide');
      }
    } catch (err) {
      setMessage('An error occurred.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Slide</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block font-medium">Content</label>
          <textarea
            name="content"
            value={form.content}
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Slide'}
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
