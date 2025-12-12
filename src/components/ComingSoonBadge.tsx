export function ComingSoonBadge() {
  // Rotation aléatoire légère pour effet tampon
  const rotation = Math.random() * 12 - 6; // entre -6 et +6 degrés

  return (
    <div
      role="status"
      aria-label="Coming soon"
      className="relative inline-flex items-center justify-center"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="relative w-[60px] h-[60px] rounded-full bg-red-600/40 border-[2px] border-red-600/50 flex items-center justify-center shadow-[0_2px_8px_rgba(220,38,38,0.15)]">
        {/* Effet texture/overlay pour le look "tampon" */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%)] mix-blend-overlay" aria-hidden="true" />
        
        {/* Texte */}
        <div className="relative z-10 text-center" aria-hidden="true">
          <div className="text-white/90 font-[800] text-[9px] uppercase tracking-[0.08em] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Coming
          </div>
          <div className="text-white/90 font-[800] text-[9px] uppercase tracking-[0.08em] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Soon!
          </div>
        </div>
        {/* Texte accessible pour lecteurs d'écran */}
        <span className="sr-only">Coming Soon</span>
      </div>
    </div>
  );
}
