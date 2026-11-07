import { useEffect, useId, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { Check, X, ShieldCheck, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import type { DemoFlow } from '@/data/content';
import { submitDemoFlow } from '@/lib/submissions';

interface DemoDialogProps {
  flow: DemoFlow;
  onClose: () => void;
}

export default function DemoDialog({ flow, onClose }: DemoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [trackingId, setTrackingId] = useState('');
  
  // Local state for fields so multi-step preserves user input
  const [formDataState, setFormDataState] = useState<Record<string, string>>({});

  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

    if (!dialog.open) {
      dialog.showModal();
    }

    dialog.addEventListener('close', handleClose);
    return () => {
      dialog.removeEventListener('close', handleClose);
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      event.currentTarget.close();
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormDataState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const formElement = event.currentTarget;
      const formData = new FormData(formElement);
      
      // Ensure all collected states are present in formData
      Object.entries(formDataState).forEach(([key, val]) => {
        if (!formData.has(key)) {
          formData.append(key, val);
        }
      });

      await submitDemoFlow(flow.id, formData);
      const randomTicket = `FB-${Math.floor(100000 + Math.random() * 900000)}`;
      setTrackingId(randomTicket);
      setSubmitted(true);
    } catch (error) {
      console.error('FoodBridge submission failed:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const FlowIcon = flow.icon;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClick={handleBackdropClick}
      className="m-auto w-[min(94vw,34rem)] rounded-3xl bg-ivory-50 p-0 text-ink-900 shadow-2xl shadow-forest-900/30 backdrop:bg-forest-900/50 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-7 sm:p-9">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ivory-200"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-inner">
              <Check className="h-7 w-7" aria-hidden="true" />
            </span>
            <span className="mt-4 inline-block rounded-full bg-forest-100 px-3 py-1 font-mono text-xs font-bold text-forest-800">
              DISPATCH TICKET: {trackingId}
            </span>
            <h2 id={titleId} className="display mt-3 text-3xl text-forest-800">
              Entry Successfully Logged
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              Your record has been securely committed to the FoodBridge coordination registry. Hyperlocal routing nodes are now calculating matching opportunities.
            </p>

            <div className="mt-6 rounded-2xl border border-forest-600/20 bg-forest-50 p-4 text-left text-xs text-forest-900 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-forest-700 font-medium">Safe Harbor Status:</span>
                <span className="font-semibold text-emerald-800">Active (Bill Emerson Act Protected)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-forest-700 font-medium">Estimated Match Latency:</span>
                <span className="font-semibold text-emerald-800">&lt; 14 minutes</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="btn-primary mt-6 w-full"
            >
              Return to Live Network
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            {/* Modal Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-700 text-ivory-100 shadow">
                <FlowIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-forest-700">
                  Network Portal &bull; Step {step} of 2
                </p>
                <h2 id={titleId} className="display text-2xl text-forest-900">
                  {flow.title}
                </h2>
              </div>
            </div>

            {/* Stepper bar */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className={`h-1.5 rounded-full ${step >= 1 ? 'bg-forest-700' : 'bg-ivory-300'}`} />
              <div className={`h-1.5 rounded-full ${step === 2 ? 'bg-forest-700' : 'bg-ivory-300'}`} />
            </div>

            {step === 1 ? (
              <div className="mt-6 space-y-4">
                <p className="text-xs text-ink-600 leading-relaxed">{flow.summary}</p>
                
                {flow.fields.slice(0, 2).map((field) => (
                  <div key={field.name}>
                    <label htmlFor={`${flow.id}-${field.name}`} className="block text-xs font-semibold uppercase tracking-wider text-ink-800">
                      {field.label}
                      {field.required && <span className="text-terracotta-700"> *</span>}
                    </label>
                    <input
                      id={`${flow.id}-${field.name}`}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formDataState[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-600/20"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-primary mt-6 w-full inline-flex items-center justify-center gap-2"
                >
                  <span>Continue to Details & Timing</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {flow.fields.slice(2).map((field) => (
                  <div key={field.name}>
                    <label htmlFor={`${flow.id}-${field.name}`} className="block text-xs font-semibold uppercase tracking-wider text-ink-800">
                      {field.label}
                      {field.required && <span className="text-terracotta-700"> *</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={`${flow.id}-${field.name}`}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={3}
                        value={formDataState[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-600/20 resize-none"
                      />
                    ) : (
                      <input
                        id={`${flow.id}-${field.name}`}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formDataState[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-600/20"
                      />
                    )}
                  </div>
                ))}

                {/* Hygiene & Safe Harbor confirmation card */}
                <div className="rounded-xl border border-forest-600/20 bg-forest-50/70 p-3 text-xs text-forest-900 flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-forest-700 shrink-0 mt-0.5" />
                  <span>
                    Protected under the <strong>Bill Emerson Good Samaritan Act</strong>. Real-time temperature control and hygiene verification protocols apply automatically.
                  </span>
                </div>

                {errorMessage && (
                  <p role="alert" className="text-xs text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200">
                    {errorMessage}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-xs font-semibold text-ink-800 hover:bg-ivory-100"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary flex-1 inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Sparkles className="h-4 w-4 text-harvest-300" />
                    <span>{submitting ? 'Transmitting to Supabase...' : flow.cta}</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </dialog>
  );
}