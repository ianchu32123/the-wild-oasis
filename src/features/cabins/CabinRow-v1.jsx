import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin, deleteCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

import CreateCabinForm from "./CreateCabinForm";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  color: var(--color-grey-600);
  transition: color 0.3s ease;
  &:hover {
    color: var(--color-grey-800);
  }
`;

// 定义图片样式组件
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

// 定义小屋名称样式组件
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

// 定义价格样式组件
const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

// 定义折扣样式组件
const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

// 小屋行组件
export default function CabinRow({ cabin }) {
  // 从小屋对象中解构出需要的属性
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  // 获取查询客户端实例
  const queryClient = useQueryClient();
  //處理複製小屋
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("成功複製小屋");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => toast.error(err.message),
  });

  // 使用 useMutation hook 执行删除小屋的异步操作
  const { isLoading: isDeleting, mutate } = useMutation({
    // mutationFn 是执行实际删除小屋的函数
    mutationFn: (id) => deleteCabin(id),
    // 删除成功时的回调函数
    onSuccess: () => {
      // 显示成功提示
      toast.success("成功刪除小屋");
      // 使查询无效以触发数据刷新
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    // 删除失败时的回调函数
    onError: (err) => toast.error(err.message),
  });

  // 渲染小屋行
  return (
    <Table.Row>
      {/* 渲染小屋图片 */}
      <Img src={image} />
      {/* 渲染小屋名称 */}
      <Cabin>{name}</Cabin>
      {/* 渲染最大容量 */}
      <div>最大容量{maxCapacity}人</div>
      {/* 渲染正常价格 */}
      <Price>{formatCurrency(regularPrice)}</Price>
      {/* 渲染折扣价格 */}
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <IconButton onClick={handleDuplicate}>
          <HiSquare2Stack />
        </IconButton>
        <Modal>
          {/* 渲染编辑按钮 */}
          <Modal.Open opens="edit">
            <IconButton>
              <HiPencil />
            </IconButton>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabintoEdit={cabin} />
          </Modal.Window>
          <Modal.Open opens="delete">
            {/* 渲染删除按钮，点击时执行删除操作 */}
            <IconButton disabled={isDeleting}>
              <HiTrash />
            </IconButton>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => mutate(cabinId)}
            />
          </Modal.Window>
        </Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>

            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>

            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}
