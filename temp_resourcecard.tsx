import { motion, AnimatePresence } from 'motion/react';

export interface Resource {
  id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  whyItMatters: string;
  tags: string[];
  relatedResources?: string[];
}

interface ResourceCardProps {
  resource: Resource;
  onClick: () => void;
  isExpanded?: boolean;
}

export function ResourceCard({ resource, onClick, isExpanded = false }: ResourceCardProps) {
  // Get first sentence of why it matters
  const firstSentence = resource.whyItMatters.split('.')[0] + '.';

  return (
    <motion.div
      className="cursor-pointer flex-shrink-0 overflow-hidden"
      onClick={onClick}
      layout
      initial={false}
      animate={{
        width: isExpanded ? 560 : 160,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className="flex gap-6 h-full">
        {/* Image */}
        <motion.div
          className="flex-shrink-0 bg-[#EEEEEE] rounded overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow"
          layout
          animate={{
            width: 160,
            height: 200,
          }}
        >
          <img 
            src={resource.image} 
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex flex-col justify-center pr-6 py-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              style={{ width: 340 }}
            >
              <h3 className="text-[#111] mb-2 line-clamp-2">
                {resource.title}
              </h3>
              
              <p className="text-[#666] text-sm mb-3 line-clamp-2">
                {resource.description}
              </p>
              
              <p className="text-[#888] text-sm italic line-clamp-2">
                {firstSentence}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed title */}
        {!isExpanded && (
          <motion.div
            className="mt-3"
            initial={{ opacity: 1 }}
            animate={{ opacity: isExpanded ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-[#111] line-clamp-2 w-[160px]">
              {resource.title}
            </h3>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
