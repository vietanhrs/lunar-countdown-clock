import { useState, useEffect } from 'react';

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

const TARGET_DATE = new Date('2025-02-13T18:00:00');

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
  <div className={`countdown-card rounded-xl flex flex-col items-center justify-center ${isLarge ? 'p-6 md:p-8' : 'p-4 md:p-6'}`}>
    <span 
      className={`font-display gold-text text-shadow-gold font-bold tabular-nums ${
        isLarge ? 'text-5xl md:text-7xl lg:text-8xl' : 'text-3xl md:text-4xl lg:text-5xl'
      }`}
    >
      {value.toString().padStart(2, '0')}
    </span>
    <span className={`text-muted-foreground uppercase tracking-widest mt-2 ${isLarge ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}>
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

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
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
