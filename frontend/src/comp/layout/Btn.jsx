// Btn.jsx
export const Btn = ({
  onClick,
  children,
  type = "button",
  variant = "filled",
  color = "blue",
  size = "md",
  className = "",
}) => {
  // Base button classes
  const baseClasses = "rounded-lg font-semibold transition duration-200 shadow-md";

  // Size options
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  // Variant options
  const variantClasses = {
    filled: `bg-${color}-600 text-white hover:bg-${color}-700`,
    outlined: `border border-${color}-600 text-${color}-600 hover:bg-${color}-50`,
    text: `text-${color}-600 hover:underline`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
