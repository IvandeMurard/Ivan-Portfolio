import { useState, useMemo, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Filters } from './components/Filters';
import { Shelf } from './components/Shelf';
import { ResourceModal } from './components/ResourceModal';
import { Resource } from './components/ResourceCard';

const mockResources: Resource[] = [
  // Books
  {
    id: 'book-1',
    title: 'The Design of Everyday Things',
    image: 'https://images.unsplash.com/photo-1601546101027-753e8037792d?w=400',
    category: 'Books',
    description: 'Don Norman\'s classic exploration of how design shapes our daily interactions with objects and systems.',
    whyItMatters: 'Ce livre m\'a appris à observer le monde avec un regard critique et empathique. Norman démontre que le bon design est invisible - il anticipe nos besoins sans qu\'on ait à réfléchir.',
    tags: ['Design', 'UX', 'Psychology'],
  },
  {
    id: 'book-2',
    title: 'Thinking in Systems',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    category: 'Books',
    description: 'Donella Meadows\' guide to understanding complex systems and their behavior.',
    whyItMatters: 'Un cadre essentiel pour comprendre comment les produits s\'inscrivent dans des écosystèmes plus larges et comment les petits changements peuvent avoir des effets cascade.',
    tags: ['Systems', 'Strategy', 'Complexity'],
  },
  {
    id: 'book-3',
    title: 'Grid Systems in Graphic Design',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    category: 'Books',
    description: 'Josef Müller-Brockmann\'s timeless manual on grid-based design.',
    whyItMatters: 'La grille n\'est pas une contrainte mais un outil de liberté créative. Ce livre reste la référence absolue pour structurer l\'information visuellement.',
    tags: ['Design', 'Layout', 'Typography'],
  },
  {
    id: 'book-4',
    title: 'Hooked',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    category: 'Books',
    description: 'Nir Eyal\'s framework for building habit-forming products.',
    whyItMatters: 'Un modèle puissant pour comprendre comment créer des produits engageants de manière éthique et responsable.',
    tags: ['Product', 'Psychology', 'Engagement'],
  },
  {
    id: 'book-5',
    title: 'Sprint',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400',
    category: 'Books',
    description: 'Jake Knapp\'s five-day process for solving big problems and testing new ideas.',
    whyItMatters: 'La méthodologie qui a transformé ma façon d\'aborder les projets : prototyper vite, tester tôt, apprendre rapidement.',
    tags: ['Product', 'Process', 'Innovation'],
  },
  {
    id: 'book-6',
    title: 'In Praise of Shadows',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',
    category: 'Books',
    description: 'Jun\'ichiro Tanizaki\'s meditation on aesthetics, light, and shadow.',
    whyItMatters: 'Un essai poétique qui m\'a ouvert les yeux sur la beauté de la subtilité et de l\'espace négatif dans le design.',
    tags: ['Aesthetics', 'Philosophy', 'Culture'],
  },

  // Podcasts
  {
    id: 'podcast-1',
    title: 'Design Details',
    image: 'https://images.unsplash.com/photo-1709846485906-30b28e7ed651?w=400',
    category: 'Podcasts',
    description: 'Conversations about the intersection of design, technology, and craft.',
    whyItMatters: 'Des conversations intimes avec des designers qui partagent leurs processus, leurs doutes et leurs découvertes.',
    tags: ['Design', 'Process', 'Community'],
  },
  {
    id: 'podcast-2',
    title: 'Intercom on Product',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400',
    category: 'Podcasts',
    description: 'Product management insights from industry leaders.',
    whyItMatters: 'Une masterclass en product management avec des cas concrets et des frameworks actionnables.',
    tags: ['Product', 'Strategy', 'Leadership'],
  },
  {
    id: 'podcast-3',
    title: 'The Changelog',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400',
    category: 'Podcasts',
    description: 'Conversations with the hackers, leaders, and innovators of software.',
    whyItMatters: 'Pour rester connecté aux évolutions techniques et comprendre ce qui devient possible.',
    tags: ['Technology', 'Development', 'Innovation'],
  },
  {
    id: 'podcast-4',
    title: 'Design Better',
    image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400',
    category: 'Podcasts',
    description: 'Stories and lessons from world-class design leaders.',
    whyItMatters: 'Des récits inspirants qui montrent comment le design peut transformer les organisations.',
    tags: ['Design', 'Leadership', 'Culture'],
  },
  {
    id: 'podcast-5',
    title: 'High Resolution',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
    category: 'Podcasts',
    description: 'Exploring the intersection of design, business, and technology.',
    whyItMatters: 'Bobby Ghoshal et Andrew Maher décryptent les grandes tendances avec une profondeur rare.',
    tags: ['Design', 'Business', 'Trends'],
  },

  // Articles
  {
    id: 'article-1',
    title: 'Form Follows Function',
    image: 'https://images.unsplash.com/photo-1764002673517-fe61da14dc6e?w=400',
    category: 'Articles',
    description: 'Essay on the fundamental principle of modernist design.',
    whyItMatters: 'Un rappel constant que l\'esthétique doit servir l\'usage, jamais l\'inverse.',
    tags: ['Design', 'Philosophy', 'Principles'],
  },
  {
    id: 'article-2',
    title: 'Jobs to Be Done',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400',
    category: 'Articles',
    description: 'Clayton Christensen\'s framework for understanding customer motivation.',
    whyItMatters: 'Change ma façon de concevoir les produits : les utilisateurs n\'achètent pas des fonctionnalités mais des solutions à leurs problèmes.',
    tags: ['Product', 'Strategy', 'Framework'],
  },
  {
    id: 'article-3',
    title: 'The State of UX in 2024',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400',
    category: 'Articles',
    description: 'Annual report on trends and challenges in user experience design.',
    whyItMatters: 'Une vue d\'ensemble indispensable pour anticiper les évolutions du métier.',
    tags: ['UX', 'Trends', 'Research'],
  },
  {
    id: 'article-4',
    title: 'Atomic Design Methodology',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400',
    category: 'Articles',
    description: 'Brad Frost\'s approach to creating design systems.',
    whyItMatters: 'Le framework qui structure ma pensée pour construire des interfaces cohérentes et scalables.',
    tags: ['Design Systems', 'Process', 'Architecture'],
  },
  {
    id: 'article-5',
    title: 'Slow Design',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
    category: 'Articles',
    description: 'Exploring intentional, sustainable approaches to design.',
    whyItMatters: 'Un contre-poids nécessaire à la culture du "move fast and break things".',
    tags: ['Philosophy', 'Sustainability', 'Culture'],
  },

  // Communities
  {
    id: 'community-1',
    title: 'Designer Hangout',
    image: 'https://images.unsplash.com/photo-1762158008280-3dcb1d1cbd99?w=400',
    category: 'Communautés',
    description: 'A Slack community for UX professionals.',
    whyItMatters: 'Un espace bienveillant pour poser des questions, partager des ressources et progresser ensemble.',
    tags: ['Community', 'UX', 'Learning'],
  },
  {
    id: 'community-2',
    title: 'Product Hunt',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
    category: 'Communautés',
    description: 'Daily discovery of new products and makers.',
    whyItMatters: 'Ma source quotidienne d\'inspiration et de veille sur ce qui émerge.',
    tags: ['Product', 'Innovation', 'Community'],
  },
  {
    id: 'community-3',
    title: 'Dribbble',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400',
    category: 'Communautés',
    description: 'Community for designers to share and discover work.',
    whyItMatters: 'Pour explorer les tendances visuelles et découvrir des talents émergents.',
    tags: ['Design', 'Inspiration', 'Visual'],
  },
  {
    id: 'community-4',
    title: 'Indie Hackers',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400',
    category: 'Communautés',
    description: 'Community of founders building profitable businesses.',
    whyItMatters: 'Des conversations authentiques sur l\'entrepreneuriat, sans le vernis du marketing.',
    tags: ['Entrepreneurship', 'Product', 'Community'],
  },
  {
    id: 'community-5',
    title: 'AIGA',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400',
    category: 'Communautés',
    description: 'Professional association for design.',
    whyItMatters: 'Pour rester connecté à la communauté design et accéder à des événements de qualité.',
    tags: ['Design', 'Professional', 'Network'],
  },

  // Tools
  {
    id: 'tool-1',
    title: 'Figma',
    image: 'https://images.unsplash.com/photo-1734208682292-df2643d0c8d9?w=400',
    category: 'Outils',
    description: 'Collaborative interface design tool.',
    whyItMatters: 'L\'outil qui a révolutionné la collaboration design et démocratisé le prototypage.',
    tags: ['Design', 'Collaboration', 'Prototyping'],
  },
  {
    id: 'tool-2',
    title: 'Linear',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400',
    category: 'Outils',
    description: 'Issue tracking for modern software teams.',
    whyItMatters: 'La gestion de projet repensée avec une obsession pour la vitesse et l\'élégance.',
    tags: ['Product', 'Project Management', 'Workflow'],
  },
  {
    id: 'tool-3',
    title: 'Notion',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400',
    category: 'Outils',
    description: 'All-in-one workspace for notes, docs, and databases.',
    whyItMatters: 'Mon second cerveau pour organiser idées, projets et connaissances.',
    tags: ['Productivity', 'Knowledge', 'Organization'],
  },
  {
    id: 'tool-4',
    title: 'Framer',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400',
    category: 'Outils',
    description: 'Design and prototyping tool for interactive designs.',
    whyItMatters: 'Pour créer des prototypes haute-fidélité qui semblent réels.',
    tags: ['Design', 'Prototyping', 'Animation'],
  },
  {
    id: 'tool-5',
    title: 'Amplitude',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    category: 'Outils',
    description: 'Product analytics for data-driven decisions.',
    whyItMatters: 'Pour comprendre réellement comment les utilisateurs interagissent avec les produits.',
    tags: ['Analytics', 'Product', 'Data'],
  },

  // Inspirations
  {
    id: 'inspiration-1',
    title: 'Japanese Minimalism',
    image: 'https://images.unsplash.com/photo-1624901344246-8759f305fef3?w=400',
    category: 'Inspirations',
    description: 'Aesthetic philosophy of simplicity and essential beauty.',
    whyItMatters: 'Ma référence absolue pour comprendre ce que signifie "less is more".',
    tags: ['Aesthetics', 'Philosophy', 'Minimalism'],
  },
  {
    id: 'inspiration-2',
    title: 'Bauhaus Movement',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
    category: 'Inspirations',
    description: 'Historic school combining art, craft, and technology.',
    whyItMatters: 'L\'école qui a défini les bases du design moderne : forme et fonction en harmonie.',
    tags: ['Design', 'History', 'Art'],
  },
  {
    id: 'inspiration-3',
    title: 'Swiss Design',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400',
    category: 'Inspirations',
    description: 'Design style emphasizing cleanliness, readability, and objectivity.',
    whyItMatters: 'La clarté et la précision comme principes directeurs du design.',
    tags: ['Design', 'Typography', 'Grid'],
  },
  {
    id: 'inspiration-4',
    title: 'Scandinavian Design',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400',
    category: 'Inspirations',
    description: 'Design philosophy balancing beauty, functionality, and sustainability.',
    whyItMatters: 'Pour créer des expériences chaleureuses sans sacrifier la fonctionnalité.',
    tags: ['Design', 'Sustainability', 'Aesthetics'],
  },
  {
    id: 'inspiration-5',
    title: 'Dieter Rams',
    image: 'https://images.unsplash.com/photo-1619530502972-f5c1a9dbdc16?w=400',
    category: 'Inspirations',
    description: 'German industrial designer and his ten principles for good design.',
    whyItMatters: 'Les 10 principes qui guident chacune de mes décisions de design.',
    tags: ['Design', 'Principles', 'Industrial Design'],
  },
  {
    id: 'inspiration-6',
    title: 'Wabi-Sabi',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    category: 'Inspirations',
    description: 'Japanese aesthetic centered on acceptance of transience and imperfection.',
    whyItMatters: 'Accepter l\'imperfection et célébrer l\'authenticité dans le design.',
    tags: ['Philosophy', 'Aesthetics', 'Culture'],
  },
];

