'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import {
  contactFormSchema,
  ContactFormInputs,
  serviceOptions,
  budgetOptions,
  timelineOptions,
  contactMethodOptions,
  mapQueryToService,
} from '../../schemas/contact'
import { trackEvent, trackEventOnce } from '../../utils/analytics'
import { Button } from '../ui/Button'

interface SubmitResponse {
  success: boolean
  referenceId?: string
  status?: 'delivered' | 'accepted'
  emailDelivered?: boolean
  providerNote?: string
  message?: string
  error?: string
  fieldErrors?: Record<string, string>
}

function ContactFormInner() {
  const searchParams = useSearchParams()
  const reduced = useReducedMotion()

  const serviceQuery = searchParams ? searchParams.get('service') : null
  const projectQuery = searchParams ? searchParams.get('project') : null
  const initialService = mapQueryToService(serviceQuery) || 'product-demo-video'

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitResult, setSubmitResult] = useState<SubmitResponse | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      companyName: '',
      websiteUrl: '',
      region: '',
      service: initialService,
      budget: 'not-decided',
      timeline: 'flexible',
      contactMethod: 'email',
      projectOverview: projectQuery ? `Inquiring regarding project context: ${projectQuery}.\n\n` : '',
      honeypot: '',
      projectContext: projectQuery || '',
    },
  })

  const selectedService = watch('service')
  const selectedBudget = watch('budget')

  // Synchronize when query parameters change
  useEffect(() => {
    if (serviceQuery) {
      const mapped = mapQueryToService(serviceQuery)
      if (mapped) setValue('service', mapped)
    }
    if (projectQuery) {
      setValue('projectContext', projectQuery)
    }

    // Track form interaction start (once per session)
    trackEventOnce('contact_form_start_event', 'contact_form_started', {
      service_prefilled: serviceQuery || undefined,
      from_project: projectQuery || undefined,
    })
  }, [serviceQuery, projectQuery, setValue])

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: SubmitResponse = await response.json()

      if (!response.ok || !result.success) {
        // Track failed submission (zero PII)
        trackEvent('contact_form_failed', {
          service: data.service,
          error_stage: 'server_rejection',
        })

        if (result.fieldErrors) {
          // Map server-side validation errors back to form fields
          Object.entries(result.fieldErrors).forEach(([field, msg]) => {
            setError(field as keyof ContactFormInputs, { message: msg })
          })
          setSubmitError(result.error || 'Please correct the highlighted fields.')
        } else {
          setSubmitError(
            result.error ||
              'Your inquiry could not be delivered due to a server issue. Please try again or reach out directly at hello@g8g.media.',
          )
        }
        return
      }

      // Success — Track conversion (zero PII transmitted)
      trackEvent('contact_form_submitted', {
        service: data.service,
        has_company: !!data.companyName?.trim(),
        has_website: !!data.websiteUrl?.trim(),
        budget_range: data.budget,
        timeline_preference: data.timeline,
        reference_id: result.referenceId || 'N/A',
      })

      setSubmitResult(result)
    } catch (err) {
      console.error('[SUBMISSION ERROR]', err)
      trackEvent('contact_form_failed', {
        service: data.service,
        error_stage: 'network_error',
      })
      setSubmitError(
        'A network connection issue occurred while transmitting your inquiry. Please check your internet connection and retry.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setSubmitResult(null)
    setSubmitError(null)
    reset({
      fullName: '',
      email: '',
      companyName: '',
      websiteUrl: '',
      region: '',
      service: initialService,
      budget: 'not-decided',
      timeline: 'flexible',
      contactMethod: 'email',
      projectOverview: '',
      honeypot: '',
      projectContext: '',
    })
  }

  return (
    <div className="p-8 md:p-10 rounded-3xl bg-white border border-border-subtle shadow-card relative">
      {/* ── SUCCESS STATE ──────────────────────────────────── */}
      {submitResult && submitResult.success ? (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="py-10 flex flex-col items-center text-center gap-5"
          role="status"
          aria-live="polite"
        >
          <div className="h-16 w-16 rounded-full bg-accent/10 border-2 border-accent text-accent flex items-center justify-center">
            <CheckCircle2 size={32} />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs text-accent uppercase tracking-widest px-2.5 py-1 rounded bg-accent/10 border border-accent/20">
              TRANSMISSION RECORDED
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
              Your project inquiry has been received.
            </h2>
            <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
              Thank you for sharing your project with G8G Media. Your inquiry has been submitted successfully and routed to our creative production desk.
            </p>
          </div>

          {/* Reference ID Badge */}
          {submitResult.referenceId && (
            <div className="p-4 rounded-sm bg-bg-primary border border-border-subtle text-left text-xs w-full max-w-md my-2 space-y-2">
              <div className="flex items-center justify-between border-b border-border-subtle/80 pb-2">
                <span className="font-mono text-text-muted uppercase">Reference ID:</span>
                <span className="font-mono font-bold text-accent tracking-wider">
                  {submitResult.referenceId}
                </span>
              </div>
              <div className="flex items-center justify-between text-text-muted">
                <span>Delivery Status:</span>
                <span className="text-text-primary font-medium">
                  {submitResult.emailDelivered ? 'Delivered to Verified Inbox' : 'Accepted on Server'}
                </span>
              </div>
              <p className="text-[11px] text-text-muted/80 leading-normal pt-1">
                Please retain this reference code for future communications regarding your project.
              </p>
            </div>
          )}

          <div className="p-3 rounded-sm bg-bg-primary/50 border border-border-subtle/60 text-xs text-text-muted max-w-md">
            <span className="block font-medium text-text-primary mb-0.5">
              Preliminary Inquiry Notice
            </span>
            This transmission represents an exploratory project inquiry, not a guaranteed production booking or binding scope.
          </div>

          <Button onClick={handleReset} variant="secondary" size="md" className="gap-2 mt-4">
            <RotateCcw size={15} />
            <span>Submit Another Inquiry</span>
          </Button>
        </motion.div>
      ) : (
        /* ── INQUIRY FORM ───────────────────────────────────── */
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Project Inquiry Form"
          className="flex flex-col gap-6"
        >
          {/* Header */}
          <div className="border-b border-border-subtle pb-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>LET&apos;S TALK PRODUCTION</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-display text-2xl font-bold text-text-primary tracking-tight">
                Tell Us What You&apos;re Building.
              </h2>
              <span className="text-xs font-mono text-accent">
                * REQUIRED
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-text-muted leading-relaxed">
              Complete the brief below to give our creative directors the context needed to prepare your treatment and roadmap.
            </p>
          </div>

          {/* Global Error Banner */}
          {submitError && (
            <div
              role="alert"
              className="p-4 rounded-sm bg-red-950/40 border border-red-500/50 flex items-start gap-3 text-xs text-red-200"
            >
              <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Submission Unsuccessful</strong>
                <span>{submitError}</span>
              </div>
            </div>
          )}

          {/* Honeypot Bot Trap (Invisible to humans, catches spam scripts) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-honeypot">Leave this field blank</label>
            <input
              id="contact-honeypot"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register('honeypot')}
            />
          </div>

          {/* 1. Full Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2"
              >
                Full Name <span className="text-accent">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                disabled={isSubmitting}
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                placeholder="e.g. Alex Mercer"
                className={`w-full px-4 py-3 rounded-sm bg-bg-primary border text-text-primary placeholder:text-text-muted/40 text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-colors ${
                  errors.fullName ? 'border-red-500' : 'border-border-subtle focus:border-accent'
                }`}
                {...register('fullName')}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2"
              >
                Work Email <span className="text-accent">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                disabled={isSubmitting}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                placeholder="alex@company.com"
                className={`w-full px-4 py-3 rounded-sm bg-bg-primary border text-text-primary placeholder:text-text-muted/40 text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-border-subtle focus:border-accent'
                }`}
                {...register('email')}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* 2. Company Name & Website URL Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="companyName"
                className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2"
              >
                Company / Brand Name
              </label>
              <input
                id="companyName"
                type="text"
                autoComplete="organization"
                disabled={isSubmitting}
                placeholder="e.g. Acme Robotics / FinTech Labs"
                className="w-full px-4 py-3 rounded-sm bg-bg-primary border border-border-subtle text-text-primary placeholder:text-text-muted/40 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                {...register('companyName')}
              />
            </div>

            <div>
              <label
                htmlFor="websiteUrl"
                className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2"
              >
                Website URL
              </label>
              <input
                id="websiteUrl"
                type="url"
                autoComplete="url"
                disabled={isSubmitting}
                aria-invalid={!!errors.websiteUrl}
                aria-describedby={errors.websiteUrl ? 'websiteUrl-error' : undefined}
                placeholder="https://yourbrand.com"
                className={`w-full px-4 py-3 rounded-sm bg-bg-primary border text-text-primary placeholder:text-text-muted/40 text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-colors ${
                  errors.websiteUrl ? 'border-red-500' : 'border-border-subtle focus:border-accent'
                }`}
                {...register('websiteUrl')}
              />
              {errors.websiteUrl && (
                <p id="websiteUrl-error" className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.websiteUrl.message}
                </p>
              )}
            </div>
          </div>

          {/* 3. Service Required: Interactive Pills + Accessible select */}
          <div>
            <label
              htmlFor="service"
              className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2.5"
            >
              Select Production Service <span className="text-accent">*</span>
            </label>

            {/* Service Selector Pills */}
            <div className="flex flex-wrap gap-2 mb-3">
              {serviceOptions.slice(0, 5).map((opt) => {
                const isSelected = selectedService === opt.value
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setValue('service', opt.value, { shouldValidate: true })}
                    className={`font-display text-xs sm:text-[13px] font-semibold px-4 py-2 rounded-full transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                        : 'bg-bg-primary text-text-primary border-border-subtle hover:border-text-primary/40'
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>

            <select
              id="service"
              disabled={isSubmitting}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? 'service-error' : undefined}
              className={`w-full px-4 py-2.5 rounded-sm bg-bg-primary border text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-colors ${
                errors.service ? 'border-red-500' : 'border-border-subtle focus:border-accent'
              }`}
              {...register('service')}
            >
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-bg-secondary text-text-primary">
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.service && (
              <p id="service-error" className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.service.message}
              </p>
            )}
          </div>

          {/* 4. Budget Range & Expected Timeline Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="budget"
                className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2"
              >
                Budget Range
              </label>

              {/* Budget Quick Select Pills */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {[
                  { value: '10k-25k', label: '$10k – $25k' },
                  { value: '25k-50k', label: '$25k – $50k' },
                  { value: '50k-100k-plus', label: '$50k – $100k+' },
                ].map((b) => {
                  const isSelected = selectedBudget === b.value
                  return (
                    <button
                      type="button"
                      key={b.value}
                      onClick={() => setValue('budget', b.value as any, { shouldValidate: true })}
                      className={`text-[11px] font-mono font-medium px-2.5 py-1 rounded-md transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-bg-primary text-text-muted border-border-subtle hover:text-text-primary'
                      }`}
                    >
                      {b.label}
                    </button>
                  )
                })}
              </div>

              <select
                id="budget"
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 rounded-sm bg-bg-primary border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                {...register('budget')}
              >
                {budgetOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-bg-secondary text-text-primary">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="timeline"
                className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2"
              >
                Expected Project Timeline
              </label>
              <select
                id="timeline"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-sm bg-bg-primary border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                {...register('timeline')}
              >
                {timelineOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-bg-secondary text-text-primary">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. Region & Preferred Contact Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="region"
                className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2"
              >
                Country / Region
              </label>
              <input
                id="region"
                type="text"
                disabled={isSubmitting}
                placeholder="e.g. North America, Europe, Asia"
                className="w-full px-4 py-3 rounded-sm bg-bg-primary border border-border-subtle text-text-primary placeholder:text-text-muted/40 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                {...register('region')}
              />
            </div>

            <div>
              <label
                htmlFor="contactMethod"
                className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2"
              >
                Preferred Contact Method
              </label>
              <select
                id="contactMethod"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-sm bg-bg-primary border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                {...register('contactMethod')}
              >
                {contactMethodOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-bg-secondary text-text-primary">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 6. Project Overview */}
          <div>
            <label
              htmlFor="projectOverview"
              className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2"
            >
              Project Overview & Objectives <span className="text-accent">*</span>
            </label>
            <textarea
              id="projectOverview"
              rows={5}
              disabled={isSubmitting}
              aria-invalid={!!errors.projectOverview}
              aria-describedby={errors.projectOverview ? 'projectOverview-error' : undefined}
              placeholder="Tell us what you are launching, core product features, target audience, and any reference materials or visual preferences..."
              className={`w-full px-4 py-3 rounded-sm bg-bg-primary border text-text-primary placeholder:text-text-muted/40 text-sm focus:outline-none focus:ring-1 focus:ring-accent resize-y transition-colors ${
                errors.projectOverview ? 'border-red-500' : 'border-border-subtle focus:border-accent'
              }`}
              {...register('projectOverview')}
            />
            {errors.projectOverview && (
              <p id="projectOverview-error" className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.projectOverview.message}
              </p>
            )}
          </div>

          {/* Reassurance Microcopy */}
          <div className="flex items-center gap-2 text-xs text-text-muted pt-1 justify-center sm:justify-start">
            <Lock size={13} className="text-accent shrink-0" />
            <p className="font-mono text-[11px] sm:text-xs text-text-primary/90 font-medium">
              🔒 NDA guaranteed upon request. Response within 24 business hours.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full justify-center gap-2 mt-2 shadow-lg shadow-accent/15 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin" />
                <span>Sending Project Brief...</span>
              </span>
            ) : (
              <>
                <span>Send Project Brief</span>
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  )
}

export function ContactForm() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-text-muted font-mono text-sm">
          Loading inquiry form...
        </div>
      }
    >
      <ContactFormInner />
    </React.Suspense>
  )
}
