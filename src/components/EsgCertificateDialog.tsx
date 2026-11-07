import { useRef, useEffect } from 'react';
import { X, Printer } from 'lucide-react';

interface EsgCertificateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  weeklyKg: number;
  meals: number;
  facilityName?: string;
}

export default function EsgCertificateDialog({
  isOpen,
  onClose,
  weeklyKg,
  meals,
  facilityName = 'Grand Promenade Culinary Alliance',
}: EsgCertificateDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const co2Kg = Math.round(weeklyKg * 2.5);
  const waterLiters = Math.round(weeklyKg * 500);
  const taxWriteOff = Math.round(weeklyKg * 6);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="m-auto w-[min(94vw,48rem)] rounded-3xl bg-forest-950 p-0 text-ivory-100 shadow-2xl backdrop:bg-forest-900/60 backdrop:backdrop-blur-md"
    >
      <div className="relative p-6 sm:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Certificate"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-ivory-300 hover:bg-forest-800"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Certificate Outer Container */}
        <div className="rounded-2xl border-2 border-harvest-400 bg-forest-900 p-6 sm:p-10 shadow-inner">
          <div className="rounded-xl border border-harvest-400/40 p-6 sm:p-8 text-center">
            <span className="text-4xl">🏆</span>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-harvest-300">
              OFFICIAL CERTIFICATE OF COMMENDATION
            </p>
            <h2 className="display mt-2 text-2xl sm:text-3xl text-ivory-100">
              Zero Food Waste & Community Stewardship
            </h2>
            <p className="mt-1 font-mono text-xs text-ivory-300/70">
              SERIAL ID: FB-ESG-2026-9812 &bull; VERIFIED RECOVERY PROTOCOL
            </p>

            <div className="my-6 border-y border-ivory-100/10 py-5 text-sm leading-relaxed text-ivory-200">
              <p>This certifies that the food surplus recovery program conducted by:</p>
              <h3 className="display mt-2 text-2xl font-bold text-harvest-300">{facilityName}</h3>
              <p className="mt-2 text-xs text-ivory-300">
                has been verified under the FoodBridge Hyperlocal Redistribution Protocol, redirecting commercial surplus to certified community kitchens.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 my-6">
              <div className="rounded-xl bg-forest-950/80 p-3.5 border border-forest-700">
                <span className="font-serif text-2xl text-ivory-100">{meals.toLocaleString()}</span>
                <span className="block text-[11px] text-ivory-300">Meals Rescued</span>
              </div>
              <div className="rounded-xl bg-forest-950/80 p-3.5 border border-forest-700">
                <span className="font-serif text-2xl text-emerald-400">{co2Kg.toLocaleString()} kg</span>
                <span className="block text-[11px] text-ivory-300">CO2e Diverted</span>
              </div>
              <div className="rounded-xl bg-forest-950/80 p-3.5 border border-forest-700">
                <span className="font-serif text-2xl text-harvest-300">{waterLiters.toLocaleString()} L</span>
                <span className="block text-[11px] text-ivory-300">Water Conserved</span>
              </div>
              <div className="rounded-xl bg-forest-950/80 p-3.5 border border-forest-700">
                <span className="font-serif text-2xl text-terracotta-300">${taxWriteOff.toLocaleString()}</span>
                <span className="block text-[11px] text-ivory-300">Tax Deduction</span>
              </div>
            </div>

            {/* Signatures */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-ivory-100/15 pt-5 sm:flex-row text-xs text-ivory-300">
              <div className="text-left">
                <div className="font-serif italic text-harvest-300 text-base">Dr. Elena Rostova</div>
                <span>Director of Verification, FoodBridge</span>
              </div>
              <div className="flex h-16 w-16 -rotate-12 items-center justify-center rounded-full border-2 border-dashed border-harvest-300 text-center font-bold text-[10px] text-harvest-300">
                VERIFIED<br/>★ 2026 ★
              </div>
              <div className="text-right">
                <div className="font-serif italic text-harvest-300 text-base">UN SDG Coalition</div>
                <span>Sustainable Partner #SDG2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-secondary !text-ivory-200 !border-ivory-300/30">
            Close
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-primary !bg-harvest-400 !text-forest-950 hover:!bg-harvest-300 flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save Certificate PDF</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
