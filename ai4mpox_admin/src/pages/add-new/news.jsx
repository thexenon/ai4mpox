import React, { useState } from 'react';
import '../../styles/globals.css';
import { submitPost } from '../../services/user_api';

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [socialLinks, setSocialLinks] = useState(['']);
  const [newsmessage, setBody] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  // Cloudinary upload function
  const uploadImagesAndGetUrls = async (files) => {
    const urls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Server Images');
      formData.append('folder', 'news-images');
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

  const handleSocialChange = (idx, value) => {
    setSocialLinks((prev) => prev.map((s, i) => (i === idx ? value : s)));
  };

  const addSocialLink = () => {
    setSocialLinks((prev) => [...prev, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      let imageUrls = [];
      if (images.length > 0) {
        imageUrls = await uploadImagesAndGetUrls(images);
      }
      const newsData = {
        title,
        socials: socialLinks.filter((s) => s.trim() !== ''), // store as array
        newsmessage,
        images: imageUrls,
      };
      await submitPost(newsData, 'news').then((result) => {
        if (result.status === 201) {
          setMessage('News saved successfully!');
          setTitle('');
          setSocialLinks(['']);
          setBody('');
          setImages([]);
        } else {
          setMessage('Failed to save news.');
        }
      });
    } catch (err) {
      // setMessage('Error saving news.');
      setMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Add News
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              News Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {images.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt={`preview-${idx}`}
                    className="w-24 h-24 object-cover rounded border border-gray-200 shadow"
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              News Title
            </label>
            <input
              type="text"
              placeholder="Enter news title"
              minLength={10}
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              News Socials
            </label>
            {Array.isArray(socialLinks) &&
              socialLinks.map((link, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Enter social link #${idx + 1}`}
                  value={link}
                  onChange={(e) => handleSocialChange(idx, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 mb-2"
                />
              ))}
            <button
              type="button"
              onClick={addSocialLink}
              className="mt-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded shadow text-sm"
            >
              + Add Social Link
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              News Body
            </label>
            <textarea
              cols="30"
              rows="6"
              value={newsmessage}
              onChange={(e) => setBody(e.target.value)}
              required
              minLength={20}
              placeholder="Write the news content here..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-colors duration-200 disabled:opacity-60"
          >
            {loading ? 'Saving...' : 'Save News'}
          </button>
          {message && (
            <div className="text-center text-green-600 font-medium mt-2">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddNews;
