import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import AddProductForm from "./AddProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import { Suspense } from "react";

const AddProducts = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <NullData title="Oops!!! You are not authorized to view this page" />
    );
  }
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <Suspense fallback={<div>Loading...</div>}>
            <AddProductForm />
          </Suspense>
        </FormWrap>
      </Container>
    </div>
  );
};
export default AddProducts;
