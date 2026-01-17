import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ScrollAnimateWrapperProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale';
  delay?: number;
  threshold?: number;
}

const animationClasses = {
  'fade-up': 'scroll-animate',
  'fade-left': 'scroll-animate-left',
  'fade-right': 'scroll-animate-right',
  'scale': 'scroll-animate-scale',
};

const ScrollAnimateWrapper = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
}: ScrollAnimateWrapperProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const delayClass = delay > 0 ? `delay-${delay}` : '';

  return (
    <div
      ref={ref}
      className={cn(
        animationClasses[animation],
        isVisible && 'is-visible',
        delayClass,
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollAnimateWrapper;
