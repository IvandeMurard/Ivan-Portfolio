/**
 * AudioSummary Component
 * Player audio avec transcription repliable (optionnel)
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp } from '@/config/case-study/case-study-animations';

interface AudioSummaryProps {
  audioUrl: string;
  duration: string;
  transcript?: string;
  author?: string;
  title?: string;
}

export const AudioSummary: React.FC<AudioSummaryProps> = ({
  audioUrl,
  duration,
  transcript,
  author,
  title = 'Audio Summary',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.section
      className="py-12"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              🎧 {title}
            </h3>
            {author && (
              <p className="text-sm text-gray-600">
                Narrated by {author}
              </p>
            )}
          </div>
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
            {duration}
          </span>
        </div>

        {/* Audio Player */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          {/* Custom Controls */}
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-all shadow-md hover:shadow-lg"
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Waveform Placeholder (decorative) */}
            <div className="flex-1 flex items-center gap-1 h-12">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-blue-200 rounded-full"
                  style={{
                    height: `${Math.random() * 80 + 20}%`,
                    opacity: isPlaying ? 0.8 : 0.4,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Browser Native Player (fallback) */}
          <div className="mt-4">
            <audio controls className="w-full" src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>

        {/* Transcript Toggle */}
        {transcript && (
          <div>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>{showTranscript ? 'Hide' : 'Show'} Transcript</span>
              <svg
                className={`w-4 h-4 transition-transform ${showTranscript ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Transcript Content */}
            <AnimatePresence>
              {showTranscript && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {transcript}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Info Note */}
        <p className="text-xs text-gray-500 mt-4">
          💡 Listen to a quick summary of this case study while you browse other content.
        </p>
      </div>
    </motion.section>
  );
};

