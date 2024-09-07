import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckOutClient from "./CheckOutClient";
import { Suspense } from "react";

const Checkout = () => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <Suspense fallback={<div>Loading...</div>}>
            <CheckOutClient />
          </Suspense>
        </FormWrap>
      </Container>
    </div>
  );
};
export default Checkout;
