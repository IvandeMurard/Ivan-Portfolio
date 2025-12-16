export type ResourceCategory = "Inspirations" | "Resources" | "Communities";
export type ResourceFormat = "book" | "article" | "podcast" | "talk" | "video" | "community" | "tool" | "website";

export interface Resource {
  id: string;
  title: string;
  category: ResourceCategory;
  format: ResourceFormat;
  image: string;
  url: string;
  commentary: string; // why this resource matters
  insight: string; // what I learned from it
  whenUseful?: string; // optional: when I use it
  relatedIds: string[];
  description?: string; // short description for cards
  author?: string;
  year?: number;
}

export const resources: Resource[] = [
  // Communities
  {
    id: "join-lion",
    title: "LION",
    category: "Communities",
    format: "community",
    image: "/img/join_lion_le_promptathon.png",
    url: "https://www.joinlion.co/",
    commentary: "A community focused on learning and entrepreneurship in AI. Being an alumni has connected me with builders and innovators who share a passion for creating meaningful products.",
    insight: "The best way to learn AI product development is by building with others. Community-driven learning accelerates understanding of both technical capabilities and product applications.",
    whenUseful: "When exploring new AI tools or thinking about AI product strategy. The community provides real-world examples and peer learning.",
    relatedIds: ["the-ai-collective", "paatch"],
    description: "Learn and build in AI entrepreneurship."
  },
  {
    id: "the-ai-collective",
    title: "The AI Collective",
    category: "Communities",
    format: "community",
    image: "/img/theaicollective.png",
    url: "https://www.aicollective.com/",
    commentary: "Thematic hackathons for discovering tools and practices. Participating in events like Windsurf and Blackbox AI has been instrumental in staying current with AI product development.",
    insight: "Hands-on experimentation with AI tools reveals their real capabilities and limitations. Hackathons are the fastest way to understand what's possible.",
    whenUseful: "When evaluating new AI tools or prototyping AI features. The hackathons provide structured opportunities to experiment.",
    relatedIds: ["join-lion", "paatch"],
    description: "Thematic hackathons for discovering AI tools and practices."
  },
  {
    id: "paatch",
    title: "Paatch",
    category: "Communities",
    format: "community",
    image: "/img/paatch.png",
    url: "https://www.paatch.io/",
    commentary: "Product & Growth meetups that focus on discovering and prototyping with new AI tools. Participating in events around Manus and Make has expanded my understanding of AI product development.",
    insight: "AI product development requires understanding both the tools and the product patterns. Meetups bridge the gap between technical capability and user value.",
    whenUseful: "When exploring AI tools for product workflows or thinking about AI-powered features.",
    relatedIds: ["join-lion", "the-ai-collective"],
    description: "Product & Growth meetups for discovering and prototyping with AI tools."
  },
  {
    id: "maestro",
    title: "MAESTRO",
    category: "Communities",
    format: "community",
    image: "/img/maestro.png",
    url: "https://maestro.mariaschools.com/",
    commentary: "A community dedicated to product and innovation. Continuous learning around product management has been invaluable for my growth as a Core Product Lead.",
    insight: "Product management is a craft that requires continuous learning. Communities like MAESTRO provide structured learning and peer support.",
    whenUseful: "For ongoing product management education and connecting with other product leaders.",
    relatedIds: ["lennys-paris"],
    description: "Continuous learning in product management and innovation."
  },
  {
    id: "lennys-paris",
    title: "Lenny's Newsletter • Paris",
    category: "Communities",
    format: "community",
    image: "/img/lenny_newsletter_logo.PNG",
    url: "https://www.lennysnewsletter.com/",
    commentary: "Product management meetups focused on sharing best practices. Organizing a meet-up in October 2025 has been a great way to contribute to the local product community.",
    insight: "Local product communities are essential for knowledge sharing and building relationships. Contributing back to the community strengthens everyone.",
    whenUseful: "For connecting with local product managers and sharing learnings.",
    relatedIds: ["maestro", "lenny-podcast"],
    description: "Product management meetups focused on sharing best practices."
  },

  // Inspirations
  {
    id: "unreasonable-hospitality",
    title: "Unreasonable Hospitality",
    category: "Inspirations",
    format: "book",
    image: "/img/unreasonable_hospitality.png",
    url: "https://www.unreasonablehospitality.com/",
    commentary: "This book transformed how I think about product experiences. The principle that small, thoughtful gestures can create lasting emotional connections applies directly to product design. It taught me that hospitality isn't just for restaurants—it's a product advantage.",
    insight: "Small, unexpected moments of delight can transform a good experience into an unforgettable one. The 95/5 rule: nail the 95% basics, then go above and beyond with the 5%.",
    whenUseful: "When designing onboarding flows or crafting moments of delight. It reminds me that details matter and that hospitality is a competitive advantage.",
    relatedIds: ["product-delight", "japanese-minimalism"],
    description: "If a stumble at the end of a meal can undo all the goodwill a restaurant has earned in the three hours preceeding it, then a gorgeous, gracious gesture at the end can have the opposite effect.",
    author: "Will Guidara",
    year: 2022
  },
  {
    id: "general-magic",
    title: "General Magic",
    category: "Inspirations",
    format: "video",
    image: "/img/general-magic.png",
    url: "https://www.generalmagicthemovie.com/",
    commentary: "A documentary that captures the essence of product vision and team commitment. The General Magic team's approach to building something people would love—like your watch or glasses—resonates deeply with my philosophy of human-first product design.",
    insight: "Great products come from teams that believe in a vision, even when the technology isn't ready. The commitment to human-centered design matters more than perfect execution.",
    whenUseful: "When feeling discouraged about product challenges or needing inspiration about product vision.",
    relatedIds: ["unreasonable-hospitality"],
    description: '"We are trying to make something people love, we need it to be like your watch, your glasses".',
    year: 2018
  },
  {
    id: "product-delight",
    title: "Product Delight",
    category: "Inspirations",
    format: "article",
    image: "/img/product-delight.png",
    url: "https://nesrinechanguel.substack.com/",
    commentary: "Nesrine's newsletter bridges the gap between product management and hospitality beautifully. The concrete experiences and actionable insights help me think about delight as a systematic approach, not just a nice-to-have.",
    insight: "Delight can be systematized. It's not random—it's about understanding user motivations and creating moments that exceed expectations.",
    whenUseful: "When planning feature releases or designing user journeys. It helps me think about where to invest in delight.",
    relatedIds: ["unreasonable-hospitality"],
    description: "To convert motivators into actionable insights, reframe them using \"How might we…\" questions.",
    author: "Nesrine Changuel"
  },
  {
    id: "japanese-minimalism",
    title: "Japanese Minimalism",
    category: "Inspirations",
    format: "article",
    image: "/img/placeholder.svg",
    url: "#",
    commentary: "The aesthetic philosophy of simplicity and essential beauty. This is my absolute reference for understanding what 'less is more' truly means in design and product development.",
    insight: "True minimalism isn't about removing things—it's about removing everything that doesn't serve a purpose. Every element should earn its place.",
    whenUseful: "When reviewing UI designs or simplifying feature sets. It's my guide for cutting through complexity.",
    relatedIds: ["wabi-sabi", "unreasonable-hospitality"],
    description: "Aesthetic philosophy of simplicity and essential beauty."
  },
  {
    id: "wabi-sabi",
    title: "Wabi-Sabi",
    category: "Inspirations",
    format: "article",
    image: "/img/placeholder.svg",
    url: "#",
    commentary: "Japanese aesthetic centered on acceptance of transience and imperfection. This philosophy helps me accept imperfection and celebrate authenticity in design.",
    insight: "Perfection isn't the goal—authenticity is. Embracing imperfection and the natural evolution of products creates more human, relatable experiences.",
    whenUseful: "When feeling pressure to make everything perfect. It reminds me that shipping and iterating is better than endless refinement.",
    relatedIds: ["japanese-minimalism"],
    description: "Japanese aesthetic centered on acceptance of transience and imperfection."
  },

  // Resources
  {
    id: "design-of-everyday-things",
    title: "The Design of Everyday Things",
    category: "Resources",
    format: "book",
    image: "/img/placeholder.svg",
    url: "https://www.jnd.org/",
    commentary: "Don Norman's foundational work on human-centered design. It's the book that made me understand that good design is invisible, and bad design is everywhere. Essential reading for anyone building products.",
    insight: "Good design communicates its purpose through affordances and signifiers. Users shouldn't need instructions—the design should guide them naturally.",
    whenUseful: "When designing new features or reviewing UX patterns. It's my reference for evaluating whether an interface is intuitive.",
    relatedIds: ["continuous-discovery", "jobs-to-be-done"],
    description: "Don Norman's classic exploration of how design shapes our daily interactions with objects and systems.",
    author: "Don Norman",
    year: 2013
  },
  {
    id: "continuous-discovery",
    title: "Continuous Discovery Habits",
    category: "Resources",
    format: "book",
    image: "/img/placeholder.svg",
    url: "https://www.producttalk.org/",
    commentary: "Teresa Torres's framework for continuous discovery has shaped how I approach product research. The weekly touchpoint model and opportunity solution tree are tools I use regularly in my work.",
    insight: "Product discovery isn't a phase—it's a continuous habit. Weekly touchpoints with customers and the opportunity solution tree help prioritize what to build next.",
    whenUseful: "When planning discovery sprints or structuring user research. The opportunity solution tree is my go-to framework for organizing insights.",
    relatedIds: ["design-of-everyday-things", "jobs-to-be-done"],
    description: "Teresa Torres's guide to understanding complex systems and their behavior.",
    author: "Teresa Torres",
    year: 2021
  },
  {
    id: "jobs-to-be-done",
    title: "Jobs to Be Done Framework",
    category: "Resources",
    format: "article",
    image: "/img/placeholder.svg",
    url: "https://www.intercom.com/blog/jobs-to-be-done/",
    commentary: "The Jobs to Be Done framework fundamentally changed how I approach product development. Understanding what job customers are hiring your product to do is more valuable than demographic data.",
    insight: "Customers don't buy products—they hire them to do a job. Understanding the functional, emotional, and social jobs helps build products people actually want.",
    whenUseful: "At the start of any new product or feature. It's my framework for understanding user needs beyond surface-level requirements.",
    relatedIds: ["continuous-discovery", "design-of-everyday-things"],
    description: "Understanding customer jobs"
  },
  {
    id: "lenny-podcast",
    title: "Lenny's Podcast",
    category: "Resources",
    format: "podcast",
    image: "/img/lenny_newsletter_logo.PNG",
    url: "https://www.lennyspodcast.com/",
    commentary: "Lenny's interviews with top product leaders provide actionable insights and real-world case studies. It's my go-to for staying current with product management best practices and emerging trends.",
    insight: "The best product decisions come from understanding context, not following frameworks blindly. Each episode offers a new lens on product strategy.",
    whenUseful: "Weekly listening for staying current with product trends and learning from experienced PMs.",
    relatedIds: ["continuous-discovery", "jobs-to-be-done"],
    description: "Interviews with product leaders"
  },
  {
    id: "hooked",
    title: "Hooked",
    category: "Resources",
    format: "book",
    image: "/img/placeholder.svg",
    url: "https://www.nirandfar.com/hooked/",
    commentary: "Understanding how products create habits is crucial for building sustainable engagement. While I focus on ethical product design, understanding these patterns helps me build better, more intentional experiences.",
    insight: "Habit-forming products follow a loop: trigger, action, variable reward, investment. But ethical design means using this responsibly, not manipulatively.",
    whenUseful: "When designing features that need regular engagement. It helps me think about sustainable habits vs. addictive patterns.",
    relatedIds: ["design-of-everyday-things"],
    description: "Nir Eyal's framework for building habit-forming products.",
    author: "Nir Eyal",
    year: 2014
  }
];
