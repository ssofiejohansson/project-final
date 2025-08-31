export const Input = ({ label, type, name, value, onChange }) => (
  <div>
    <label className="block text-mg mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none text-fonttext"
      required
    />
  </div>
);
