import { Project, BlogPost, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'About', path: '/about' },
  { label: 'Insights', path: '/blog' },
];

export const PROJECTS: Project[] = [
  // Mascots
  {
    id: 1,
    title: 'Volt Viper',
    client: 'Thunder Strike Esports',
    category: 'Mascots',
    description: 'A high-energy, aggressive viper mascot designed for a top-tier competitive Valorant team.',
    imageUrl: 'https://picsum.photos/id/1003/800/1200',
  },
  {
    id: 2,
    title: 'Chef Bear',
    client: 'GrillMasters BBQ',
    category: 'Mascots',
    description: 'A friendly authoritative bear character for a nationwide BBQ sauce line.',
    imageUrl: 'https://picsum.photos/id/1062/800/1200',
  },
  {
    id: 3,
    title: 'Cyber Cat',
    client: 'NeonNet ISP',
    category: 'Mascots',
    description: 'A futuristic feline representative of speed and agility.',
    imageUrl: 'https://picsum.photos/id/1025/800/1200',
  },
  // Logo Design
  {
    id: 4,
    title: 'Pulse Audio',
    client: 'Studio X',
    category: 'Logo Design',
    description: 'Clean, rhythmic visual identity for a modern sound engineering studio.',
    imageUrl: 'https://picsum.photos/id/1/800/1200',
  },
  {
    id: 5,
    title: 'Zen Peak',
    client: 'Mountain Retreat',
    category: 'Logo Design',
    description: 'Minimalist mountain silhouette for a luxury wellness brand.',
    imageUrl: 'https://picsum.photos/id/10/800/1200',
  },
  // Truck Wraps
  {
    id: 6,
    title: 'Fleet King',
    client: 'King Logistics',
    category: 'Truck Wraps',
    description: 'Bold, high-visibility vehicle branding for a regional delivery fleet.',
    imageUrl: 'https://picsum.photos/id/1071/800/1200',
  },
  {
    id: 7,
    title: 'Bio-Delivery',
    client: 'Green Roots',
    category: 'Truck Wraps',
    description: 'Organic textures meet industrial logistics in this eco-friendly wrap design.',
    imageUrl: 'https://picsum.photos/id/1072/800/1200',
  },
  // Game Art/UI
  {
    id: 8,
    title: 'Dungeon HUD',
    client: 'Quest Studios',
    category: 'Game Art/UI',
    description: 'Immersive fantasy interface for a mobile action RPG.',
    imageUrl: 'https://picsum.photos/id/1081/800/1200',
  },
  {
    id: 9,
    title: 'Pilot Portrait',
    client: 'Starbound Games',
    category: 'Game Art/UI',
    description: 'Detailed character portrait for a sci-fi cockpit interface.',
    imageUrl: 'https://picsum.photos/id/1082/800/1200',
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Why Flat Design killed the Mascot',
    excerpt: 'Minimalism stripped brands of their soul. Here is why the pendulum is swinging back to character-driven identity.',
    date: 'Oct 12, 2023',
    readTime: '5 min read',
    imageUrl: 'https://picsum.photos/id/1074/600/400',
    category: 'Branding Logic'
  },
  {
    id: 2,
    title: 'The "Eyes" Have It: Expression Sheets',
    excerpt: 'A mascot isn’t a statue. It needs to emote. I break down my process for creating flexible expression sheets.',
    date: 'Nov 03, 2023',
    readTime: '7 min read',
    imageUrl: 'https://picsum.photos/id/1011/600/400',
    category: 'Process'
  },
  {
    id: 3,
    title: 'From Sketch to Vector',
    excerpt: 'How to take a rough napkin sketch and turn it into a scalable, merchandise-ready vector asset.',
    date: 'Dec 15, 2023',
    readTime: '4 min read',
    imageUrl: 'https://picsum.photos/id/1015/600/400',
    category: 'Tutorial'
  }
];