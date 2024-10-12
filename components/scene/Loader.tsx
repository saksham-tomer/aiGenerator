'use client';

import React, { useState, useEffect } from 'react';
import { Sword, Shield, Skull, Scroll } from 'lucide-react';

interface MedievalLoadingComponentProps {
  progress?: number;
}

const MedievalLoadingComponent = ({
  progress: externalprogress,
}: MedievalLoadingComponentProps) => {
  const [progress, setProgress] = useState(0);
  const [hoverIcon, setHoverIcon] = useState<string | null>(null);

  useEffect(() => {
    if (typeof externalprogress === 'number') {
      setProgress(externalprogress);
    } else {
      // Simulated loading process if no external progress is provided
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress >= 100 ? 100 : prevProgress + 1;
          return newProgress;
        });
      }, 10);
      return () => clearInterval(timer);
    }
  }, [externalprogress]);

  const iconClasses =
    'w-16 h-16 text-amber-400 transition-all duration-300 ease-in-out transform hover:scale-125 hover:text-amber-300';

  return (
    <div className="z-10 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-amber-100 font-serif overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-amber-500 rounded-full opacity-20 animate-float"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDuration: Math.random() * 10 + 10 + 's',
              animationDelay: Math.random() * 5 + 's',
            }}
          ></div>
        ))}
      </div>

      <div className="text-5xl mb-12 font-bold tracking-wider text-center animate-pulse">
        <span className="text-amber-500">Forging</span> thy epic quest...
      </div>

      <div className="relative w-96 h-8 bg-gray-700 rounded-full overflow-hidden border-2 border-amber-600 shadow-lg">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 via-red-600 to-amber-500 transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold mix-blend-difference">
          {`${progress}%`}
        </div>
      </div>

      <div className="flex justify-center items-center mt-12 space-x-12">
        <Sword
          className={`${iconClasses} animate-pulse`}
          onMouseEnter={() => setHoverIcon('sword')}
          onMouseLeave={() => setHoverIcon(null)}
        />
        <Shield
          className={`${iconClasses} animate-bounce`}
          onMouseEnter={() => setHoverIcon('shield')}
          onMouseLeave={() => setHoverIcon(null)}
        />
        <Skull
          className={`${iconClasses} animate-pulse`}
          onMouseEnter={() => setHoverIcon('skull')}
          onMouseLeave={() => setHoverIcon(null)}
        />
        <Scroll
          className={`${iconClasses} animate-bounce`}
          onMouseEnter={() => setHoverIcon('scroll')}
          onMouseLeave={() => setHoverIcon(null)}
        />
      </div>

      {hoverIcon && (
        <div className="mt-6 text-2xl text-amber-300 animate-fadeIn">
          {hoverIcon === 'sword' && 'Sharpen thy blade, adventurer!'}
          {hoverIcon === 'shield' && 'Stand firm against the darkness!'}
          {hoverIcon === 'skull' && 'Beware the perils that await...'}
          {hoverIcon === 'scroll' && 'Ancient wisdom guides thy path.'}
        </div>
      )}

      <svg className="w-96 h-96 mt-8 animate-spin-slow" viewBox="0 0 100 100">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Outer ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#B45309"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Viking-inspired rune */}
        <path d="M50 10 L60 30 L40 30 Z" fill="#B45309" filter="url(#glow)" />
        <path d="M50 90 L60 70 L40 70 Z" fill="#B45309" filter="url(#glow)" />
        <path d="M10 50 L30 60 L30 40 Z" fill="#B45309" filter="url(#glow)" />
        <path d="M90 50 L70 60 L70 40 Z" fill="#B45309" filter="url(#glow)" />

        {/* Intersecting lines */}
        <line
          x1="20"
          y1="20"
          x2="80"
          y2="80"
          stroke="#B45309"
          strokeWidth="2"
          filter="url(#glow)"
        />
        <line
          x1="20"
          y1="80"
          x2="80"
          y2="20"
          stroke="#B45309"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Central magical gem */}
        <circle
          cx="50"
          cy="50"
          r="10"
          fill="url(#gemGradient)"
          filter="url(#glow)"
        />

        <defs>
          <radialGradient
            id="gemGradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>
        </defs>
      </svg>

      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default MedievalLoadingComponent;
