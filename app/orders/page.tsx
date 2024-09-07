import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import OrderClient from "./OrderClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";

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
        <OrderClient orders={orders} />
      </Container>
    </div>
  );
};
export default Orders;
