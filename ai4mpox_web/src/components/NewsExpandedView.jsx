import React from 'react';

function NewsExpandedView({ article }) {
  if (!article) return null;
  return (
    <div className="mt-4 space-y-2 text-base">
      {article.date && (
        <div className="text-xs text-gray-400 mb-2">
          <span className="font-semibold">Published:</span>{' '}
          {new Date(article.date).toLocaleDateString()}
        </div>
      )}

      {article.sender && article.sender.name && (
        <div className="text-gray-700">
          <span className="font-semibold">Sender:</span> {article.sender.name}
        </div>
      )}
      {article.summary && (
        <div className="text-gray-700">
          <span className="font-semibold">Summary:</span> {article.summary}
        </div>
      )}
      {article.description && (
        <div className="text-gray-700">
          <span className="font-semibold">Description:</span>{' '}
          {article.description}
        </div>
      )}
      {article.newsmessage && (
        <div className="text-gray-700">
          <span className="font-semibold">News Message:</span>{' '}
          {article.newsmessage}
        </div>
      )}
      {article.images &&
        Array.isArray(article.images) &&
        article.images.length > 0 && (
          <div>
            <span className="font-semibold">Images:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {article.images.map((img, i) => (
                <a
                  key={i}
                  href={img}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={img}
                    alt={`News image ${i + 1}`}
                    className="w-40 h-28 object-cover rounded border hover:shadow-lg hover:scale-105 transition-transform"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      {article.tags &&
        Array.isArray(article.tags) &&
        article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

      {article.createdAt && (
        <div className="text-xs text-gray-400">
          <span className="font-semibold">Created:</span>{' '}
          {new Date(article.createdAt).toLocaleString()}
        </div>
      )}
      {article.updatedAt && (
        <div className="text-xs text-gray-400">
          <span className="font-semibold">Updated:</span>{' '}
          {new Date(article.updatedAt).toLocaleString()}
        </div>
      )}

      {article.socials &&
        Array.isArray(article.socials) &&
        article.socials.length > 0 && (
          <div className="mt-2">
            <span className="font-semibold">Social Links:</span>
            <ul className="flex flex-col gap-1 mt-1">
              {article.socials.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 text-sm break-all"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}

export default NewsExpandedView;
