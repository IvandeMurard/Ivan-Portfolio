export function Hero() {
  return (
    <div className="flex flex-col items-center gap-4 pt-20 pb-10">
      <h1 className="text-[#0A0A0A] text-center tracking-[-0.01em] leading-[120%] text-4xl sm:text-5xl md:text-6xl font-semibold">
        Curated Resource Library
      </h1>

      <p className="text-[#2A2A2A] text-center max-w-[720px] leading-[150%] text-[15px]">
        A collection of books, podcasts, articles, tools, and inspirations that shape my
        approach to product management, design, and community building. Each resource has
        influenced how I think about building human-first products.
      </p>
    </div>
  );
}

