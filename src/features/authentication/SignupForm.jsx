// 引入 useForm Hook 從 react-hook-form，用於表單管理和驗證。
import { useForm } from "react-hook-form";
// 引入 UI 組件
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
// 引入用於註冊的自定義 Hook
import { useSignup } from "./useSignup";

// Email 格式的正則表達式
function SignupForm() {
  // 從 useSignup 中獲取 signup 函數和 isLoading 狀態
  const { signup, isLoading } = useSignup();
  // 使用 useForm 提供的方法管理表單
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  // 從 formState 中解構出 errors 對象，用於顯示錯誤信息
  const { errors } = formState;

  // 定義表單提交的處理函數
  function onSubmit({ fullName, email, password }) {
    // 執行註冊操作，並在操作完成後重置表單
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  // 表單組件的 JSX

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is require" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is require",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "請提供正確的email格式",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is require",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is require",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
