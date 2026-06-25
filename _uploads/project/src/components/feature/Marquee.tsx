interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  className?: string;
}

const rgbColors = [
  '#ef4444', // red
  '#22c55e', // green
  '#06b6d4', // cyan
  '#a855f7', // purple
  '#f97316', // orange
  '#ec4899', // pink
  '#eab308', // gold
];

export default function Marquee({ items, direction = 'left', className = '' }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden max-w-full whitespace-nowrap ${className}`}>
      <div
        className={`inline-flex w-max ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}`}
      >
        {doubled.map((item, i) => {
          const color = rgbColors[i % rgbColors.length];
          return (
            <span
              key={i}
              className="inline-flex items-center mx-6 sm:mx-8 text-xs sm:text-sm md:text-base font-medium tracking-widest uppercase whitespace-nowrap"
              style={{ color }}
            >
              {item}
              <span
                className="mx-4 sm:mx-6 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full inline-block flex-shrink-0"
                style={{ backgroundColor: color, opacity: 0.5 }}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}