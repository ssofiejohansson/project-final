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
    "font-bold tracking-[0.08em] rounded-[18px] transition duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4 text-xl",
    lg: "px-12 py-6 text-lg",
  };

  const variantClasses = {
    filled:
      "bg-main text-white shadow-[0_5px_0_0_#f24e03] hover:-translate-y-1  active:translate-y-[5px] active:shadow-none",
    outlined:
      "border-2 border-main text-main bg-transparent shadow-sm hover:scale-110 active:scale-110 active:shadow-sm",
    text: "text-main bg-transparent shadow-md hover:text-light",
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
