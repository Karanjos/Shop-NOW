import prisma from "@/libs/prismadb";
import moment from "moment";

export default async function getGraphData() {
  try {
    //get the start and end dates for the data range (7 days ago to today)
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    // query the database for the sum of the order amounts grouped by date
    const result = await prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    // initialize an object to aggregate the data by day

    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    const currentDate = startDate.clone();

    // loop through the result and aggregate the data by day
    while (currentDate.isSameOrBefore(endDate)) {
      //format the date to match the format in the result (monday, tuesday, etc.)
      const day = currentDate.format("dddd");
      console.log("day <<< ", day, currentDate);

      aggregatedData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };
      currentDate.add(1, "day");
    }

    // loop through the result and add the total amount to the aggregated data, 

    result.forEach((entry) => {
      const day = moment(entry.createdAt).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregatedData[day].totalAmount += amount;
    });

    //convert the aggregated data to an array and sort it by date

    const fromattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    //return the formatted data
    return fromattedData;
  } catch (error: any) {
    throw new Error(error);
  }
}
