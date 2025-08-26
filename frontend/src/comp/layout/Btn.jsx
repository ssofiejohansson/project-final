export const Btn = ({
  onClick,
  children,
  type = "button",
  variant = "filled",
  size = "md",
  className = "",
  ariaLabel,
  disabled = false,
}) => {
  const baseClasses =
    "rounded-lg font-semibold transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const variantClasses = {
    filled: "bg-main text-white hover:bg-white hover:text-main",
    outlined: "border border-accent text-text hover:text-text",
    text: "text-main hover:text-text",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
