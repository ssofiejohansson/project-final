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
    "font-bold tracking-[0.08em] rounded-[18px] transition duration-200 focus:outline-none focus:ring-2  disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-12 py-4 text-lg",
  };

  const variantClasses = {
    filled: "bg-main text-white shadow-[0_5px_0_0_#f24e03] active:translate-y-[5px] active:shadow-none",

    outlined: "border-2 border-main text-main bg-transparent shadow-md hover:scale-105 active:scale-105 active:shadow-sm",

    text: "text-main bg-transparent shadow-sm hover:text-text",
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


// filled: "bg-main text-white hover:bg-white hover:text-main",
// filled: "bg-[#2D8EEF] text-white font-kumbh font-bold tracking-[0.08em] text-[1.4rem] px-16 py-4 rounded-[18px] shadow-[0_5px_0_0_#2763D1] active:translate-y-[5px] active:shadow-none",
// outlined: "border border-accent text-text hover:text-text",
// text: "text-main hover:text-text",