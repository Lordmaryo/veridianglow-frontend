import React from "react";
import { Order } from "../types/OrderType";

const OrderSummaryCard = ({
  orders,
  title,
  Icon,
  color,
}: {
  title: string;
  orders: Order[];
  color: string;
  Icon: React.ElementType;
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-xl font-bold">{orders?.length}</p>
      </div>
      <Icon className={`${color} w-8 h-8`} />
    </div>
  );
};

export default OrderSummaryCard;
