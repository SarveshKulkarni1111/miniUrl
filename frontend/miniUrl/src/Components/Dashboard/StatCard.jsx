const StatCard = ({ label, value, unit }) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-900">
        {value}
        {unit && <span className="text-sm font-medium ml-1">{unit}</span>}
      </p>
    </div>
  );
};

export default StatCard;
