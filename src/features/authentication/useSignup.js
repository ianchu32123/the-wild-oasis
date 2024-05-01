import {useMutation} from "@tanstack/react-query"
import { signup as signupApi } from "../../services/apiAuth"
import {toast} from "react-hot-toast"

export function useSignup (){
    const {mutate:signup,isLoading} = useMutation({
        mutationFn:signupApi,
        onSuccess:() => {
            toast.success("帳號成功註冊")
        }
    })

    return{signup,isLoading}
}