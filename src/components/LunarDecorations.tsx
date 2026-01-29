const Lantern = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`text-4xl md:text-5xl animate-float ${className}`} style={style}>
    🏮
  </div>
);

const LunarDecorations = () => {
  return (
    <>
      {/* Corner decorations */}
      <div className="fixed top-4 left-4 opacity-80">
        <Lantern />
      </div>
      <div className="fixed top-4 right-4 opacity-80">
        <Lantern style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Background pattern overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial glow at top */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, hsl(43 96% 56% / 0.1) 0%, transparent 70%)',
        }}
      />
    </>
  );
};

export default LunarDecorations;
