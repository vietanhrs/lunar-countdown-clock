const Lantern = ({ className = "", style, size = "lg" }: { className?: string; style?: React.CSSProperties; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-4xl md:text-5xl",
    lg: "text-5xl md:text-6xl"
  };
  return (
    <div className={`${sizeClasses[size]} animate-float ${className}`} style={style}>
      🏮
    </div>
  );
};

const FloatingEmoji = ({ emoji, className = "", style }: { emoji: string; className?: string; style?: React.CSSProperties }) => (
  <div className={`animate-float-slow ${className}`} style={style}>
    {emoji}
  </div>
);

const Sparkle = ({ style }: { style?: React.CSSProperties }) => (
  <div 
    className="absolute text-lunar-gold animate-sparkle pointer-events-none"
    style={style}
  >
    ✦
  </div>
);

const LunarDecorations = () => {
  return (
    <>
      {/* Corner lanterns */}
      <div className="fixed top-4 left-4 opacity-90">
        <Lantern />
      </div>
      <div className="fixed top-4 right-4 opacity-90">
        <Lantern style={{ animationDelay: '1s' }} />
      </div>
      <div className="fixed bottom-4 left-4 opacity-70">
        <Lantern size="md" style={{ animationDelay: '2s' }} />
      </div>
      <div className="fixed bottom-4 right-4 opacity-70">
        <Lantern size="md" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Floating festive emojis */}
      <FloatingEmoji emoji="🧧" className="fixed top-1/4 left-8 text-3xl md:text-4xl opacity-60" style={{ animationDelay: '0.5s' }} />
      <FloatingEmoji emoji="🎊" className="fixed top-1/3 right-12 text-2xl md:text-3xl opacity-50" style={{ animationDelay: '2s' }} />
      <FloatingEmoji emoji="🐉" className="fixed bottom-1/3 left-12 text-3xl md:text-4xl opacity-40" style={{ animationDelay: '1.2s' }} />
      <FloatingEmoji emoji="🎆" className="fixed bottom-1/4 right-8 text-2xl md:text-3xl opacity-50" style={{ animationDelay: '0.8s' }} />
      
      {/* Animated sparkles */}
      <Sparkle style={{ top: '15%', left: '20%', animationDelay: '0s' }} />
      <Sparkle style={{ top: '25%', right: '25%', animationDelay: '0.5s' }} />
      <Sparkle style={{ top: '60%', left: '15%', animationDelay: '1s' }} />
      <Sparkle style={{ top: '70%', right: '20%', animationDelay: '1.5s' }} />
      <Sparkle style={{ top: '40%', left: '30%', animationDelay: '2s' }} />
      <Sparkle style={{ top: '50%', right: '35%', animationDelay: '2.5s' }} />
      
      {/* Background pattern overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Enhanced radial glow at top */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 pointer-events-none animate-pulse-slow"
        style={{
          background: 'radial-gradient(ellipse at top, hsl(43 96% 56% / 0.15) 0%, transparent 60%)',
        }}
      />

      {/* Bottom glow */}
      <div 
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, hsl(0 72% 50% / 0.2) 0%, transparent 70%)',
        }}
      />
    </>
  );
};

export default LunarDecorations;
