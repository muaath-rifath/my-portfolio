"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { submitContact } from "@/app/_actions/contact";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

function ContactFormInner() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    try {
      const token = await executeRecaptcha("contact_form");
      const result = await submitContact({ ...data, recaptchaToken: token });

      if (result.success) {
        toast({
          title: 'Form submitted successfully',
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: 'Error submitting form',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error submitting form',
        description: 'An error occurred while submitting the form.',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="relative flex flex-col lg:mt-0 border dark:border-gray-700 border-gray-200 lg:border-l-0 lg:rounded-l-none p-6 mb-10 lg:mb-0 rounded-xl lg:w-1/2 group/contact-item group-hover:border-[#006b42] dark:group-hover:border-[#8fffaa]/50 transition-all duration-300 dark:bg-black/40 bg-white/70 backdrop-blur-sm">
      {/* Circuit trace decorations */}
      <div className="absolute top-0 left-0 w-[40%] h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover/contact-item:opacity-100 transition-all duration-500"></div>
      <div className="absolute bottom-0 right-0 w-[40%] h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover/contact-item:opacity-100 transition-all duration-500"></div>
      <div className="absolute bottom-4 left-4 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover/contact-item:opacity-100 transition-all duration-500"></div>
      
      <h2 className="text-2xl font-mono dark:text-white text-[#006b42] font-bold relative mb-6 inline-block">
        Send a Message
        <span className="absolute left-0 bottom-0 w-16 h-[2px] dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-start">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full">
                <FormLabel className="font-mono dark:text-[#8fffaa] text-[#006b42] font-medium">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter Your Name" 
                    className="w-full border-gray-400 dark:border-gray-600 focus:border-[#006b42] dark:focus:border-[#8fffaa] transition-colors dark:bg-black/50 bg-white/70 dark:placeholder:text-gray-400 placeholder:text-gray-500" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full">
                <FormLabel className="font-mono dark:text-[#8fffaa] text-[#006b42] font-medium">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter Your Email" 
                    className="w-full border-gray-400 dark:border-gray-600 focus:border-[#006b42] dark:focus:border-[#8fffaa] transition-colors dark:bg-black/50 bg-white/70 dark:placeholder:text-gray-400 placeholder:text-gray-500" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full">
                <FormLabel className="font-mono dark:text-[#8fffaa] text-[#006b42] font-medium">Phone Number</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput 
                    placeholder="Enter a phone number" 
                    className="focus:border-[#006b42] dark:focus:border-[#8fffaa] transition-colors dark:bg-black/50 bg-white/70 dark:placeholder:text-gray-400 placeholder:text-gray-500" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full">
                <FormLabel className="font-mono dark:text-[#8fffaa] text-[#006b42] font-medium">Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter Your Message" 
                    className="w-full border-gray-400 dark:border-gray-600 focus:border-[#006b42] dark:focus:border-[#8fffaa] transition-colors min-h-[150px] dark:bg-black/50 bg-white/70 dark:placeholder:text-gray-400 placeholder:text-gray-500" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="relative group/btn overflow-hidden bg-gradient-to-r from-[#006b42]/90 to-[#006b42] dark:from-[#8fffaa]/70 dark:to-[#8fffaa]/90 text-white dark:text-[#111] hover:shadow-lg hover:shadow-[#006b42]/20 dark:hover:shadow-[#8fffaa]/20 transition-all duration-300"
          >
            <span className="relative z-10">Submit</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#00805e] to-[#008050] dark:from-[#a5ffbc] dark:to-[#95ffc4] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
            {/* Circuit trace accent */}
            <span className="absolute top-0 left-0 h-[1px] w-8 bg-white/40 dark:bg-black/40"></span>
            <span className="absolute bottom-0 right-0 h-[1px] w-8 bg-white/40 dark:bg-black/40"></span>
          </Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}

export default function ContactForm() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      <ContactFormInner />
    </GoogleReCaptchaProvider>
  );
}
