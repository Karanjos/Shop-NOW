import Container from "@/app/components/Container";
import ManageProductsClient from "./ManageProductsClient";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const ManageProducts = async () => {
  const products = await getProducts({ category: null, searchTerm: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! You are not authorized to view this page" />;
  }

  return (
    <div className="py-8">
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
};
export default ManageProducts;
