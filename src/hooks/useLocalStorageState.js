// 引入 React 的 useState 和 useEffect 鉤子。
import { useState, useEffect } from "react";

// 定義 useLocalStorageState 鉤子，此函數接收初始狀態值（initialState）和用於在 localStorage 中儲存的鍵名（key）。
export function useLocalStorageState(initialState, key) {
  // 使用 useState 初始化狀態。useState 內部使用一個函數來延遲執行，以避免每次渲染時都執行 localStorage 的讀取操作。
  const [value, setValue] = useState(function () {
    // 從 localStorage 獲取與 key 相對應的值。
    const storedValue = localStorage.getItem(key);
    // 如果存在 storedValue，則通過 JSON.parse 將其解析成 JavaScript 的數據類型。
    // 如果不存在 storedValue，則使用傳入的 initialState 作為狀態的初始值。
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // 使用 useEffect 鉤子來監聽 value 和 key 的變化。
  useEffect(
    function () {
      // 當 value 或 key 發生變化時，將 value 序列化後存儲到 localStorage 中。
      // JSON.stringify 用於將 JavaScript 值轉換為 JSON 字符串。
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key] // 依賴數組，只有 value 或 key 變化時才執行此副作用。
  );

  // 返回 value 和 setValue，使得使用此 Hook 的組件能夠獲取當前值並且設置新的值。
  return [value, setValue];
}
