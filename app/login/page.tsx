import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import LoginForm from "./LoginForm";
import { Suspense } from "react";

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm currentUser={currentUser} />
        </Suspense>
      </FormWrap>
    </Container>
  );
};
export default Login;
