import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Send, ShieldCheck, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type DemoFormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  consent: boolean;
};

export function DemoModal({ open, onOpenChange }: DemoModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DemoFormValues>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: DemoFormValues) => {
    if (!data.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to the terms before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("demo_requests").insert([
      {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone || null,
        message: data.message || null,
        consent: data.consent,
      }
    ]);

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Request Submitted Successfully",
        description: "Our enterprise team will contact you shortly.",
      });
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) {
        form.reset();
      }
      onOpenChange(val);
    }}>
      <DialogContent 
        className="sm:max-w-[550px] p-0 max-h-[90vh] overflow-y-auto overflow-x-hidden border-white/10 rounded-2xl shadow-2xl bg-[#0A0A0A] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
        data-testid="dialog-demo"
      >
        
        {/* === CUSTOM HEADER AREA === */}
        <div className="relative bg-[#050505] px-6 py-6 sm:px-8 sm:py-8 border-b border-white/10 overflow-hidden shrink-0">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <DialogHeader className="relative z-10 text-left">
            <img src="/loader_img.png" alt="fic_logo" className="h-8 w-20" />
            <DialogTitle 
              className="text-2xl font-bold text-white tracking-tight"
            >
              Request an IT & Security Audit
            </DialogTitle>
            <DialogDescription 
              className="text-slate-400 mt-2 font-medium leading-relaxed text-sm"
            >
              Fill out the form below and our team will reach out to schedule a personalized walkthrough of Fast In Cloud's enterprise solutions.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* === FORM AREA === */}
        <div className="px-6 py-6 sm:px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 font-bold text-[10px] uppercase tracking-widest">Full Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          className="bg-[#050505] border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500 rounded-lg h-11 transition-all"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 font-bold text-[10px] uppercase tracking-widest">Company *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Acme Corp"
                          className="bg-[#050505] border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500 rounded-lg h-11 transition-all"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300 font-bold text-[10px] uppercase tracking-widest">Work Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        className="bg-[#050505] border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500 rounded-lg h-11 transition-all"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300 font-bold text-[10px] uppercase tracking-widest">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+91 90000 00000"
                        className="bg-[#050505] border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500 rounded-lg h-11 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300 font-bold text-[10px] uppercase tracking-widest">How can we help? (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your cloud, security, or infrastructure needs..."
                        className="bg-[#050505] border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500 rounded-lg resize-none p-4 transition-all"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              {/* --- CONSENT CHECKBOX --- */}
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white/5 p-4 rounded-xl border border-white/10">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5 border-white/20 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-slate-300 text-xs font-medium cursor-pointer">
                        I agree to Fast In Cloud's{" "}
                        <a href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
                          Privacy Policy
                        </a>{" "}
                        and consent to the processing of my personal data for the purpose of this audit request.
                      </FormLabel>
                      <FormMessage className="text-xs text-red-400" />
                    </div>
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg h-12 text-base font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting || !form.watch("consent")}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...</span>
                  ) : (
                    <>
                      Submit Request 
                      <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-center text-[11px] sm:text-xs text-slate-500 mt-4 flex items-center justify-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500"/> 100% Secure & Confidential. Fast response guaranteed.
                </p>
              </div>

            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}