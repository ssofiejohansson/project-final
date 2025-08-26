// Btn.jsx
export const Btn = ({
  onClick,
  children,
  type = "button",
  variant = "filled",
  // color = "blue",
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
    filled: `bg-main text-white hover:bg-white hover:text-main`,
    outlined: `border border-main text-main hover:text-text`,
    text: `text-main hover:text-text`,
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
