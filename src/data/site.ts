const u = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
export const HERO_IMG = u("photo-1507525428034-b723cf961d3e", 1920);

export type Destination = { id: string; name: string; state: string; category: string; desc: string; img: string; rating: number; bestTime: string };
export const destinations: Destination[] = [
  { id: "goa", name: "Goa", state: "Goa", category: "Beach", desc: "Golden beaches, Portuguese heritage and vibrant nightlife on India's west coast.", img: u("photo-1512343879784-a960bf40e7f2"), rating: 4.8, bestTime: "Nov – Feb" },
  { id: "kashmir", name: "Kashmir", state: "Jammu & Kashmir", category: "Mountains", desc: "Snow-capped peaks, Dal Lake shikaras and meadows of breathtaking beauty.", img: u("photo-1566837945700-30057527ade0"), rating: 4.9, bestTime: "Mar – Oct" },
  { id: "manali", name: "Manali", state: "Himachal Pradesh", category: "Mountains", desc: "Pine forests, adventure sports and the gateway to Rohtang Pass.", img: u("photo-1626621341517-bbf3d9990a23"), rating: 4.7, bestTime: "Oct – Jun" },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", category: "Heritage", desc: "The Pink City of royal palaces, majestic forts and colourful bazaars.", img: u("photo-1477587458883-47145ed94245"), rating: 4.7, bestTime: "Oct – Mar" },
  { id: "kerala", name: "Kerala", state: "Kerala", category: "Nature", desc: "Serene backwaters, houseboats, tea gardens and Ayurvedic retreats.", img: u("photo-1602216056096-3b40cc0c9944"), rating: 4.9, bestTime: "Sep – Mar" },
  { id: "gujarat", name: "Gujarat", state: "Gujarat", category: "Heritage", desc: "Rann of Kutch, Gir lions, Statue of Unity and rich cultural traditions.", img: u("photo-1609920658906-8223bd289001"), rating: 4.6, bestTime: "Nov – Feb" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", category: "City", desc: "The city of dreams — Gateway of India, Marine Drive and Bollywood.", img: u("photo-1570168007204-dfb528c6958f"), rating: 4.5, bestTime: "Nov – Feb" },
  { id: "agra", name: "Agra", state: "Uttar Pradesh", category: "Heritage", desc: "Home of the iconic Taj Mahal, a timeless symbol of love.", img: u("photo-1564507592333-c60657eea523"), rating: 4.8, bestTime: "Oct – Mar" },
];
export const destCategories = ["All", "Beach", "Mountains", "Heritage", "Nature", "City"];

export type Pkg = { id: string; title: string; dest: string; img: string; days: number; price: number; category: string; facilities: string[]; itinerary: string };
export const packages: Pkg[] = [
  { id: "goa-beach", title: "Goa Beach Escape", dest: "Goa", img: destinations[0]!.img, days: 4, price: 14999, category: "Leisure", facilities: ["Hotel", "Breakfast", "Sightseeing", "Airport Transfer"], itinerary: "North & South Goa beaches, Old Goa churches, sunset cruise on Mandovi river." },
  { id: "kashmir-paradise", title: "Kashmir Paradise Tour", dest: "Kashmir", img: destinations[1]!.img, days: 6, price: 27999, category: "Honeymoon", facilities: ["Houseboat Stay", "All Meals", "Shikara Ride", "Cab"], itinerary: "Srinagar, Gulmarg gondola, Pahalgam valleys and Sonmarg glaciers." },
  { id: "manali-adventure", title: "Manali Adventure Trip", dest: "Manali", img: destinations[2]!.img, days: 5, price: 18499, category: "Adventure", facilities: ["Hotel", "Breakfast & Dinner", "Paragliding", "Volvo Bus"], itinerary: "Solang Valley, Rohtang Pass, Hadimba Temple and river rafting in Kullu." },
  { id: "jaipur-royal", title: "Royal Rajasthan – Jaipur", dest: "Jaipur", img: destinations[3]!.img, days: 3, price: 11999, category: "Family", facilities: ["Heritage Hotel", "Breakfast", "Guide", "Cab"], itinerary: "Amber Fort, Hawa Mahal, City Palace, Jantar Mantar and Chokhi Dhani dinner." },
  { id: "kerala-backwaters", title: "Kerala Backwater Bliss", dest: "Kerala", img: destinations[4]!.img, days: 6, price: 24999, category: "Honeymoon", facilities: ["Houseboat", "All Meals", "Ayurvedic Spa", "Cab"], itinerary: "Munnar tea gardens, Thekkady, Alleppey houseboat and Kovalam beach." },
  { id: "gujarat-heritage", title: "Gujarat Heritage Circuit", dest: "Gujarat", img: destinations[5]!.img, days: 5, price: 16999, category: "Family", facilities: ["Hotel", "Breakfast", "Rann Utsav Tent", "Cab"], itinerary: "Ahmedabad, Statue of Unity, Rann of Kutch white desert and Dwarka." },
  { id: "mumbai-city", title: "Mumbai City Lights", dest: "Mumbai", img: destinations[6]!.img, days: 3, price: 9999, category: "Leisure", facilities: ["Hotel", "Breakfast", "City Tour", "Local Transfers"], itinerary: "Gateway of India, Elephanta Caves, Marine Drive and film city tour." },
  { id: "agra-taj", title: "Taj Mahal Weekend", dest: "Agra", img: destinations[7]!.img, days: 2, price: 6999, category: "Family", facilities: ["Hotel", "Breakfast", "Guide", "AC Cab"], itinerary: "Sunrise Taj Mahal visit, Agra Fort, Mehtab Bagh and Fatehpur Sikri." },
];
export const pkgCategories = ["All", "Leisure", "Adventure", "Honeymoon", "Family"];
export const budgets = [
  { label: "Any budget", min: 0, max: Infinity },
  { label: "Under ₹10,000", min: 0, max: 9999 },
  { label: "₹10,000 – ₹20,000", min: 10000, max: 20000 },
  { label: "Above ₹20,000", min: 20001, max: Infinity },
];

export type Hotel = { id: string; name: string; location: string; img: string; price: number; rating: number; facilities: string[]; about: string };
export const hotels: Hotel[] = [
  { id: "h1", name: "Taj Fort Aguada Resort", location: "Goa", img: u("photo-1566073771259-6a8506099945"), price: 12500, rating: 4.8, facilities: ["Pool", "Sea View", "Spa", "Free Wi-Fi"], about: "A clifftop beach resort set inside a 17th-century Portuguese fort." },
  { id: "h2", name: "Lalit Grand Palace", location: "Kashmir", img: u("photo-1582719478250-c89cae4dc85b"), price: 15000, rating: 4.7, facilities: ["Lake View", "Restaurant", "Garden", "Free Wi-Fi"], about: "A heritage palace hotel overlooking Dal Lake and the Zabarwan hills." },
  { id: "h3", name: "Snow Valley Resorts", location: "Manali", img: u("photo-1542314831-068cd1dbfeeb"), price: 5500, rating: 4.4, facilities: ["Mountain View", "Heater", "Restaurant", "Parking"], about: "Cosy rooms with balconies facing the snowy Himalayan peaks." },
  { id: "h4", name: "Rambagh Palace", location: "Jaipur", img: u("photo-1520250497591-112f2f40a3f4"), price: 22000, rating: 4.9, facilities: ["Pool", "Spa", "Fine Dining", "Butler"], about: "The former residence of the Maharaja of Jaipur, now a luxury palace hotel." },
  { id: "h5", name: "Kumarakom Lake Resort", location: "Kerala", img: u("photo-1571896349842-33c89424de2d"), price: 13500, rating: 4.8, facilities: ["Backwater View", "Ayurveda", "Pool", "Breakfast"], about: "Traditional Kerala villas on the shores of Vembanad Lake." },
  { id: "h6", name: "The Oberoi Mumbai", location: "Mumbai", img: u("photo-1551882547-ff40c63fe5fa"), price: 18000, rating: 4.7, facilities: ["Sea View", "Gym", "Spa", "Free Wi-Fi"], about: "Contemporary luxury on Marine Drive with views of the Arabian Sea." },
];

export const testimonials = [
  { name: "Priya Sharma", city: "Ahmedabad", text: "Our Kerala honeymoon was magical. Every detail was planned perfectly by ExploreWorld!", rating: 5 },
  { name: "Rahul Mehta", city: "Surat", text: "The Manali adventure package was great value. The budget calculator helped us plan in advance.", rating: 5 },
  { name: "Ananya Iyer", city: "Chennai", text: "Easy to browse, beautiful destinations and helpful support. Highly recommended for families.", rating: 4 },
];
