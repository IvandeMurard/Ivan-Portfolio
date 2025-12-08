/**
 * Hook for haptic feedback on mobile devices
 * Uses the Vibration API with graceful fallback
 */
export const useHapticFeedback = () => {
  const triggerHaptic = (pattern: 'light' | 'medium' | 'success' = 'light') => {
    // Check if Vibration API is supported (mobile only)
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      const patterns: Record<string, number | number[]> = {
        light: 10,           // Very light vibration (10ms)
        medium: 25,          // Medium vibration (25ms)
        success: [10, 50, 10], // Double tap for confirmation
      };
      
      try {
        navigator.vibrate(patterns[pattern]);
      } catch {
        // Silently fail if vibration not available
      }
    }
  };

  return { triggerHaptic };
};
