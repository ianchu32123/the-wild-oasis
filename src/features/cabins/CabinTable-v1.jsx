import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
/* 
Table 样式定义了一个表格容器，包含了表格的边框、字体大小、背景颜色、边框圆角等样式。
*/
const Table = styled.div`
  border: 1px solid var(--color-grey-200); /* 設置表格邊框為 1px 實線，顏色為灰色 */
  font-size: 1.4rem; /* 設置字體大小為 1.4rem */
  background-color: var(--color-grey-0); /* 設置背景顏色為灰色 */
  border-radius: 7px; /* 設置邊框圓角為 7px */
  overflow: hidden; /* 設置溢出隱藏 */
`;

/* 
TableHeader 样式定义了表格的表頭部分，包括了表頭的布局、列数、列間距、對齊方式等樣式。
*/
const TableHeader = styled.header`
  display: grid; /* 設置表頭為網格布局 */
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; /* 設置表頭的列布局，每列寬度比例為 0.6fr、1.8fr、2.2fr、1fr、1fr、1fr */
  column-gap: 2.4rem; /* 設置列之間的間距為 2.4rem */
  align-items: center; /* 設置內容在列中垂直居中對齊 */
  background-color: var(--color-grey-50); /* 設置背景顏色為淺灰色 */
  border-bottom: 1px solid var(--color-grey-100); /* 設置底部邊框為 1px 實線，顏色為灰色 */
  text-transform: uppercase; /* 設置文字轉換為大寫 */
  letter-spacing: 0.4px; /* 設置字母間距為 0.4px */
  font-weight: 600; /* 設置字體粗細為 600 */
  color: var(--color-grey-600); /* 設置文字顏色為灰色 */
  padding: 1.6rem 2.4rem; /* 設置內邊距為 1.6rem 頂部和底部，2.4rem 左側和右側 */
`;

import React from "react";
import CabinRow from "./CabinRow";

export default function CabinTable() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabins</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}
