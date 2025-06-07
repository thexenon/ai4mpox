import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchItems } from '../../services/api';
import { submitUpdate } from '../../services/user_api';

export default function EditNews() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newsId = params.get('id');
    if (!newsId) {
      setError('No news item selected');
      setLoading(false);
      return;
    }
    fetchItems('news')
      .then((data) => {
        const items = data.data.data.data;
        const news = items.find(
          (n) =>
            String(n.id) === String(newsId) || String(n._id) === String(newsId)
        );
        if (news) {
          setForm({
            title: news.title,
            newsmessage: news.newsmessage,
            socials: news.socials,
            images: [],
            imageUrls: news.images,
          });
          setImagePreviews(news.images);
          setImageFiles([]);
        } else {
          setError('News item not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load news item');
        setLoading(false);
      });
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      const filesArr = Array.from(files);
      setImageFiles((prev) => [...prev, ...filesArr]);
      setImagePreviews((prev) => [
        ...prev,
        ...filesArr.map((file) => URL.createObjectURL(file)),
      ]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSocialChange = (idx, value) => {
    const newSocials = [...form.socials];
    newSocials[idx] = value;
    setForm({ ...form, socials: newSocials });
  };

  const addSocialField = () => {
    setForm({ ...form, socials: [...form.socials, ''] });
  };

  const removeSocialField = (idx) => {
    const newSocials = form.socials.filter((_, i) => i !== idx);
    setForm({ ...form, socials: newSocials });
  };

  const handleRemoveImage = (idx) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setForm((prev) => ({
      ...prev,
      imageUrls: (prev.imageUrls || []).filter((_, i) => i !== idx),
    }));
  };

  const uploadImagesAndGetUrls = async (files) => {
    const urls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Server Images'); // Replace with your Cloudinary upload preset
      formData.append('folder', 'AI4MPOX/news-images');
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
        const uploadedUrls = await uploadImagesAndGetUrls(imageFiles);
        imageUrls = [...imageUrls, ...uploadedUrls];
      }
      const newsData = {
        title: form.title,
        newsmessage: form.newsmessage,
        socials: form.socials.filter((s) => s.trim() !== ''),
        images: imageUrls,
      };
      const result = await submitUpdate(
        newsData,
        `news/${new URLSearchParams(location.search).get('id')}`
      );
      if (result.status === 200) {
        setMessage('News item updated!');
        setTimeout(() => navigate(-1), 1200);
      } else {
        setMessage(result?.data?.message || 'Failed to update news item');
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
      <h2 className="text-2xl font-bold mb-4">Edit News</h2>
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
          <label className="block font-medium">News Message</label>
          <textarea
            name="newsmessage"
            value={form.newsmessage}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Social Links</label>
          {form.socials.map((social, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <input
                type="url"
                placeholder="https://..."
                value={social}
                onChange={(e) => handleSocialChange(idx, e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              {form.socials.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSocialField(idx)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSocialField}
            className="text-blue-500 mt-1"
          >
            + Add another link
          </button>
        </div>
        <div>
          <label className="block font-medium">Images</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="w-full"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {imagePreviews.map((img, idx) => (
              <div key={idx} className="relative inline-block">
                <img
                  src={img}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded border"
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
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={saving}
        >
          {saving ? 'Updating...' : 'Update News'}
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
