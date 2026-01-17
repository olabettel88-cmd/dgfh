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
import { Loader2, Heart } from "lucide-react";
import { motion } from "framer-motion";

// Schema for the form fields only (excluding items/total which come from cart)
const checkoutFormSchema = z.object({
  address: z.string().min(5, "L'adresse est requise (min 5 caractères)"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
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
                <FormLabel className="text-pink-900 font-bold">Adresse de livraison</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Où dois-je envoyer ce cadeau ? 🏠" 
                    className="min-h-[80px] rounded-xl border-pink-200 focus:border-pink-400 focus:ring-pink-200 bg-white/80"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-pink-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-pink-900 font-bold">Numéro de téléphone</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="06 XX XX XX XX 📱" 
                    className="h-12 rounded-xl border-pink-200 focus:border-pink-400 focus:ring-pink-200 bg-white/80"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-pink-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-pink-900 font-bold">Petit mot (Optionnel)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Un message spécial ? 💌" 
                    className="min-h-[80px] rounded-xl border-pink-200 focus:border-pink-400 focus:ring-pink-200 bg-white/80"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-pink-500" />
              </FormItem>
            )}
          />
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 shadow-lg shadow-pink-300/50 border-0"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-5 w-5 fill-white animate-pulse" />
                Confirmer la commande
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
