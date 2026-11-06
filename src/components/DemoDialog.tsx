import { useEffect, useId, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { Check, X } from 'lucide-react';
import type { DemoFlow } from '@/data/content';

interface DemoDialogProps {
  flow: DemoFlow;
  onClose: () => void;
}

export default function DemoDialog({ flow, onClose }: DemoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [submitted, setSubmitted] = useState(false);
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
    if (event.target === event.currentTarget) event.currentTarget.close();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClick={handleBackdropClick}
      className="m-auto w-[min(92vw,34rem)] rounded-3xl bg-ivory-50 p-0 text-ink-900 shadow-2xl shadow-forest-900/30 backdrop:bg-forest-900/50 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-7 sm:p-10">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close demo"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ivory-200"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {submitted ? (
          <div className="pr-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success-100 text-success-700">
              <Check className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 id={titleId} className="display mt-6 text-3xl text-forest-700">
              Demo complete. Nothing was sent.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-700">
              This page does not yet submit donations, volunteer sign-ups or partnership requests. When FoodBridge is
              live, this form will reach a real coordination team.
            </p>
            <button type="button" onClick={() => dialogRef.current?.close()} className="btn-primary mt-8">
              Back to the page
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="eyebrow">Demo only</p>
            <h2 id={titleId} className="display mt-3 pr-10 text-3xl text-forest-700">
              {flow.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-700">{flow.summary}</p>

            <div className="mt-8 space-y-5">
              {flow.fields.map((field) => (
                <DemoFieldInput key={field.name} flowId={flow.id} field={field} />
              ))}
            </div>

            <p className="mt-6 text-xs leading-relaxed text-ink-500">
              This is a practice run. Your answers stay in this window and are not stored or sent anywhere.
            </p>

            <button type="submit" className="btn-primary mt-6 w-full">
              {flow.cta}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}

interface DemoFieldInputProps {
  flowId: string;
  field: DemoFlow['fields'][number];
}

function DemoFieldInput({ flowId, field }: DemoFieldInputProps) {
  const inputId = `${flowId}-${field.name}`;
  const className =
    'mt-2 w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-500 transition-colors focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-600/20';

  return (
    <div>
      <label htmlFor={inputId} className="text-sm font-medium text-ink-800">
        {field.label}
        {field.required && <span className="text-terracotta-700"> *</span>}
      </label>
      {field.type === 'textarea' ? (
        <textarea
          id={inputId}
          name={field.name}
          placeholder={field.placeholder}
          required={field.required}
          rows={4}
          className={`${className} resize-y`}
        />
      ) : (
        <input
          id={inputId}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          min={field.type === 'number' ? 0 : undefined}
          className={className}
        />
      )}
    </div>
  );
}
