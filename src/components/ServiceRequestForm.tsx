import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ServiceRequestForm() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Netlify expects URL-encoded form data
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === 'string') params.append(key, value);
    });

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (response.ok) {
        setFormState('success');
        form.reset();
      } else {
        alert('Failed to send request. Please try again.');
        setFormState('idle');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      alert('An error occurred. Please try again.');
      setFormState('idle');
    }
  };

  if (formState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
      >
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-display font-bold text-green-900 mb-2">Request Received</h3>
        <p className="text-green-700 mb-6">
          Thank you for contacting 3Gen Electric. One of our master electricians will review your request and contact you shortly to confirm your appointment.
        </p>
        <button
          onClick={() => setFormState('idle')}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-slate-900 p-6 text-white">
        <h3 className="text-2xl font-display font-bold flex items-center gap-2">
          <Zap className="text-amber-400" />
          Request Service
        </h3>
        <p className="text-slate-400 mt-1">Fill out the form below for a free quote or service call.</p>
      </div>

      <form
        name="service-request"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="p-6 md:p-8 space-y-6"
      >
        {/* required for Netlify Forms */}
        <input type="hidden" name="form-name" value="service-request" />
        {/* honeypot */}
        <p className="hidden">
          <label>
            Don’t fill this out: <input name="bot-field" />
          </label>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
              placeholder="John"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-slate-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
              placeholder="(506) 123-4567"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="serviceType" className="text-sm font-medium text-slate-700">
            Service Needed
          </label>
          <select
            id="serviceType"
            name="serviceType"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-white"
            defaultValue="Residential Repair"
          >
            <option>Residential Repair</option>
            <option>Commercial Installation</option>
            <option>Panel Upgrade</option>
            <option>Lighting Installation</option>
            <option>EV Charger Installation</option>
            <option>Emergency Service</option>
            <option>Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-slate-700">
            Description of Issue
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            autoComplete="off"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
            placeholder="Please describe what you need help with..."
          ></textarea>
        </div>

        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            For life-threatening electrical emergencies (fire, sparking, smoke), please call 911 immediately. For urgent electrical repairs, call us directly at (506) 899-8818.
          </p>
        </div>

        <button
          type="submit"
          disabled={formState === 'submitting'}
          className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {formState === 'submitting' ? (
            <>
              <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
              Sending Request...
            </>
          ) : (
            <>
              Submit Request
              <Zap className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}