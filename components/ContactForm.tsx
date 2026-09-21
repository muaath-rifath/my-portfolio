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
import Turnstile from "@/components/Turnstile";
import { useRef, useState } from "react";

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
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionRef = useRef<{ key: string; payload: string } | null>(null);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (isSubmitting) return;

    if (!turnstileToken) {
      toast({
        title: "Complete the security check",
        description: "Please wait for verification before submitting your message.",
        variant: "destructive",
      });
      return;
    }

    const payload = JSON.stringify(data);
    if (submissionRef.current?.payload !== payload) {
      submissionRef.current = { key: crypto.randomUUID(), payload };
    }

    setIsSubmitting(true);
    try {
      const result = await submitContact({
        ...data,
        turnstileToken,
        idempotencyKey: submissionRef.current.key,
      });

      if (result.success) {
        toast({
          title: 'Form submitted successfully',
          description: result.message,
        });
        form.reset();
        submissionRef.current = null;
      } else {
        toast({
          title: 'Error submitting form',
          description: result.message,
          variant: 'destructive',
        });
      }
      setTurnstileToken(null);
      setTurnstileKey((key) => key + 1);
    } catch (error) {
      toast({
        title: 'Error submitting form',
        description: 'An error occurred while submitting the form.',
        variant: 'destructive',
      });
      setTurnstileToken(null);
      setTurnstileKey((key) => key + 1);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="contact-panel contact-form relative flex flex-col p-6 lg:w-1/2">
      <h2 className="contact-panel-title text-2xl relative mb-6 inline-block">
        Send a Message
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-start">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full">
                <FormLabel className="contact-label font-medium">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Name"
                    className="contact-input w-full"
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
                <FormLabel className="contact-label font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Email"
                    className="contact-input w-full"
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
                <FormLabel className="contact-label font-medium">Phone Number</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    placeholder="Enter a phone number"
                    className="contact-phone"
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
                <FormLabel className="contact-label font-medium">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Your Message"
                    className="contact-input w-full min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Turnstile key={turnstileKey} onTokenChange={setTurnstileToken} />
          <Button
            type="submit"
            className="contact-submit"
            disabled={!turnstileToken || isSubmitting}
          >
            {isSubmitting ? "Sending…" : "Submit"}
          </Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}

export default function ContactForm() {
  return <ContactFormInner />;
}
