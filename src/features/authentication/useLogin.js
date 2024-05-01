// 引入 React Query 的 useMutation 和 useQueryClient Hooks
import { useMutation, useQueryClient } from "@tanstack/react-query";
// 引入用於執行登入請求的 API 函數
import { login as loginApi } from "../../services/apiAuth";
// 引入用於路由導向的 Hook
import { useNavigate } from "react-router-dom";
// 引入用於顯示提示的第三方庫
import toast from "react-hot-toast";

export function useLogin(){
    // 獲取 React Query 客戶端實例
    const queryClient = useQueryClient()
    // 獲取導航函數
    const navigate = useNavigate()
    // 使用 useMutation 創建異步操作，這裡是登入操作
    const {mutate: login, isLoading} = useMutation({
        // 定義異步函數，這裡調用 loginApi 並傳遞用戶的 email 和 password
        mutationFn: ({email, password}) => loginApi({email, password}),
        // 成功回調：當登入成功時執行
        onSuccess: (user) => {
            // 在本地緩存中設置用戶數據
            queryClient.setQueryData(["user"], user.user)
            console.log(user) // 打印用戶信息
            // 導向到 dashboard 頁面，並替換當前的導航記錄
            navigate("/dashboard", {replace: true})
        },
        // 錯誤回調：當登入失敗時執行
        onError: (err) => {
            console.log("ERROR", err) // 打印錯誤信息
            // 顯示錯誤提示，通知用戶 email 或 password 錯誤
            toast.error("Provide email or password are incorrect")
        }
    })

    // 返回登入函數和加載狀態，供組件使用
    return {login, isLoading};
}
