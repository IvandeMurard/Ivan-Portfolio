import { motion } from "framer-motion";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  index: number;
  isLast?: boolean;
}

export function TimelineItem({ date, title, description, index, isLast = false }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative flex gap-6 items-start group"
    >
      {/* Date - wider for long date ranges */}
      <div className="w-44 flex-shrink-0 text-right">
        <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent font-semibold text-sm whitespace-nowrap">
          {date}
        </span>
      </div>

      {/* Connector */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
          className="relative z-10 w-4 h-4 rounded-full bg-accent border-4 border-background shadow-lg group-hover:scale-125 transition-transform duration-300"
        />
        
        {/* Vertical line - always show */}
        <div className="absolute top-4 bottom-0 w-0.5 bg-gradient-to-b from-accent/50 via-primary/30 to-accent/50" 
             style={{ height: "calc(100% + 2rem)" }} 
        />
      </div>

      {/* Content Card */}
      <motion.div
        whileHover={{ x: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
        className="flex-1 p-5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-accent/30 transition-all duration-300"
      >
        <h4 className="font-semibold mb-2 text-lg text-foreground group-hover:text-accent transition-colors">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}
