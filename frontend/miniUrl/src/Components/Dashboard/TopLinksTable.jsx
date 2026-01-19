const TopLinksTable = ({ links = [] }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold text-gray-900">
          Top Links (by clicks)
        </h2>
      </div>

      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-2 text-left">Short URL</th>
            <th className="px-4 py-2 text-left">Original URL</th>
            <th className="px-4 py-2 text-right">Clicks</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link) => (
            <tr
              key={link.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-2 font-medium">
                {link.short_code}
              </td>

              <td className="px-4 py-2 text-gray-600 truncate max-w-xs">
                {link.original_url}
              </td>

              <td className="px-4 py-2 text-right font-semibold">
                {link.total_clicks}
              </td>
            </tr>
          ))}

          {links.length === 0 && (
            <tr>
              <td
                colSpan="3"
                className="px-4 py-6 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TopLinksTable;
