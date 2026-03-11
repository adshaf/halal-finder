"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import HomeNavbar from "@/components/home/HomeNavbar";
import HomeFooter from "@/components/home/HomeFooter";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactFormData) => {
    // Simulate async submission — wire up to real endpoint/email service later
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg overflow-x-hidden">
      <HomeNavbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-100 mb-4 leading-tight">
              Contact Us
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Have a question about a listing, want to add your restaurant, or
              just want to say hello? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left — contact info */}
            <aside className="lg:col-span-2 space-y-6">
              <div className="bg-dark-surface/60 border border-gold/15 rounded-2xl p-8 space-y-8">
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-100 mb-1">
                    HalalBites
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Sydney&apos;s trusted guide to halal dining — verified
                    listings, zero compromise.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <Mail size={15} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5 font-medium uppercase tracking-wider">
                        Email
                      </p>
                      <a
                        href="mailto:hello@halalbites.com.au"
                        className="text-slate-300 text-sm hover:text-gold transition-colors"
                      >
                        hello@halalbites.com.au
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <Phone size={15} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5 font-medium uppercase tracking-wider">
                        Phone
                      </p>
                      <a
                        href="tel:+61200000000"
                        className="text-slate-300 text-sm hover:text-gold transition-colors"
                      >
                        +61 2 0000 0000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <MapPin size={15} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5 font-medium uppercase tracking-wider">
                        Location
                      </p>
                      <p className="text-slate-300 text-sm">
                        Sydney, NSW, Australia
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response time notice */}
              <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
                <p className="text-primary text-xs font-bold uppercase tracking-wider mb-2">
                  Response Time
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We aim to respond to all enquiries within 1–2 business days.
                </p>
              </div>
            </aside>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <div className="bg-dark-surface/60 border border-gold/15 rounded-2xl p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-100 mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                      Thanks for reaching out. We&apos;ll get back to you within
                      1–2 business days.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Name
                        </label>
                        <input
                          {...register("name")}
                          type="text"
                          placeholder="Your full name"
                          className={`w-full h-11 bg-dark-bg/60 border rounded-lg px-4 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors focus:border-gold/40 ${
                            errors.name ? "border-red-500/60" : "border-gold/15"
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Email
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="you@example.com"
                          className={`w-full h-11 bg-dark-bg/60 border rounded-lg px-4 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors focus:border-gold/40 ${
                            errors.email
                              ? "border-red-500/60"
                              : "border-gold/15"
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Subject
                      </label>
                      <input
                        {...register("subject")}
                        type="text"
                        placeholder="How can we help?"
                        className={`w-full h-11 bg-dark-bg/60 border rounded-lg px-4 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors focus:border-gold/40 ${
                          errors.subject
                            ? "border-red-500/60"
                            : "border-gold/15"
                        }`}
                      />
                      {errors.subject && (
                        <p className="mt-1.5 text-xs text-red-400">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Message
                      </label>
                      <textarea
                        {...register("message")}
                        rows={6}
                        placeholder="Tell us more..."
                        className={`w-full bg-dark-bg/60 border rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors focus:border-gold/40 resize-none ${
                          errors.message
                            ? "border-red-500/60"
                            : "border-gold/15"
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-400">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gold text-dark-bg font-bold rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">Sending...</span>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <HomeFooter />
    </div>
  );
}
