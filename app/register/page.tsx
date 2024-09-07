import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import RegisterForm from "./RegisterForm";
import { Suspense } from "react";

const Register = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <Suspense fallback={<div>Loading...</div>}>
          <RegisterForm currentUser={currentUser} />
        </Suspense>
      </FormWrap>
    </Container>
  );
};
export default Register;
