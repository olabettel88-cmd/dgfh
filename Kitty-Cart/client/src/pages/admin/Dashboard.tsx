import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package, Clock, Phone, MapPin } from "lucide-react";

export default function AdminDashboard() {
  const { data: orders, isLoading } = useQuery({
    queryKey: [api.orders.list.path],
  });

  if (isLoading) {
    return <div className="p-8 text-center font-display">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-display text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-500">View and manage all received selections.</p>
        </header>

        <div className="grid gap-6">
          {orders?.map((order: any) => (
            <Card key={order.id} className="overflow-hidden border-none shadow-sm">
              <CardHeader className="bg-white border-b border-gray-100 flex flex-row items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-display">Order #{order.id}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                      <Clock className="w-4 h-4" />
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-display font-bold text-gray-900">{order.total}</p>
                  <span className="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-wider mt-2">
                    {order.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="p-8 border-r border-gray-100 bg-white">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Customer Info</h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Address</p>
                          <p className="text-gray-900">{order.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Phone</p>
                          <p className="text-gray-900">{order.phone}</p>
                        </div>
                      </div>
                      {order.note && (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <p className="text-xs font-bold text-gray-400 uppercase mb-2">Note</p>
                          <p className="text-gray-600 italic text-sm">"{order.note}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-8 bg-gray-50/50">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Items Selected</h3>
                    <div className="space-y-4">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                          <img src={item.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
                          <div className="flex-1">
                            <p className="font-bold text-gray-900">{item.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] uppercase tracking-wider text-gray-400">{item.category}</span>
                              {item.selectedColor && (
                                <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-600">
                                  {item.selectedColor}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="font-display font-bold text-gray-900">{item.price.toFixed(2)} DH</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {orders?.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-display text-xl">No orders received yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
