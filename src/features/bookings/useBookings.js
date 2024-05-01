import {useQuery, useQueryClient} from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams();
 //filter
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === "all" ? null : {field: "status", value: filterValue, method: "eq"};
 //sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = {field, direction};
 //paging
  const page = !searchParams.get("page")
  ? 1
  : Number(searchParams.get("page"));
 
  //Query
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy , page],
    queryFn: () => getBookings({filter, sortBy , page}),
  });

  // 确保在这里正确处理可能的未定义值
  const bookings = data?.data || [];
  const count = data?.count || 0;

  //prefetching
  const pageCount = Math.ceil(count / PAGE_SIZE)
  if(page < pageCount){
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy , page +1],          //page+1代表預載下一個分頁的內容
    queryFn: () => getBookings({filter, sortBy , page : page+1}),
})}

if(page > 1){
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy , page - 1],          //page-1代表預載下一個分頁的內容
    queryFn: () => getBookings({filter, sortBy , page : page - 1}),
})}
  return { isLoading, error, bookings, count };
}
