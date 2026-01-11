import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const UrlsTable = ({ urls = [], onDelete }) => {
  const [qrUrl, setQrUrl] = useState(null);

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    alert('Short URL copied!');
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 relative">
      <table className="w-full border border-gray-200 rounded-md">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm text-gray-600">
            <th className="px-4 py-3">Original URL</th>
            <th className="px-4 py-3">Short URL</th>
            <th className="px-4 py-3 text-center">Redirects</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {urls.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                No URLs created yet
              </td>
            </tr>
          ) : (
            urls.map((url) => (
              <tr key={url.id} className="border-t border-gray-200 text-sm">
                <td className="px-4 py-3 break-all">
                  {url.original_url}
                </td>

                <td className="px-4 py-3 text-blue-600 break-all">
                  <a
                    href={url.short_code}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {url.short_code}
                  </a>
                </td>

                <td className="px-4 py-3 text-center">
                  {url.redirect_count}
                </td>

                <td className="px-4 py-3 flex justify-center gap-3">
                  {/* Copy */}
                  <button
                    onClick={() => handleCopy(url.short_code)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-100"
                  >
                    Copy
                  </button>

                  {/* QR */}
                  <button
                    onClick={() => setQrUrl(url.short_code)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-100"
                  >
                    QR
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => onDelete(url.id)}
                    className="border border-red-400 text-red-500 rounded-md px-3 py-1 text-sm hover:bg-red-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* QR Popup (no dark background) */}
      {qrUrl && (
        <div className="absolute top-10 right-10 bg-white border border-gray-300 shadow-lg rounded-lg p-5 z-50">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold">QR Code</h2>
            <button
              onClick={() => setQrUrl(null)}
              className="text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          <QRCodeCanvas value={qrUrl} size={180} />
        </div>
      )}
    </div>
  );
};

export default UrlsTable;
