import { CSSProperties } from 'react';

// Fade animations
export const fadeInUp = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
  transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
});

export const fadeInDown = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
  transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
});

export const fadeInLeft = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
  transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
});

export const fadeInRight = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
  transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
});

export const fadeIn = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transition: `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
});

// Scale animations
export const scaleIn = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'scale(1)' : 'scale(0.8)',
  transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
});

export const scaleInUp = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
  transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
});

// Slide animations
export const slideInLeft = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
  transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
});

export const slideInRight = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
  transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
});

// Rotation animations
export const rotateIn = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'rotate(0deg) scale(1)' : 'rotate(-180deg) scale(0.5)',
  transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
});

// Flip animations
export const flipInX = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'perspective(1000px) rotateX(0deg)' : 'perspective(1000px) rotateX(-90deg)',
  transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
});

export const flipInY = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'perspective(1000px) rotateY(0deg)' : 'perspective(1000px) rotateY(-90deg)',
  transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
});

// Bounce animations
export const bounceIn = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'scale(1)' : 'scale(0.3)',
  transition: isVisible 
    ? `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}ms`
    : `all 0.3s ease-out ${delay}ms`,
});

export const bounceInUp = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.8)',
  transition: isVisible 
    ? `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}ms`
    : `all 0.3s ease-out ${delay}ms`,
});

// Elastic animations
export const elasticIn = (isVisible: boolean, delay: number = 0): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'scale(1)' : 'scale(0)',
  transition: `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}ms`,
});

// Parallax utility
export const parallax = (offsetY: number, speed: number = 1): CSSProperties => ({
  transform: `translateY(${offsetY * speed}px)`,
});

// Stagger animation utility
export const stagger = (index: number, baseDelay: number = 100): number => {
  return index * baseDelay;
};

// Loading animations for page entry
export const pageEntryFadeIn = (delay: number = 0): CSSProperties => ({
  animation: `pageEntryFadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms forwards`,
});

export const pageEntrySlideUp = (delay: number = 0): CSSProperties => ({
  animation: `pageEntrySlideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms forwards`,
});

// CSS keyframes (to be added to global styles)
export const keyframes = `
  @keyframes pageEntryFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes pageEntrySlideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pageEntrySlideDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pageEntryScaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes pageEntrySlideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes pageEntrySlideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
