import { useTheme } from "../context/ThemeContext"; // Mengimpor konteks tema

function ActionButton({ children, disabled, onClick }) {
  const { theme } = useTheme(); // Mengambil tema saat ini

  const bgColor = theme === "dark" ? "bg-blue-900" : "bg-[#19918F]";
  const shadowColor =
    theme === "dark"
      ? "shadow-[0_0_10px_0_rgba(0,102,204,1)]"
      : "shadow-[0_0_10px_0_rgba(25,145,143,1)]";
  const textColor = theme === "dark" ? "text-gray-200" : "text-white";

  return (
    <button
      className={`${bgColor} ${textColor} font-bold ${shadowColor} p-4 rounded-[5px] hover:scale-105 transition-all active:scale-110 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
      onClick={disabled ? null : onClick}
    >
      {children}
    </button>
  );
}

export default ActionButton;
