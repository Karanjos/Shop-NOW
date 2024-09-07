"use client";

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const router = useRouter();

  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <div className="">Order ID: {order.id}</div>
      <div className="">
        Total Amount:{" "}
        <span className="font-bold">{formatPrice(order.amount)}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="">Payment Status: </div>
        <div className="">
          {order.status === "pending" ? (
            <Status
              text="Pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "complete" ? (
            <Status
              text="Completed"
              icon={MdDone}
              bg="bg-teal-200"
              color="text-teal-800"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="">Delivery Status: </div>
        <div className="">
          {order.deliveryStatus === "pending" ? (
            <Status
              text="Pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="Dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-800"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="Delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-800"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="">Date : {moment(order.createdAt).fromNow()}</div>
      <div className="">
        <h2 className="font-semibold mt-4 mb-2">Product Ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start font-semibold">
            PRODUCT
          </div>
          <div className="justify-self-center font-semibold">PRICE</div>
          <div className="justify-self-center font-semibold">QTY</div>
          <div className="justify-self-end font-semibold">TOTAL</div>
        </div>
        {order.products.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
