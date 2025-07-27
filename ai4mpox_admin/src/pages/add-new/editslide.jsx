import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchItems } from '../../services/api';
import { submitUpdate } from '../../services/user_api';

export default function EditUserForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const slideId = params.get('id');
    if (!slideId) {
      setError('No slide selected');
      setLoading(false);
      return;
    }

    fetchItems('slide')
      .then((data) => {
        const slides = data.data.data.data;
        // Fix: slide.id may be _id or id, and slideId may be string or number
        const slide = slides.find(
          (u) => String(u.id || u._id) === String(slideId)
        );
        if (slide) {
          setForm({
            title: slide.title || '',
            content: slide.content || '',
            image: slide.image || '',
          });
          setImagePreview(slide.image ? [slide.image] : []);
          setImageFiles([]);
        } else {
          setError('User not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load slide');
        setLoading(false);
      });
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      if (file) {
        setImageFiles((prev) => [...prev, file]);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview((prev) => [...(prev || []), reader.result]);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRemoveImage = (idx) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== idx));
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setForm((prev) => ({
      ...prev,
      imageUrls: (prev.imageUrls || []).filter((_, i) => i !== idx),
    }));
  };

  const uploadImagesToCloudinary = async (files) => {
    const urls = [];
    for (const file of files) {
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
      if (data.secure_url) {
        urls.push(data.secure_url);
      }
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      let imageUrls = form.imageUrls ? [...form.imageUrls] : [];
      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadImagesToCloudinary(imageFiles);
        imageUrls = [...imageUrls, ...uploadedUrls];
      }
      const slideData = {
        title: form.title,
        content: form.content,
        image: imageUrls[0],
      };
      const result = await submitUpdate(
        slideData,
        `slide/${new URLSearchParams(location.search).get('id')}`
      );
      if (result.status === 200) {
        setMessage('Slide updated!');
        setTimeout(() => navigate(-1), 1200);
      } else {
        setMessage(result?.data?.message || 'Failed to update slide');
      }
    } catch (err) {
      setMessage('An error occurred.');
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center text-red-600 p-8">{error}</div>;
  if (!form) return null;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Slide</h2>
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
          {imagePreview && imagePreview.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreview.map((img, idx) => (
                <div key={idx} className="relative inline-block">
                  <img
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="w-32 h-32 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-700"
                    title="Remove image"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={saving}
        >
          {saving ? 'Updating...' : 'Update Slide'}
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
