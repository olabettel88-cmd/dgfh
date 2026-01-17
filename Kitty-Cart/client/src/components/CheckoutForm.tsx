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
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Schema for the form fields only (excluding items/total which come from cart)
const checkoutFormSchema = z.object({
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(10, "Invalid phone number"),
  note: z.string().optional(),
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
      note: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-bold uppercase tracking-wider text-[10px]">Delivery Address</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Where should we send these? 🏠" 
                    className="min-h-[80px] rounded-2xl border-gray-100 focus:border-gray-900 focus:ring-gray-100 bg-[#fafafa]/50 font-display"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-[10px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-bold uppercase tracking-wider text-[10px]">Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="06 XX XX XX XX 📱" 
                    className="h-12 rounded-2xl border-gray-100 focus:border-gray-900 focus:ring-gray-100 bg-[#fafafa]/50 font-display"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-[10px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-bold uppercase tracking-wider text-[10px]">Special Note (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="A special message? ✨" 
                    className="min-h-[80px] rounded-2xl border-gray-100 focus:border-gray-900 focus:ring-gray-100 bg-[#fafafa]/50 font-display"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-[10px]" />
              </FormItem>
            )}
          />
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-14 text-sm font-bold uppercase tracking-widest rounded-2xl bg-gray-900 hover:bg-black shadow-xl shadow-gray-200 transition-all border-0"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Complete Selection
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
