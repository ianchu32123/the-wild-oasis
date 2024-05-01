import { HiXMark } from "react-icons/hi2"; // 引入圖標
import styled from "styled-components"; // 引入 styled-components 用於定義樣式
import { createPortal } from "react-dom"; // 用於將元素渲染到 DOM 樹之外
import { cloneElement, createContext, useContext, useState } from "react"; // 引入 React 相關功能
import { useOutsideClick } from "../hooks/useOutsideClick"; // 自定義鉤子，用於處理點擊外部關閉模態框的邏輯

// 定義模態框的主體樣式
const StyledModal = styled.div`
  position: fixed; // 固定定位
  top: 50%; // 垂直居中
  left: 50%; // 水平居中
  transform: translate(-50%, -50%); // 修正定位偏移
  background-color: var(--color-grey-0); // 背景色
  border-radius: var(--border-radius-lg); // 邊框圓角
  box-shadow: var(--shadow-lg); // 陰影效果
  padding: 3.2rem 4rem; // 內邊距
  transition: all 0.5s; // 過渡效果
`;

// 定義遮罩層樣式
const Overlay = styled.div`
  position: fixed; // 固定定位
  top: 0; // 起始位置
  left: 0; // 起始位置
  width: 100%; // 寬度
  height: 100vh; // 高度
  background-color: var(--backdrop-color); // 背景色
  backdrop-filter: blur(4px); // 背景模糊
  z-index: 1000; // 層級
  transition: all 0.5s; // 過渡效果
`;

// 定義按鈕樣式
const Button = styled.button`
  background: none; // 無背景
  border: none; // 無邊框
  padding: 0.4rem; // 內邊距
  border-radius: var(--border-radius-sm); // 邊框圓角
  transform: translateX(0.8rem); // 位移
  transition: all 0.2s; // 過渡效果
  position: absolute; // 絕對定位
  top: 1.2rem; // 上邊距
  right: 1.9rem; // 右邊距

  &:hover {
    background-color: var(--color-grey-100); // 滑鼠懸停背景色
  }

  & svg {
    width: 2.4rem; // 圖標寬度
    height: 2.4rem; // 圖標高度
    color: var(--color-grey-500); // 圖標顏色
  }
`;

// 創建 Context
const ModelContext = createContext();

// 模態框提供者組件
function Modal({ children }) {
  const [openName, setOpenName] = useState(""); // 狀態：當前打開的模態框名稱

  const close = () => setOpenName(""); // 關閉模態框函數
  const open = setOpenName; // 打開模態框函數

  return (
    <ModelContext.Provider value={{ openName, close, open }}>
      {children}
    </ModelContext.Provider>
  );
}

// 打開按鈕組件，用於觸發打開模態框
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModelContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

// 模態框窗體組件
function Window({ children, name }) {
  const { openName, close } = useContext(ModelContext);
  const ref = useOutsideClick(close); // 處理點擊外部關閉

  if (name !== openName) {
    return null; // 如果當前名稱不是打開狀態，不渲染組件
  }

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { OnCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 將子組件掛載到 Modal 上，方便外部調用
Modal.Open = Open;
Modal.Window = Window;
export default Modal;
