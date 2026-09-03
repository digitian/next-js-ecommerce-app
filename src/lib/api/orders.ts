import { orders } from "./mockdata/orders";
import type { Order, OrderSummary } from "@/src/types/order.types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getUserOrders(userId: string): Promise<OrderSummary[]> {
  await delay(200 + Math.random() * 300); // simulate latency

  const userOrders = orders
    .filter((order) => order.userId === userId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return userOrders.map((order) => ({
    id: order.id,
    date: order.date,
    status: order.status,
    total: order.total,
    itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
  }));
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  await delay(200 + Math.random() * 300); // simulate latency

  const order = orders.find((o) => o.id === orderId);
  return order || null;
}
