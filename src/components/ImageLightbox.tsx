import { useCallback, useEffect, useRef, useState } from 'react';
import './ImageLightbox.css';

export default function ImageLightbox() {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const openRef = useRef(open);
  openRef.current = open;

  const handleClose = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = '';
  }, []);

  const handleOpen = useCallback((imageSrc: string, imageAlt: string) => {
    setSrc(imageSrc);
    setAlt(imageAlt);
    setOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => {
    const delegate = (e: MouseEvent) => {
      const target = e.target.closest<HTMLButtonElement>('.event-image-btn');
      if (target && target.dataset.imageSrc) {
        handleOpen(target.dataset.imageSrc, target.dataset.imageAlt ?? '');
      }
    };

    document.addEventListener('click', delegate);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openRef.current) handleClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('click', delegate);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [handleOpen, handleClose]);

  if (!open) return null;

  return (
    <div
      className="lightbox-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <button
        type="button"
        className="absolute top-6 right-6 p-2 rounded-full text-white bg-white/10 hover:bg-white/25 transition-colors cursor-pointer"
        aria-label="Fermer"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="max-w-[90vw] max-h-[90vh]">
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
