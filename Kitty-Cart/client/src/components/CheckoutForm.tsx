import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

// Schema for the form fields only (excluding items/total which come from cart)
const checkoutFormSchema = z.object({
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(9, "Phone number too short"),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormValues) => void;
  isPending: boolean;
}

export function CheckoutForm({ onSubmit, isPending }: CheckoutFormProps) {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      address: "",
      phone: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col justify-between py-2">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 font-sans">
                  Delivery Address
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Textarea 
                      placeholder="Street, City, Zip..." 
                      className="min-h-[80px] rounded-[24px] border-none bg-gray-50/50 p-6 text-sm transition-all focus-visible:ring-1 focus-visible:ring-gray-200 focus-visible:bg-white resize-none font-display font-medium"
                      {...field} 
                    />
                    <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-gray-100 group-focus-within:ring-gray-200 pointer-events-none transition-all" />
                  </div>
                </FormControl>
                <FormMessage className="text-[10px] text-red-400 font-sans font-medium px-2" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 font-sans">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <div className="h-12 px-4 flex items-center justify-center bg-gray-50 rounded-[20px] text-xs font-bold text-gray-900 border border-gray-100 shadow-sm">
                      +212
                    </div>
                    <div className="relative group flex-1">
                      <Input 
                        type="tel"
                        inputMode="tel"
                        placeholder="6 00 00 00 00"
                        className="h-12 rounded-[20px] border-none bg-gray-50/50 px-6 text-sm transition-all focus-visible:ring-1 focus-visible:ring-gray-200 focus-visible:bg-white font-sans font-bold tracking-widest"
                        {...field}
                      />
                      <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-gray-100 group-focus-within:ring-gray-200 pointer-events-none transition-all" />
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-[10px] text-red-400 font-sans font-medium px-2" />
              </FormItem>
            )}
          />
        </div>

        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6"
        >
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-14 md:h-16 text-xs md:text-sm font-bold uppercase tracking-[0.25em] rounded-xl md:rounded-[24px] bg-gray-900 hover:bg-black text-white shadow-2xl shadow-gray-200 transition-all border-0 relative overflow-hidden group flex items-center justify-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin opacity-50" />
                <span>Processing</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 md:w-5 h-5 group-hover:animate-wiggle" />
                <span>Confirm</span>
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
