import CountdownTimer from '@/components/CountdownTimer';
import LunarDecorations from '@/components/LunarDecorations';

const Index = () => {
  return (
    <div className="min-h-screen lunar-gradient-bg flex flex-col items-center justify-center relative overflow-hidden py-12">
      <LunarDecorations />
      
      {/* Main Content */}
      <div className="relative z-10 text-center mb-12">
        {/* Dragon emoji header */}
        <div className="text-5xl md:text-6xl mb-6 animate-pulse-slow">
          🐉
        </div>
        
        {/* Title */}
        <h1 className="font-display gold-text text-shadow-gold text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide">
          Lunar New Year Countdown
        </h1>
        
        {/* Subtitle */}
        <p className="text-foreground/70 text-lg md:text-xl mb-2">
          Until work ends on
        </p>
        <p className="text-secondary font-semibold text-xl md:text-2xl">
          February 13th, 2025 at 6:00 PM
        </p>
      </div>

      {/* Countdown Component */}
      <CountdownTimer />

      {/* Footer decoration */}
      <div className="relative z-10 mt-12 text-center">
        <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl">
          <span>🧧</span>
          <span className="text-secondary/60 text-sm md:text-base font-medium tracking-widest uppercase">
            Year of the Snake
          </span>
          <span>🧧</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
