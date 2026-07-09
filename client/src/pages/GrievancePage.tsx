import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "../components/Navbar";
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

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  contactNumber: z.string().min(10, "Contact number is required"),
  companyName: z.string().optional(),
  description: z.string().min(20, "Please provide a detailed description"),
  preferredContact: z.string({ required_error: "Please select a preferred contact method" }),
});

export default function GrievancePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", email: "", contactNumber: "", companyName: "", description: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    const { error } = await supabase.from("privacy_grievances").insert([
      {
        full_name: values.fullName,
        email: values.email,
        contact_number: values.contactNumber,
        company_name: values.companyName || null,
        preferred_contact: values.preferredContact,
        description: values.description,
      }
    ]);

    setIsSubmitting(false);

    if (error) {
      toast({ variant: "destructive", title: "Submission Failed", description: error.message });
    } else {
      toast({ title: "Grievance Submitted", description: "Your complaint has been logged successfully." });
      form.reset();
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] py-20 px-4 sm:px-6 lg:px-8 text-slate-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* --- LEFT COLUMN: Scrollable Policy Content --- */}
        <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Grievance Redressal Policy
            </h1>
            <p className="text-sm text-slate-400 mb-8 border-b border-white/10 pb-6">
              Last Updated: July 5, 2026
            </p>
          </div>

          <div className="space-y-8 text-sm leading-relaxed text-slate-300">
            <p>
              At Fast in Cloud Digital Solutions LLP ("Fast in Cloud", "we", "our", or "us"), we are committed to delivering quality services and ensuring that our customers, partners, website visitors, and users have a transparent mechanism to raise concerns, complaints, or grievances.
            </p>
            <p>
              This Grievance Redressal Policy explains how you can submit a grievance and how we handle and resolve such requests.
            </p>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">1. Purpose</h3>
              <p className="mb-2">The objective of this policy is to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide an easy mechanism for submitting grievances.</li>
                <li>Ensure fair, transparent, and timely resolution.</li>
                <li>Improve customer satisfaction through continuous feedback.</li>
                <li>Comply with applicable laws and regulations, including the Digital Personal Data Protection Act, 2023, where applicable.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">2. What Can You Report?</h3>
              <p className="mb-2">You may submit a grievance regarding:</p>
              <ul className="list-disc pl-5 space-y-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <li>Our products or services</li>
                <li>Billing or payment-related issues</li>
                <li>Customer support experience</li>
                <li>Data privacy concerns</li>
                <li>Personal data processing</li>
                <li>Consent withdrawal requests</li>
                <li>Website-related issues</li>
                <li>Security concerns</li>
                <li>Service quality</li>
                <li className="sm:col-span-2">Any other legitimate concern relating to Fast in Cloud's services</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">3. How to Submit a Grievance</h3>
              <p className="mb-2">You may submit your grievance through any of the following channels:</p>
              <ul className="space-y-1 mb-4">
                <li><strong>Email:</strong> grievance@fastincloud.com</li>
                <li><strong>Website:</strong> https://www.fastincloud.com/contact</li>
              </ul>
              <p className="mb-2">When submitting your grievance, please include:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Your full name</li>
                <li>Email address</li>
                <li>Contact number</li>
                <li>Company name</li>
                <li>Description of the grievance</li>
                <li>Relevant documents or screenshots</li>
                <li>Preferred method of communication</li>
              </ul>
              <p>Providing complete information helps us investigate and resolve your concern more efficiently.</p>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">4. Grievance Resolution Process</h3>
              <p className="mb-4">Once we receive your grievance:</p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-white">Step 1 – Acknowledgement</p>
                  <p>We will acknowledge receipt of your grievance within 2 business days.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Step 2 – Review</p>
                  <p>Our team will review the matter and, if necessary, contact you for additional information.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Step 3 – Investigation</p>
                  <p>The grievance will be investigated by the appropriate internal team.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Step 4 – Resolution</p>
                  <p>We aim to resolve most grievances within 15 business days from the date of receiving all necessary information.</p>
                </div>
              </div>
              <p className="mt-4">If additional time is required due to the complexity of the matter, we will keep you informed of the expected timeline.</p>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">5. Privacy of Complaints</h3>
              <p className="mb-2">All grievances are handled confidentially. Information shared during the grievance process will only be used for:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Investigating the complaint</li>
                <li>Communicating with the complainant</li>
                <li>Legal or regulatory compliance</li>
                <li>Improving our products and services</li>
              </ul>
              <p>Your information will be processed in accordance with our Privacy Policy.</p>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">6. Data Privacy Grievances</h3>
              <p className="mb-2">If your grievance relates to the processing of your personal data, including:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Access to your personal data</li>
                <li>Correction of inaccurate data</li>
                <li>Erasure of personal data</li>
                <li>Withdrawal of consent</li>
                <li>Data security concerns</li>
                <li>Exercise of your rights under applicable privacy laws</li>
              </ul>
              <p>please mention <strong>"Data Privacy Grievance"</strong> in the subject line of your email for faster processing.</p>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">7. Grievance Officer</h3>
              <p className="mb-4">In accordance with applicable laws, grievances may be addressed to our designated Grievance Officer.</p>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-4">
                <p className="font-bold text-white mb-2">Grievance Officer</p>
                <ul className="space-y-1">
                  <li>Priyanka Verma</li>
                  <li>Fast in Cloud Digital Solutions LLP</li>
                  <li>Email: grievance@fastincloud.com</li>
                </ul>
              </div>

              <p className="font-semibold text-white mb-2">Response Time:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Acknowledgement: Within 2 business days</li>
                <li>Resolution: Normally within 15 business days or as applicable</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">8. Escalation</h3>
              <p className="mb-2">If you are not satisfied with the resolution provided, you may request a review by replying to the grievance email with additional information or justification.</p>
              <p>We will conduct a further review and communicate our final decision within a reasonable timeframe.</p>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">9. Abuse of Grievance Mechanism</h3>
              <p className="mb-2">Fast in Cloud reserves the right to reject or close grievances that are:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fraudulent</li>
                <li>Malicious</li>
                <li>Repetitive without new information</li>
                <li>Abusive or threatening</li>
                <li>Outside the scope of our services</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg text-white font-semibold mb-3">10. Policy Updates</h3>
              <p className="mb-6">We may update this Grievance Redressal Policy from time to time to reflect changes in our business practices or legal obligations. The latest version will always be available on our website.</p>
              
              <div className="border-t border-white/10 pt-6">
                <p className="mb-2">For any questions regarding this Grievance Redressal Policy, please contact us at:</p>
                <ul className="space-y-1">
                  <li><strong>Fast in Cloud Digital Solutions LLP</strong></li>
                  <li>Email: support@fastincloud.com</li>
                  <li>Website: https://www.fastincloud.com</li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Sticky Form --- */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24 h-fit bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Submit a Grievance</h2>
              <p className="text-sm text-slate-400">
                Fill out the form below to lodge a formal grievance. We will acknowledge your request within 2 business days.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Full Name *</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500" /></FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Email Address *</FormLabel>
                    <FormControl><Input type="email" placeholder="john@company.com" {...field} className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500" /></FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField control={form.control} name="contactNumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Contact Number *</FormLabel>
                      <FormControl><Input type="tel" placeholder="+91 9999999999" {...field} className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500" /></FormControl>
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

                <FormField control={form.control} name="preferredContact" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Preferred Contact Method *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-cyan-500">
                          <SelectValue placeholder="Select a method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#0f0f11] border-white/10 text-white">
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )} />

                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Grievance Details *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe your concern in detail..." 
                        className="min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500 resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )} />

                <Button type="submit" disabled={isSubmitting} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-6 text-md font-semibold transition-all">
                  {isSubmitting ? "Submitting..." : "Submit Grievance"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

      </div>
    </main>
  );
}