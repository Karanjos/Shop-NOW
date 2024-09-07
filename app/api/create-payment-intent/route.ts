import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  return totalPrice;
};

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { items, payment_intent_id } = body;
  console.log("payment_intent_id", payment_intent_id);

  const total = calculateOrderAmount(items) * 100;

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    console.log(
      "payment_intent_id",
      payment_intent_id,
      "yes payment intent id"
    );

    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: total,
        }
      );

      try {
        const existing_order = await prisma.order.findFirst({
          where: {
            paymentIntentId: payment_intent_id,
          },
        });

        if (existing_order) {
          const update_order = await prisma.order.update({
            where: {
              paymentIntentId: payment_intent_id,
            },
            data: {
              amount: total,
              products: items,
            },
          });
          if (!existing_order) {
            return NextResponse.error();
          }

          return NextResponse.json({ paymentIntent: updated_intent });
        } else {
          console.log("Order not found");
          return NextResponse.json(
            { error: "Order not found" },
            { status: 404 }
          );
        }
      } catch (error) {
        console.error("Error updating order", error);
        return NextResponse.json(
          { error: "Error updating order" },
          { status: 500 }
        );
      }
    }
  } else {
    //create a new payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    //create new order
    orderData.paymentIntentId = paymentIntent.id;

    await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent });
  }
  return NextResponse.error();
}
