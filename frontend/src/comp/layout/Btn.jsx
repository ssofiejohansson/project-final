// Btn.jsx
export const Btn = ({ onClick, children, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        bg-[#2d8eef]
        text-white
        font-bold
        font-[Kumbh_Sans]
        text-[1.4rem]
        tracking-wide
        py-4 px-16
        rounded-[18px]
        cursor-pointer
        outline-none
        text-center
        block
        shadow-[0_5px_0_0_#2763d1]
        active:translate-y-[5px]
        active:shadow-none
        transition
        duration-100
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export const BtnBig = Btn;

// Btn.jsx
export const BtnSmall = ({
  onClick,
  children,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        bg-[#2d8eef]
        text-white
        font-bold
        font-[Kumbh_Sans]
        text-base
        tracking-wide
        py-2 px-4
        rounded-[18px]
        cursor-pointer
        outline-none
        text-center
        block
        shadow-[0_3px_0_0_#2763d1]
        m-1
        active:translate-y-[5px]
        active:shadow-none
        transition
        duration-100
        ${className}
      `}
    >
      {children}
    </button>
  );
};
