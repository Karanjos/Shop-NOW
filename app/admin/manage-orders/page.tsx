import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import ManageOrdersClient from "./ManageOrdersClient";
import getOrders from "@/actions/getOrders";
import { Suspense } from "react";

const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! You are not authorized to view this page" />;
  }

  return (
    <div className="py-8">
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <ManageOrdersClient orders={orders} />
        </Suspense>
      </Container>
    </div>
  );
};
export default ManageOrders;
