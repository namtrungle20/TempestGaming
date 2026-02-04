import { Switch } from "@heroui/react";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái lúc đầu
    const theme = localStorage.getItem("theme");
    const isDarkSystem = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === "dark" || (!theme && isDarkSystem)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const handleToggle = (checked) => {
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setIsDark(checked);
  };

  return (
    <div className="flex items-center justify-center px-2 py-0.7 rounded-full bg-[var(--text-main)]/[0.08] backdrop-blur-md border border-[var(--text-main)]/[0.15] shadow-sm transition-all hover:bg-[var(--text-main)]/[0.12]">
      <Switch
        isSelected={isDark}
        onValueChange={handleToggle}
        size="md"
        color="secondary"
        startContent={<Moon size={16} />}
        endContent={<Sun size={16} />}
        classNames={{
          base: "max-w-fit",
          wrapper: [
            "h-7 w-12",
            "bg-transparent",
            "group-data-[selected=true]:bg-transparent",
          ],
          thumb: [
            "w-5 h-5",
            "bg-white",
            "shadow-[0_2px_10px_rgba(0,0,0,0.2)]", // Đổ bóng đậm cho nút tròn
            "group-data-[selected=true]:ml-5",
          ],
          // Tăng màu sắc cho nội dung bên trong
          startContent: "text-[var(--text-main)]",
          endContent: "text-[var(--text-main)]",
        }}
      />
    </div >
  );
};
export default ThemeToggle;