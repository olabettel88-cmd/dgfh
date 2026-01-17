import {
  orders,
  type InsertOrder,
  type Order
} from "@shared/schema";

export interface IStorage {
  createOrder(order: InsertOrder): Promise<Order>;
  getOrders(): Promise<Order[]>;
}

export class MemoryStorage implements IStorage {
  private orders: Order[] = [];
  private currentId: number = 1;

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const order: Order = {
      ...insertOrder,
      id: this.currentId++,
      createdAt: new Date(),
    };
    this.orders.push(order);
    return order;
  }

  async getOrders(): Promise<Order[]> {
    return this.orders.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
}

export const storage = new MemoryStorage();
