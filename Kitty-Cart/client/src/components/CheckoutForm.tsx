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
import { useState, useRef, useEffect } from "react";

// Schema for the form fields only (excluding items/total which come from cart)
const checkoutFormSchema = z.object({
  address: z.string().min(5, "Address is required"),
  phone: z.string().length(9, "Exactly 9 digits required"),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormValues) => void;
  isPending: boolean;
}

export function CheckoutForm({ onSubmit, isPending }: CheckoutFormProps) {
  const [digits, setDigits] = useState<string[]>(Array(9).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      address: "",
      phone: "",
    },
  });

  useEffect(() => {
    form.setValue("phone", digits.join(""), { shouldValidate: true });
  }, [digits, form]);

  const handleDigitChange = (index: number, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    if (cleanValue === "") {
      const newDigits = [...digits];
      newDigits[index] = "";
      setDigits(newDigits);
      return;
    }
    
    const char = cleanValue.charAt(cleanValue.length - 1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    if (index < 8) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 10);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 9);
    const newDigits = [...digits];
    pastedData.split("").forEach((char, i) => {
      if (i < 9) newDigits[i] = char;
    });
    setDigits(newDigits);
    const lastIdx = Math.min(pastedData.length, 8);
    inputRefs.current[lastIdx]?.focus();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      className="min-h-[100px] rounded-[24px] border-none bg-gray-50/50 p-6 text-sm transition-all focus-visible:ring-1 focus-visible:ring-gray-200 focus-visible:bg-white resize-none font-display font-medium"
                      {...field} 
                    />
                    <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-gray-100 group-focus-within:ring-gray-200 pointer-events-none transition-all" />
                  </div>
                </FormControl>
                <FormMessage className="text-[10px] text-red-400 font-sans font-medium px-2" />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 font-sans">
              Phone Number
            </FormLabel>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-12 px-4 flex items-center justify-center bg-gray-50 rounded-[14px] text-sm font-bold text-gray-900 border border-gray-100">
                +212
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onPaste={handlePaste}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-8 h-12 md:w-9 md:h-12 bg-gray-50/50 rounded-[12px] border-none text-center font-bold text-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-200 transition-all outline-none text-sm border border-gray-100"
                  />
                ))}
              </div>
            </div>
            {form.formState.errors.phone && (
              <p className="text-[10px] text-red-400 font-sans font-medium px-2">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="pt-2"
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
