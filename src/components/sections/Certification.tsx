
// src/components/Certification.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Certification } from '../data/constants';
import { X, Calendar, Award } from 'lucide-react';

type Props = {
  className?: string;
  certificates?: Certification[];
  /**
   * Section anchor id so navbar links like #Education work.
   * Defaults to "Education" to match your existing navbar.
   */
  anchorId?: string;
};

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.04 * i, duration: 0.5, ease: 'easeOut' }
  })
};

const Certifications: React.FC<Props> = ({
  className = '',
  certificates = [],
  anchorId = 'Education' // 👈 matches your #Education by default
}) => {
  const [selected, setSelected] = useState<Certification | null>(null);

  const open = useCallback((cert: Certification) => setSelected(cert), []);
  const close = useCallback(() => setSelected(null), []);

  // Build a usable image URL from relative paths
  const getFullImageUrl = useCallback((url: string) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('/')) return url;
    return `/certificates/${url}`;
  }, []);

  // Close lightbox if user navigates via navbar hash links
  useEffect(() => {
    const onHashChange = () => close();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [close]);

  // Allow closing modal with ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  const empty = !certificates || certificates.length === 0;

  return (
    <section
      id={anchorId}
      // scroll-mt-* helps align the target below a sticky navbar.
      className={`w-full text-white scroll-mt-24 md:scroll-mt-32 ${className}`}
      aria-label="Certifications"
    >
      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Certifications
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/60">
            Professional achievements and completed courses
          </p>
        </div>

        {/* Empty state */}
        {empty && (
          <div className="rounded-2xl border border-white/10 p-10 text-center">
            <div className="mx-auto w-10 h-10 mb-3 rounded-full bg-white/5 grid place-items-center">
              <Award className="w-5 h-5 text-white/70" />
            </div>
            <p className="text-white/90 font-medium">No certifications yet</p>
            <p className="text-white/60 text-sm mt-1">
              When you add them, they’ll appear here in a clean, simple grid.
            </p>
          </div>
        )}

        {/* Grid */}
        {!empty && (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, i) => {
              const img = getFullImageUrl(cert.imageUrl);
              return (
                <motion.article
                  key={`${cert.title}-${i}`}
                  className="group outline-none"
                  custom={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {/* Image frame */}
                  <button
                    type="button"
                    onClick={() => open(cert)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') open(cert);
                    }}
                    className="w-full text-left"
                    aria-label={`Open ${cert.title} certificate`}
                  >
                    <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-white/30 to-white/5">
                      <div className="relative rounded-[15px] overflow-hidden bg-black">
                        {/* Image */}
                        {img ? (
                          <img
                            src={img}
                            alt={`${cert.title} certificate`}
                            className="block w-full aspect-[16/11] object-cover will-change-transform transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                            draggable={false}
                          />
                        ) : (
                          <div className="w-full aspect-[16/11] bg-white/5" />
                        )}

                        {/* Subtle hover veil */}
                        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(120%_120%_at_50%_-20%,rgba(255,255,255,0.08),rgba(255,255,255,0)_50%)]" />
                      </div>
                    </div>
                  </button>

                  {/* Text area — white text outside the image */}
                  <div className="mt-4">
                    {cert.issuer && (
                      <div className="text-xs uppercase tracking-[0.14em] text-white/60">
                        {cert.issuer}
                      </div>
                    )}

                    <h3 className="mt-1 text-lg sm:text-xl font-semibold tracking-tight">
                      {cert.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-3 text-sm text-white/60">
                      {cert.date && (
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{cert.date}</span>
                        </span>
                      )}
                      {cert.certificateId && (
                        <>
                          <span className="text-white/20">•</span>
                          <span className="inline-flex items-center gap-1.5">
                            <Award className="w-4 h-4" />
                            <span className="truncate">
                              ID: {String(cert.certificateId).slice(0, 12)}…
                            </span>
                          </span>
                        </>
                      )}
                    </div>

                    {/* 🔕 External credential link removed */}
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Footer note */}
        {!empty && (
          <p className="mt-10 text-center text-xs text-white/40">
            All certificates are officially verified.
          </p>
        )}
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm"
            onClick={close}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                className="relative w-full max-w-5xl"
              >
                {/* Top bar (no external Open link) */}
                <div className="absolute -top-12 left-0 right-0 hidden sm:flex items-center justify-between text-white/80">
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-[0.14em] text-white/60">
                      {selected.issuer}
                    </div>
                    <div className="font-medium truncate">{selected.title}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={close}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Image */}
                <div className="rounded-2xl p-[1px] bg-gradient-to-b from-white/30 to-white/5">
                  <div className="rounded-[15px] overflow-hidden bg-black">
                    {selected.imageUrl ? (
                      <img
                        src={getFullImageUrl(selected.imageUrl)}
                        alt={`${selected.title} certificate`}
                        className="block w-full max-h-[80vh] object-contain"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full aspect-[16/11] bg-white/5" />
                    )}
                  </div>
                </div>

                {/* Details under image */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
                  {selected.date && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{selected.date}</span>
                    </span>
                  )}
                  {selected.certificateId && (
                    <>
                      <span className="text-white/20">•</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Award className="w-4 h-4" />
                        <span>Credential ID: {selected.certificateId}</span>
                      </span>
                    </>
                  )}
                </div>

                {/* Close button for mobile */}
                <button
                  onClick={close}
                  className="sm:hidden mt-4 w-full py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
