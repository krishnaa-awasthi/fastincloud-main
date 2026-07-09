import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dsarSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  mobileNumber: z.string().min(10, "Mobile number is required"),
  companyName: z.string().optional(),
  requestType: z.string({ required_error: "Please select a request type" }),
  description: z.string().min(15, "Please provide context regarding your request"),
});

export default function DSARPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof dsarSchema>>({
    resolver: zodResolver(dsarSchema),
    defaultValues: { fullName: "", email: "", mobileNumber: "", companyName: "", description: "" },
  });

  const onSubmit = async (values: z.infer<typeof dsarSchema>) => {
    setIsSubmitting(true);
    
    const { error } = await supabase.from("dsar_requests").insert([
      {
        full_name: values.fullName,
        email: values.email,
        mobile_number: values.mobileNumber,
        company_name: values.companyName || null,
        request_type: values.requestType,
        description: values.description,
      }
    ]);

    setIsSubmitting(false);

    if (error) {
      toast({ variant: "destructive", title: "Submission Failed", description: error.message });
    } else {
      toast({ title: "Request Lodged", description: "Your data request has been registered for processing." });
      form.reset();
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] py-20 px-4 sm:px-6 lg:px-8 text-slate-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* --- LEFT COLUMN: Scrollable Policy Content --- */}
        <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
              Data Subject Rights & Privacy Request
            </h1>
            <p className="text-sm text-slate-400 mb-8 border-b border-white/10 pb-6">
              Your Privacy Rights[cite: 2]
            </p>
          </div>

          <div className="space-y-8 text-sm leading-relaxed text-slate-300">
            <p>
              At Fast in Cloud Digital Solutions LLP ("Fast in Cloud", "we", "our", or "us"), we respect your privacy and are committed to protecting your personal data[cite: 2]. We believe you should have transparency and control over how your information is collected, used, stored, and shared[cite: 2].
            </p>
            <p>
              This page explains your privacy rights and how you can submit a request regarding your personal data[cite: 2].
            </p>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">Your Rights</h3>
              <p className="mb-4">
                Depending on the applicable privacy laws, including the Digital Personal Data Protection Act, 2023 (India), you may have the following rights:[cite: 2]
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-white">Right to Access</p>
                  <p>You may request confirmation of whether we process your personal data and obtain information about the personal data we hold about you[cite: 2].</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Right to Correction</p>
                  <p>If your personal information is inaccurate, incomplete, or outdated, you may request that we correct or update it[cite: 2].</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Right to Erasure</p>
                  <p>You may request deletion of your personal data where permitted by applicable law or where the data is no longer required for the purpose for which it was collected[cite: 2].</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Right to Withdraw Consent</p>
                  <p>Where processing is based on your consent, you may withdraw your consent at any time[cite: 2]. Withdrawal of consent will not affect processing carried out before the withdrawal[cite: 2].</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Right to Restrict or Object</p>
                  <p>Where applicable, you may request restriction of processing or object to certain uses of your personal data[cite: 2].</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Right to Data Portability</p>
                  <p>Where applicable under law, you may request a copy of your personal information in a structured and commonly used electronic format[cite: 2].</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Right to Lodge a Complaint</p>
                  <p>If you believe your privacy rights have been violated, you may contact us using the details below[cite: 2]. If you remain dissatisfied, you may approach the appropriate regulatory authority as permitted by applicable law[cite: 2].</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">Submit a Privacy Request</h3>
              <p className="mb-2">You may submit any of the following requests:[cite: 2]</p>
              <ul className="list-disc pl-5 space-y-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <li>Access to your personal information[cite: 2]</li>
                <li>Correction of inaccurate information[cite: 2]</li>
                <li>Deletion of your personal data[cite: 2]</li>
                <li>Withdrawal of consent[cite: 2]</li>
                <li>Data portability request[cite: 2]</li>
                <li>Objection or restriction request[cite: 2]</li>
                <li>Cookie or marketing preference updates[cite: 2]</li>
                <li>Any other privacy-related inquiry[cite: 2]</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">Information Required</h3>
              <p className="mb-2">To help us process your request efficiently, please include:[cite: 2]</p>
              <ul className="list-disc pl-5 mb-4 space-y-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <li>Full Name[cite: 2]</li>
                <li>Email Address[cite: 2]</li>
                <li>Mobile Number[cite: 2]</li>
                <li>Company Name[cite: 2]</li>
                <li>Type of Request[cite: 2]</li>
                <li>Description of your request[cite: 2]</li>
                <li className="sm:col-span-2">Any additional information that helps us identify your records[cite: 2]</li>
              </ul>
              <p>For security reasons, we may request additional information to verify your identity before processing your request[cite: 2].</p>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">Response Time</h3>
              <p>
                We aim to acknowledge your request promptly and respond within the timelines required by applicable law[cite: 2]. Complex requests or requests requiring identity verification may take additional time[cite: 2].
              </p>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">Identity Verification</h3>
              <p>
                To protect your personal information, we may verify your identity before fulfilling your request[cite: 2]. If we cannot reasonably verify your identity, we may request additional documentation[cite: 2].
              </p>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">Important Information</h3>
              <p className="mb-4">
                Some requests may be limited where we are legally required to retain information, comply with contractual obligations, resolve disputes, detect fraud, enforce agreements, or meet regulatory requirements[cite: 2].
              </p>
              <p>
                Where a request cannot be fully fulfilled, we will explain the reason as permitted by applicable law[cite: 2].
              </p>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">Contact Our Privacy Team</h3>
              <p className="mb-2">For privacy-related requests or questions, please contact us:[cite: 2]</p>
              <ul className="space-y-1 mb-4">
                <li><strong>Fast in Cloud Digital Solutions LLP</strong>[cite: 2]</li>
                <li>Email: privacy@fastincloud.com[cite: 2]</li>
                <li>Website: www.fastincloud.com[cite: 2]</li>
              </ul>
              <p>
                If you have appointed a Data Protection Officer or Grievance Officer, you may also contact them using the contact details published on our website[cite: 2].
              </p>
            </section>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Sticky Form --- */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24 h-fit bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">DSAR Portal</h2>
              <p className="text-sm text-slate-400">
                Exercise your right to access, update, export, or erase your profile details securely.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Full Name *</FormLabel>
                    <FormControl><Input placeholder="Jane Doe" {...field} className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500" /></FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Email Address *</FormLabel>
                    <FormControl><Input type="email" placeholder="jane@example.com" {...field} className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500" /></FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField control={form.control} name="mobileNumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Mobile Number *</FormLabel>
                      <FormControl><Input placeholder="+91 9999999999" {...field} className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500" /></FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="companyName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Company Name</FormLabel>
                      <FormControl><Input placeholder="Optional" {...field} className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500" /></FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="requestType" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Type of Request *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-cyan-500">
                          <SelectValue placeholder="Select specific operation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#0f0f11] border-white/10 text-white">
                        <SelectItem value="access">Access / Review My Collected Data</SelectItem>
                        <SelectItem value="correction">Correct or Update Inaccurate Profiles</SelectItem>
                        <SelectItem value="deletion">Delete / Erase My Records Thoroughly</SelectItem>
                        <SelectItem value="portability">Portability (Export My Structured Files)</SelectItem>
                        <SelectItem value="withdrawal">Withdrawal of Consent</SelectItem>
                        <SelectItem value="restriction">Objection or Restriction of Processing</SelectItem>
                        <SelectItem value="other">Other Privacy Request</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )} />

                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Specific Scope Details *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please give our team details to locate your files easily..." 
                        className="min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500 resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )} />

                <Button type="submit" disabled={isSubmitting} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-6 text-md font-semibold transition-all">
                  {isSubmitting ? "Loading Request..." : "Submit Privacy Access Request"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

      </div>
    </main>
  );
}