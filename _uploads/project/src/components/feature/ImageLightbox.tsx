import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export interface LightboxImage {
  url: string;
  title?: string;
  is_cover?: boolean;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onNavigate?: (index: number) => void;
}

export default function ImageLightbox({ images, currentIndex, onClose, onPrev, onNext, onNavigate }: ImageLightboxProps) {
  const hasMultiple = images.length > 1;
  const currentImage = images[currentIndex];

  const goPrev = useCallback(() => {
    if (hasMultiple) onPrev();
  }, [hasMultiple, onPrev]);

  const goNext = useCallback(() => {
    if (hasMultiple) onNext();
  }, [hasMultiple, onNext]);

  const goTo = useCallback((index: number) => {
    if (onNavigate) onNavigate(index);
  }, [onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, goPrev, goNext]);

  if (!currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Top bar: close + counter */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
        {hasMultiple && (
          <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Main image area */}
      <div className="flex-1 flex items-center justify-center relative min-h-0 px-4 pb-2">
        {/* Previous arrow */}
        {hasMultiple && (
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Next arrow */}
        {hasMultiple && (
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Image */}
        <div
          className="w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage.url}
            alt={currentImage.title || `Project screenshot ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      </div>

      {/* Caption */}
      {currentImage.title && (
        <div className="flex justify-center flex-shrink-0 pb-1">
          <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm inline-flex items-center gap-1.5">
            {currentImage.is_cover && (
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            )}
            {currentImage.title}
          </div>
        </div>
      )}

      {/* Thumbnail strip */}
      {hasMultiple && (
        <div
          className="flex-shrink-0 px-4 pb-4 pt-2 flex justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2 overflow-x-auto max-w-full px-2 py-1 scrollbar-thin">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  i === currentIndex
                    ? 'border-white ring-2 ring-white/40 shadow-lg'
                    : 'border-white/20 hover:border-white/50 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="w-full h-full bg-[#1a1a2e] flex items-center justify-center">
                  <img
                    src={img.url}
                    alt={img.title || `Image ${i + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                {img.is_cover && (
                  <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-yellow-400 flex items-center justify-center">
                    <Star className="w-2 h-2 text-white fill-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}