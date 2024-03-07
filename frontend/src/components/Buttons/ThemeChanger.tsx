import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

const ThemeChangerButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      type="button"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className="p-2 outline-0 cursor-pointer"
    >
      {/* Toggle Mode */}
      {theme === "light" && <MoonIcon className="h-6 w-6 text-[#212529]" />}

      {theme === "dark" && <SunIcon className="h-6 w-6 text-[#fafafa]" />}
      {theme !== "dark" && theme !== "light" && (
        <MoonIcon className="h-6 w-6 text-[#212529]" />
      )}
    </button>
  );
};

export default ThemeChangerButton;
