import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

const TARGET_DATE = new Date('2026-02-13T18:00:00');
const START_DATE = new Date('2026-01-29T00:00:00'); // When the countdown started

const calculateTimeLeft = (): TimeLeft => {
  const now = new Date();
  const difference = TARGET_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
    };
  }

  const totalSeconds = Math.floor(difference / 1000);
  const totalMinutes = Math.floor(difference / (1000 * 60));
  const totalHours = Math.floor(difference / (1000 * 60 * 60));
  const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));

  return {
    days: totalDays,
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
  };
};

const CountdownUnit = ({ value, label, isLarge = false }: { value: number; label: string; isLarge?: boolean }) => (
  <div className={`countdown-card rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group hover:scale-105 transition-transform duration-300 ${isLarge ? 'p-8 md:p-12' : 'p-4 md:p-6'}`}>
    {/* Animated glow effect */}
    <div className="absolute inset-0 bg-gradient-to-t from-lunar-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Sparkle decorations */}
    <div className="absolute top-2 right-2 text-lg animate-pulse-slow">✨</div>
    <div className="absolute bottom-2 left-2 text-sm animate-pulse-slow" style={{ animationDelay: '1s' }}>✨</div>
    
    <span 
      className={`font-display gold-text text-shadow-gold font-bold tabular-nums relative z-10 animate-number-glow ${
        isLarge ? 'text-6xl md:text-8xl lg:text-9xl' : 'text-3xl md:text-4xl lg:text-5xl'
      }`}
    >
      {value.toString().padStart(2, '0')}
    </span>
    <span className={`text-lunar-gold-pale uppercase tracking-[0.2em] mt-3 font-medium relative z-10 ${isLarge ? 'text-sm md:text-lg' : 'text-xs md:text-sm'}`}>
      {label}
    </span>
  </div>
);

const SubCountdown = ({ value, label, unit }: { value: number; label: string; unit: string }) => (
  <div className="countdown-card rounded-lg p-4 md:p-5 text-center">
    <div className="gold-text font-display text-2xl md:text-3xl font-bold tabular-nums">
      {value.toLocaleString()}
    </div>
    <div className="text-muted-foreground text-xs md:text-sm mt-1 uppercase tracking-wider">
      {label}
    </div>
    <div className="text-foreground/60 text-xs mt-0.5">
      {unit}
    </div>
  </div>
);

const calculateProgress = (): number => {
  const now = new Date();
  const totalDuration = TARGET_DATE.getTime() - START_DATE.getTime();
  const elapsed = now.getTime() - START_DATE.getTime();
  
  if (elapsed <= 0) return 0;
  if (elapsed >= totalDuration) return 100;
  
  return (elapsed / totalDuration) * 100;
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [progress, setProgress] = useState<number>(calculateProgress());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      setProgress(calculateProgress());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isComplete = timeLeft.totalSeconds <= 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {isComplete ? (
        <div className="text-center animate-float">
          <h2 className="font-display gold-text text-shadow-gold text-4xl md:text-6xl font-bold mb-4">
            🎉 Happy Lunar New Year! 🎉
          </h2>
          <p className="text-foreground/80 text-xl md:text-2xl">
            Work time has ended. Enjoy your holiday!
          </p>
        </div>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="mb-10 px-2">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lunar-gold-pale text-sm uppercase tracking-widest font-medium">Progress</span>
              <span className="gold-text font-display text-lg font-bold">{progress.toFixed(2)}%</span>
            </div>
            <div className="relative">
              <Progress 
                value={progress} 
                className="h-4 bg-lunar-red-dark/50 border border-border"
              />
              {/* Glow effect overlay */}
              <div 
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-lunar-gold/0 via-lunar-gold/30 to-lunar-gold/0 animate-pulse-slow pointer-events-none"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Jan 29, 2026</span>
              <span>Feb 13, 2026</span>
            </div>
          </div>

          {/* Main Countdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            <CountdownUnit value={timeLeft.days} label="Days" isLarge />
            <CountdownUnit value={timeLeft.hours} label="Hours" isLarge />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" isLarge />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" isLarge />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
            <span className="text-secondary text-2xl">✦</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
          </div>

          {/* Sub Countdowns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <SubCountdown 
              value={timeLeft.totalDays} 
              label="Total Days" 
              unit="remaining" 
            />
            <SubCountdown 
              value={timeLeft.totalHours} 
              label="Total Hours" 
              unit="remaining" 
            />
            <SubCountdown 
              value={timeLeft.totalMinutes} 
              label="Total Minutes" 
              unit="remaining" 
            />
            <SubCountdown 
              value={timeLeft.totalSeconds} 
              label="Total Seconds" 
              unit="remaining" 
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
