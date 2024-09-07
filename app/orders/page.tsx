import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import OrderClient from "./OrderClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import { Suspense } from "react";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! You are not authorized to view this page" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No orders found" />;
  }

  return (
    <div className="py-8">
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <OrderClient orders={orders} />
        </Suspense>
      </Container>
    </div>
  );
};
export default Orders;
