// 引入 React 的 createContext 和 useContext 用於創建和使用上下文，useEffect 用於副作用管理。
import { createContext, useContext, useEffect } from "react";
// 引入自定義 hook useLocalStorageState 用於管理 localStorage 中的狀態。
import { useLocalStorageState } from "../hooks/useLocalStorageState";

// 創建一個上下文對象。
const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  // 使用自定義 hook 初始化深色模式狀態。若系統偏好設置為深色模式，則默認為 true。
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)"),
    "isDarkMode"
  );

  // 使用 useEffect 監聽 isDarkMode 的值，並根據其值更新頁面的類別，實現樣式的切換。
  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode] // 依賴數組包含 isDarkMode，當 isDarkMode 變化時執行效果。
  );

  // 定義切換深色模式的函數，該函數將 isDarkMode 的狀態取反。
  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  // 使用 DarkModeContext.Provider 包裝 children，並將深色模式的狀態和切換函數通過 value 傳遞給子組件。
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// 自定義 hook 用於讓組件能夠方便地訪問和使用深色模式的狀態和切換函數。
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

// 導出 DarkModeProvider 和 useDarkMode 以供其他組件使用。
export { DarkModeProvider, useDarkMode };
