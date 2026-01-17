import { useMutation } from "@tanstack/react-query";
import { api, type InsertOrder } from "@shared/routes";

// POST /api/orders
export function useCreateOrder() {
  return useMutation({
    mutationFn: async (data: InsertOrder) => {
      const res = await fetch(api.orders.create.path, {
        method: api.orders.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          // Try to parse validation error
          try {
            const error = await res.json();
            throw new Error(error.message || "Please check your information");
          } catch {
            throw new Error("Validation failed");
          }
        }
        throw new Error('Failed to create order');
      }
      
      return api.orders.create.responses[201].parse(await res.json());
    },
  });
}
