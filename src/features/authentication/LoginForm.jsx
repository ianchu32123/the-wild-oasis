// 引入 React 的 useState 鉤子來管理組件的狀態。
import { useState } from "react";
// 引入 UI 組件。
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
// 引入自定義的登入 Hook。
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  // 使用 useState 鉤子來管理 email 和 password 的輸入狀態。
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 使用自定義 Hook useLogin 來處理登入邏輯。
  const { login, isLoading } = useLogin();

  // 表單提交的處理函數。
  function handleSubmit(e) {
    e.preventDefault(); // 防止表單默認提交行為。
    if (!email || !password) {
      // 如果 email 或 password 為空，則不進行處理。
      return;
    }
    login(
      { email, password },
      {
        onSettled: () => {
          // 登入操作結束後（無論成功或失敗），清空表單。
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  // 表單的 JSX 結構。
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading} // 當正在加載時禁用輸入。
        />
      </FormRow>
      <FormRow label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading} // 當正在加載時禁用輸入。
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