const categories = ['Books', 'Podcasts', 'Articles', 'Communautés', 'Outils', 'Inspirations'];

const allTags = Array.from(new Set(mockResources.flatMap(r => r.tags)));

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number>(-1);
  const [expandedResourceId, setExpandedResourceId] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    return mockResources.filter(resource => {
      const matchesSearch = searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => resource.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  const handleResourceClick = (resource: Resource) => {
    // Toggle expansion: if clicking the same card, collapse it, otherwise expand new one
    if (expandedResourceId === resource.id) {
      setExpandedResourceId(null);
    } else {
      setExpandedResourceId(resource.id);
    }
  };

  const resourcesByCategory = categories.map(category => ({
    category,
    resources: filteredResources.filter(r => r.category === category),
  }));

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedResource) return; // Don't navigate when modal is open

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedCardIndex(prev => 
          prev < filteredResources.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedCardIndex(prev => prev > 0 ? prev - 1 : prev);
      } else if (e.key === 'Enter' && focusedCardIndex >= 0) {
        e.preventDefault();
        handleResourceClick(filteredResources[focusedCardIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setExpandedResourceId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedResource, focusedCardIndex, filteredResources, expandedResourceId]);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-[1280px] mx-auto px-20">
        <Hero />
        
        <Filters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          availableTags={allTags}
          onClearAll={handleClearAll}
        />

        {/* Results count */}
        <div className="py-6 text-center">
          <p className="text-sm text-[#666]">
            {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
            {(searchQuery || selectedTags.length > 0) && ' found'}
          </p>
        </div>

        <div className="flex flex-col gap-20 pb-20">
          {resourcesByCategory.map((shelf, index) => (
            shelf.resources.length > 0 && (
              <Shelf
                key={shelf.category}
                categoryName={shelf.category}
                resources={shelf.resources}
                onResourceClick={handleResourceClick}
                delay={index * 0.05}
                expandedResourceId={expandedResourceId}
              />
            )
          ))}
        </div>

        {resourcesByCategory.every(shelf => shelf.resources.length === 0) && (
          <div className="text-center py-20 text-[#4B4B4B]">
            Aucune ressource ne correspond à votre recherche.
          </div>
        )}
      </div>

      <ResourceModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        allResources={mockResources}
        onResourceClick={setSelectedResource}
      />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
