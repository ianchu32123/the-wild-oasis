import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
    const ref = useRef();
  
    useEffect(() => {
      function handleClick(e) {
        // 如果 ref.current 存在且點擊的目標不在 ref.current 內部
        if (ref.current && !ref.current.contains(e.target)) {
          handler();  // 執行傳入的 handler 函數
        }
      }
  
      // 添加事件監聽器
      document.addEventListener("click", handleClick, listenCapturing);
  
      // 清除事件監聽器
      return () => document.removeEventListener("click", handleClick, listenCapturing);
    }, [handler, listenCapturing]);
  
    return ref;  // 返回 ref 以便外部元素使用
  }
  