export function BuildingBadge() {
  // Rotation aléatoire légère pour effet tampon
  const rotation = Math.random() * 12 - 6; // entre -6 et +6 degrés

  return (
    <div
      role="status"
      aria-label="Currently building"
      className="relative inline-flex items-center justify-center"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="relative w-[44px] h-[44px] rounded-full bg-blue-600/40 border-[2px] border-blue-600/50 flex items-center justify-center shadow-[0_2px_8px_rgba(37,99,235,0.15)]">
        {/* Effet texture/overlay pour le look "tampon" */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%)] mix-blend-overlay" aria-hidden="true" />
        
        {/* Texte */}
        <div className="relative z-10 text-center" aria-hidden="true">
          <div className="text-white/90 font-[800] text-[7px] uppercase tracking-[0.06em] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Building!
          </div>
        </div>
        {/* Texte accessible pour lecteurs d'écran */}
        <span className="sr-only">Building</span>
      </div>
    </div>
  );
}
