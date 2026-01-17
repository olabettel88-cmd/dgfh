import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package, Clock, Phone, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { data: orders, isLoading } = useQuery({
    queryKey: [api.orders.list.path],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-center animate-pulse">
          <Sparkles className="w-8 h-8 text-gray-300 mx-auto mb-4" />
          <p className="font-display text-gray-400">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8 font-display">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-display text-gray-900 mb-4 tracking-tight">Order Dashboard</h1>
            <div className="w-12 h-px bg-gray-200 mx-auto mb-4"></div>
            <p className="text-gray-400 uppercase tracking-widest text-xs">Manage your selections</p>
          </motion.div>
        </header>

        <div className="grid gap-8">
          {orders?.map((order: any, index: number) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-none shadow-sm bg-white rounded-3xl">
                <CardHeader className="p-8 border-b border-gray-50 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900">
                      <Package className="w-7 h-7" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-display text-gray-900">Order #{order.id}</CardTitle>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 uppercase tracking-wider font-sans font-bold">
                        <Clock className="w-3 h-3" />
                        {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-display font-bold text-gray-900">{order.total}</p>
                    <span className="inline-block px-3 py-1 bg-gray-50 text-gray-400 rounded-full text-[10px] font-bold uppercase tracking-widest mt-2 border border-gray-100">
                      {order.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="p-8 border-r border-gray-50">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-8 font-sans">Customer Information</h3>
                      <div className="space-y-8">
                        <div className="flex items-start gap-4">
                          <MapPin className="w-5 h-5 text-gray-200 mt-1" />
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 font-sans">Delivery Address</p>
                            <p className="text-gray-600 text-sm leading-relaxed">{order.address}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Phone className="w-5 h-5 text-gray-200 mt-1" />
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 font-sans">Contact Phone</p>
                            <p className="text-gray-600 text-sm">{order.phone}</p>
                          </div>
                        </div>
                        {order.note && (
                          <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 font-sans">Special Note</p>
                            <p className="text-gray-500 italic text-sm leading-relaxed">"{order.note}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-8 bg-[#fafafa]/50">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-8 font-sans">Items Details</h3>
                      <div className="space-y-6">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-5 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                            <img src={item.image} className="w-20 h-20 rounded-xl object-cover" alt="" />
                            <div className="flex-1">
                              <p className="font-bold text-gray-900 font-display text-lg">{item.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] uppercase tracking-wider text-gray-300 font-sans font-bold">{item.category}</span>
                                {item.selectedColor && (
                                  <span className="px-2 py-0.5 bg-gray-50 rounded text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans border border-gray-100">
                                    {item.selectedColor}
                                  </span>
                                )}
                                {item.selectedSize && (
                                  <span className="px-2 py-0.5 bg-gray-50 rounded text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans border border-gray-100">
                                    Size {item.selectedSize}
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
            </motion.div>
          ))}
          {orders?.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-white rounded-[2rem] border-2 border-dashed border-gray-100"
            >
              <Package className="w-16 h-16 text-gray-100 mx-auto mb-6" />
              <p className="text-gray-300 font-display text-2xl uppercase tracking-widest">No orders yet</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
