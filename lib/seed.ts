import { db } from "./db";

const interests = [
  { name: "Adventure", icon: "🏔️" },
  { name: "Culture", icon: "🏛️" },
  { name: "Food & Cuisine", icon: "🍜" },
  { name: "Nature", icon: "🌿" },
  { name: "Beach", icon: "🏖️" },
  { name: "History", icon: "🏰" },
  { name: "Art", icon: "🎨" },
  { name: "Nightlife", icon: "🌙" },
  { name: "Shopping", icon: "🛍️" },
  { name: "Wellness", icon: "🧘" },
  { name: "Photography", icon: "📸" },
  { name: "Sports", icon: "⚽" },
];

const places = [
  {
    name: "Petra",
    description: "The ancient rose-red city carved into rock, a UNESCO World Heritage Site and one of the New Seven Wonders of the World.",
    category: "History",
    city: "Petra",
    country: "Jordan",
    imageUrl: "https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=800",
    rating: 4.9,
    tags: JSON.stringify(["History", "Adventure", "Culture", "Photography"]),
  },
  {
    name: "Dead Sea",
    description: "Float effortlessly in the saltiest lake on Earth, famous for its therapeutic mineral-rich mud and waters.",
    category: "Nature",
    city: "Dead Sea",
    country: "Jordan",
    imageUrl: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800",
    rating: 4.7,
    tags: JSON.stringify(["Nature", "Wellness", "Beach"]),
  },
  {
    name: "Wadi Rum",
    description: "A vast desert wilderness with towering sandstone mountains and ancient rock inscriptions, also known as the Valley of the Moon.",
    category: "Adventure",
    city: "Wadi Rum",
    country: "Jordan",
    imageUrl: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800",
    rating: 4.8,
    tags: JSON.stringify(["Adventure", "Nature", "Photography"]),
  },
  {
    name: "Jerash",
    description: "One of the best-preserved Greco-Roman cities outside Italy, with colonnaded streets, temples, and theatres.",
    category: "History",
    city: "Jerash",
    country: "Jordan",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    rating: 4.6,
    tags: JSON.stringify(["History", "Culture", "Photography"]),
  },
  {
    name: "Burj Khalifa",
    description: "The world's tallest skyscraper offers breathtaking panoramic views of Dubai from its observation decks.",
    category: "Culture",
    city: "Dubai",
    country: "UAE",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    rating: 4.7,
    tags: JSON.stringify(["Culture", "Photography", "Art"]),
  },
  {
    name: "Sheikh Zayed Grand Mosque",
    description: "One of the world's largest mosques, featuring stunning white marble architecture and intricate floral designs.",
    category: "Culture",
    city: "Abu Dhabi",
    country: "UAE",
    imageUrl: "https://images.unsplash.com/photo-1579709175789-4df4bca59f2e?w=800",
    rating: 4.9,
    tags: JSON.stringify(["Culture", "History", "Art", "Photography"]),
  },
  {
    name: "Souk Al-Mubarakiya",
    description: "Kuwait's oldest and most famous market, offering traditional handicrafts, spices, and local cuisine.",
    category: "Shopping",
    city: "Kuwait City",
    country: "Kuwait",
    imageUrl: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800",
    rating: 4.4,
    tags: JSON.stringify(["Shopping", "Culture", "Food & Cuisine"]),
  },
  {
    name: "Masada",
    description: "An ancient fortress perched atop an isolated rock plateau with dramatic views of the Dead Sea and Judean Desert.",
    category: "History",
    city: "Masada",
    country: "Israel",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    rating: 4.8,
    tags: JSON.stringify(["History", "Adventure", "Photography"]),
  },
  {
    name: "Marrakech Medina",
    description: "A labyrinthine medieval city with vibrant souks, palaces, and gardens — a feast for all the senses.",
    category: "Culture",
    city: "Marrakech",
    country: "Morocco",
    imageUrl: "https://images.unsplash.com/photo-1553152531-b98a2fc8d3bf?w=800",
    rating: 4.6,
    tags: JSON.stringify(["Culture", "Shopping", "Food & Cuisine", "History"]),
  },
  {
    name: "Sahara Desert",
    description: "Experience the world's largest hot desert with golden sand dunes, camel treks, and unforgettable stargazing.",
    category: "Adventure",
    city: "Merzouga",
    country: "Morocco",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
    rating: 4.9,
    tags: JSON.stringify(["Adventure", "Nature", "Photography"]),
  },
  {
    name: "Hagia Sophia",
    description: "A masterpiece of Byzantine architecture, now a mosque, standing as one of the greatest buildings in human history.",
    category: "History",
    city: "Istanbul",
    country: "Turkey",
    imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
    rating: 4.8,
    tags: JSON.stringify(["History", "Culture", "Art", "Photography"]),
  },
  {
    name: "Cappadocia",
    description: "Famous for its unique fairy chimney rock formations and the magical experience of hot air balloon rides at sunrise.",
    category: "Adventure",
    city: "Göreme",
    country: "Turkey",
    imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800",
    rating: 4.9,
    tags: JSON.stringify(["Adventure", "Photography", "Nature", "Culture"]),
  },
];

export async function seedDatabase() {
  for (const interest of interests) {
    await db.interest.upsert({
      where: { name: interest.name },
      update: {},
      create: interest,
    });
  }

  for (const place of places) {
    await db.place.upsert({
      where: { id: place.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: { id: place.name.toLowerCase().replace(/\s+/g, "-"), ...place },
    });
  }
}
