// Backend integration: replace these static mocks with API calls
// (restaurants, menu, offers, addresses, payment methods) when the server is connected.

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  cuisines: string[];
  rating: number;
  reviewCount: number;
  etaMin: number;
  etaMax: number;
  deliveryFee: number;
  minOrder: number;
  status: 'open' | 'busy' | 'closed';
  verified: boolean;
  image: string;
  alt: string;
  offer?: string;
  priceTier: 1 | 2 | 3;
  zones: string[];
  closesAt: string;
  opensAt?: string;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
  count: number;
}

export interface ModifierOption {
  id: string;
  label: string;
  price: number;
}

export interface ModifierGroup {
  id: string;
  label: string;
  required: boolean;
  multiple: boolean;
  options: ModifierOption[];
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  image: string;
  alt: string;
  dietary: string[];
  allergens: string[];
  spice?: 0 | 1 | 2 | 3;
  stock: 'in' | 'low' | 'out';
  stockLeft?: number;
  modifiers?: ModifierGroup[];
  popular?: boolean;
  serves?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code?: string;
  minSpend?: number;
  expiresIn: string;
  tone: 'primary' | 'accent' | 'warning';
}

export interface Dish {
  id: string;
  name: string;
  restaurant: string;
  restaurantSlug: string;
  price: number;
  promoPrice?: number;
  image: string;
  alt: string;
  rating: number;
  orders: string;
}

export interface Address {
  id: string;
  label: string;
  line: string;
  area: string;
  note: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'cod' | 'card' | 'wallet';
  label: string;
  detail: string;
  available: boolean;
  unavailableReason?: string;
}

export interface Coupon {
  code: string;
  kind: 'percent' | 'fixed';
  value: number;
  maxDiscount?: number;
  minSpend: number;
  description: string;
}

export const categories: Category[] = [
{ id: 'all', label: 'All', emoji: '🍽️', count: 142 },
{ id: 'bbq', label: 'BBQ & Grill', emoji: '🍢', count: 26 },
{ id: 'desi', label: 'Desi', emoji: '🍛', count: 38 },
{ id: 'biryani', label: 'Biryani', emoji: '🍚', count: 19 },
{ id: 'burgers', label: 'Burgers', emoji: '🍔', count: 24 },
{ id: 'pizza', label: 'Pizza', emoji: '🍕', count: 17 },
{ id: 'chinese', label: 'Chinese', emoji: '🥡', count: 14 },
{ id: 'dessert', label: 'Desserts', emoji: '🧁', count: 21 },
{ id: 'breakfast', label: 'Breakfast', emoji: '🍳', count: 11 }];


export const restaurants: Restaurant[] = [
{
  id: 'rest-001',
  name: 'Bundu Khan Gulberg',
  slug: 'bundu-khan-gulberg',
  cuisines: ['BBQ & Grill', 'Desi'],
  rating: 4.6,
  reviewCount: 1284,
  etaMin: 35,
  etaMax: 45,
  deliveryFee: 150,
  minOrder: 800,
  status: 'open',
  verified: true,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d7bc17ad-1772824313429.png",
  alt: 'Platter of grilled seekh kebabs and chicken tikka with mint chutney and naan on a dark table',
  offer: '20% off BBQ platters',
  priceTier: 2,
  zones: ['Gulberg III', 'Gulberg II', 'Model Town', 'Cantt'],
  closesAt: '11:30 PM'
},
{
  id: 'rest-002',
  name: 'Biryani Bazaar',
  slug: 'biryani-bazaar',
  cuisines: ['Biryani', 'Desi'],
  rating: 4.4,
  reviewCount: 872,
  etaMin: 30,
  etaMax: 40,
  deliveryFee: 120,
  minOrder: 600,
  status: 'busy',
  verified: true,
  image: "https://images.unsplash.com/photo-1666911477955-9802dcfe4b74",
  alt: 'Steaming bowl of chicken biryani with fried onions and boiled egg garnish',
  offer: 'Free raita on 2 biryanis',
  priceTier: 1,
  zones: ['Gulberg III', 'Johar Town', 'Garden Town'],
  closesAt: '12:00 AM'
},
{
  id: 'rest-003',
  name: 'Smash House Burgers',
  slug: 'smash-house-burgers',
  cuisines: ['Burgers'],
  rating: 4.7,
  reviewCount: 2310,
  etaMin: 25,
  etaMax: 35,
  deliveryFee: 99,
  minOrder: 700,
  status: 'open',
  verified: true,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1df1d1d84-1772617161795.png",
  alt: 'Double smash cheeseburger with melted cheddar, pickles and sesame bun next to golden fries',
  offer: 'Buy 1 Get 1 on classics',
  priceTier: 2,
  zones: ['Gulberg III', 'DHA Phase 5', 'Cantt', 'Model Town'],
  closesAt: '1:00 AM'
},
{
  id: 'rest-004',
  name: 'Fire & Dough Pizzeria',
  slug: 'fire-and-dough-pizzeria',
  cuisines: ['Pizza', 'Italian'],
  rating: 4.3,
  reviewCount: 641,
  etaMin: 40,
  etaMax: 55,
  deliveryFee: 180,
  minOrder: 1200,
  status: 'open',
  verified: false,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1760dc0f4-1772415746437.png",
  alt: 'Wood-fired pepperoni pizza with blistered crust and basil leaves on a wooden board',
  priceTier: 3,
  zones: ['DHA Phase 5', 'DHA Phase 6', 'Gulberg III'],
  closesAt: '11:00 PM'
},
{
  id: 'rest-005',
  name: 'Wok This Way',
  slug: 'wok-this-way',
  cuisines: ['Chinese'],
  rating: 4.2,
  reviewCount: 529,
  etaMin: 35,
  etaMax: 50,
  deliveryFee: 130,
  minOrder: 900,
  status: 'open',
  verified: true,
  image: "https://images.unsplash.com/photo-1655689711629-84ba33584064",
  alt: 'Takeout boxes of chicken chow mein and sweet and sour chicken with chopsticks',
  offer: 'Rs 200 off over Rs 1,500',
  priceTier: 2,
  zones: ['Johar Town', 'Model Town', 'Garden Town'],
  closesAt: '11:30 PM'
},
{
  id: 'rest-006',
  name: 'Nashta Nagar',
  slug: 'nashta-nagar',
  cuisines: ['Breakfast', 'Desi'],
  rating: 4.8,
  reviewCount: 1796,
  etaMin: 20,
  etaMax: 30,
  deliveryFee: 80,
  minOrder: 500,
  status: 'closed',
  verified: true,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f5ea877d-1772696988113.png",
  alt: 'Traditional halwa puri breakfast with chana, aloo bhujia and a cup of doodh patti chai',
  priceTier: 1,
  zones: ['Gulberg III', 'Cantt', 'Garden Town'],
  closesAt: '1:00 PM',
  opensAt: 'Opens 6:30 AM'
},
{
  id: 'rest-007',
  name: 'Sweet Tooth Atelier',
  slug: 'sweet-tooth-atelier',
  cuisines: ['Desserts'],
  rating: 4.5,
  reviewCount: 388,
  etaMin: 30,
  etaMax: 40,
  deliveryFee: 110,
  minOrder: 650,
  status: 'open',
  verified: false,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_117b3444a-1781529520450.png",
  alt: 'Slice of triple chocolate cake with ganache drizzle on a white ceramic plate',
  offer: 'Free brownie over Rs 2,000',
  priceTier: 2,
  zones: ['Gulberg III', 'DHA Phase 5', 'Model Town'],
  closesAt: '12:00 AM'
},
{
  id: 'rest-008',
  name: 'Haveli Karahi Point',
  slug: 'haveli-karahi-point',
  cuisines: ['Desi', 'BBQ & Grill'],
  rating: 4.5,
  reviewCount: 1043,
  etaMin: 40,
  etaMax: 50,
  deliveryFee: 160,
  minOrder: 1000,
  status: 'open',
  verified: true,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f8ec9bf2-1766515035445.png",
  alt: 'Copper karahi of spicy chicken curry topped with ginger julienne and green chilies',
  offer: 'Family karahi + 4 naan Rs 2,799',
  priceTier: 3,
  zones: ['Gulberg III', 'Cantt', 'Johar Town'],
  closesAt: '11:45 PM'
}];


export const recentlyViewed: Restaurant[] = [restaurants[2], restaurants[0], restaurants[4], restaurants[7]];

export const favoriteIds: string[] = ['rest-003', 'rest-006', 'rest-001'];

export const popularDishes: Dish[] = [
{
  id: 'dish-001',
  name: 'Double Smash Cheeseburger',
  restaurant: 'Smash House Burgers',
  restaurantSlug: 'smash-house-burgers',
  price: 1090,
  promoPrice: 890,
  image: "https://images.unsplash.com/photo-1709081629812-7e3ff8cdde3d",
  alt: 'Stacked double cheeseburger with lettuce, tomato and melted cheese on a toasted bun',
  rating: 4.8,
  orders: '1.2k ordered this week'
},
{
  id: 'dish-002',
  name: 'Chicken Dum Biryani (Full)',
  restaurant: 'Biryani Bazaar',
  restaurantSlug: 'biryani-bazaar',
  price: 1290,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_198c1d0ee-1772819685408.png",
  alt: 'Plated chicken dum biryani with saffron rice, tender chicken pieces and fresh coriander',
  rating: 4.6,
  orders: '940 ordered this week'
},
{
  id: 'dish-003',
  name: 'Mixed Seekh & Tikka Platter',
  restaurant: 'Bundu Khan Gulberg',
  restaurantSlug: 'bundu-khan-gulberg',
  price: 2450,
  promoPrice: 1960,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1856dc66f-1772282640067.png",
  alt: 'Charred seekh kebabs and chicken tikka pieces arranged on a platter with sliced onions and lemon',
  rating: 4.7,
  orders: '780 ordered this week'
},
{
  id: 'dish-004',
  name: 'Halwa Puri Nashta Set',
  restaurant: 'Nashta Nagar',
  restaurantSlug: 'nashta-nagar',
  price: 580,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f5ea877d-1772696988113.png",
  alt: 'Plate with puffed puris, semolina halwa and spiced chickpea curry',
  rating: 4.9,
  orders: '1.5k ordered this week'
},
{
  id: 'dish-005',
  name: 'Chicken Chow Mein',
  restaurant: 'Wok This Way',
  restaurantSlug: 'wok-this-way',
  price: 890,
  image: "https://images.unsplash.com/photo-1717100468259-460eeae8ab86",
  alt: 'Stir-fried chow mein noodles with chicken strips, cabbage and carrots in a white bowl',
  rating: 4.3,
  orders: '510 ordered this week'
},
{
  id: 'dish-006',
  name: 'Triple Chocolate Slice',
  restaurant: 'Sweet Tooth Atelier',
  restaurantSlug: 'sweet-tooth-atelier',
  price: 690,
  image: "https://images.unsplash.com/photo-1717250180897-653dc706dfd6",
  alt: 'Layered chocolate cake slice with glossy ganache and chocolate shavings',
  rating: 4.6,
  orders: '420 ordered this week'
}];


// ---- Restaurant menu (Smash House Burgers) ----

export const activeRestaurant: Restaurant = restaurants[2];

export const menuCategories: MenuCategory[] = [
{ id: 'cat-signature', label: 'Signature Smash' },
{ id: 'cat-chicken', label: 'Chicken & Crispy' },
{ id: 'cat-sides', label: 'Sides' },
{ id: 'cat-shakes', label: 'Shakes & Drinks' },
{ id: 'cat-combos', label: 'Combos & Family' },
{ id: 'cat-desserts', label: 'Desserts' }];


const sizeGroup: ModifierGroup = {
  id: 'mod-size',
  label: 'Choose patty size',
  required: true,
  multiple: false,
  options: [
  { id: 'size-single', label: 'Single (1 patty)', price: 0 },
  { id: 'size-double', label: 'Double (2 patties)', price: 280 },
  { id: 'size-triple', label: 'Triple (3 patties)', price: 520 }]

};

const extrasGroup: ModifierGroup = {
  id: 'mod-extras',
  label: 'Add extras',
  required: false,
  multiple: true,
  options: [
  { id: 'ext-cheese', label: 'Extra cheddar slice', price: 60 },
  { id: 'ext-bacon', label: 'Beef bacon strips', price: 150 },
  { id: 'ext-jalapeno', label: 'Pickled jalapeños', price: 40 },
  { id: 'ext-egg', label: 'Fried egg', price: 80 }]

};

const sauceGroup: ModifierGroup = {
  id: 'mod-sauce',
  label: 'Sauce on the side',
  required: false,
  multiple: false,
  options: [
  { id: 'sauce-none', label: 'No extra sauce', price: 0 },
  { id: 'sauce-smash', label: 'Smash house sauce', price: 40 },
  { id: 'sauce-chipotle', label: 'Chipotle mayo', price: 50 },
  { id: 'sauce-garlic', label: 'Garlic aioli', price: 50 }]

};

export const menuItems: MenuItem[] = [
{
  id: 'item-001',
  categoryId: 'cat-signature',
  name: 'Classic Smash Burger',
  description: 'Smashed beef patty, American cheese, pickles, caramelized onions and house sauce on a toasted potato bun.',
  price: 790,
  promoPrice: 690,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f278e1b1-1780757104914.png",
  alt: 'Classic smash burger with cheese and pickles on a toasted bun',
  dietary: [],
  allergens: ['Gluten', 'Dairy', 'Egg'],
  spice: 0,
  stock: 'in',
  modifiers: [sizeGroup, extrasGroup, sauceGroup],
  popular: true,
  serves: '1 person'
},
{
  id: 'item-002',
  categoryId: 'cat-signature',
  name: 'Double Smash Cheeseburger',
  description: 'Two crispy-edged beef patties, double cheddar, shredded lettuce and our tangy smash sauce.',
  price: 1090,
  promoPrice: 890,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1df1d1d84-1772617161795.png",
  alt: 'Double smash cheeseburger with lettuce and melted cheddar',
  dietary: [],
  allergens: ['Gluten', 'Dairy', 'Egg'],
  spice: 0,
  stock: 'low',
  stockLeft: 6,
  modifiers: [extrasGroup, sauceGroup],
  popular: true,
  serves: '1 person'
},
{
  id: 'item-003',
  categoryId: 'cat-signature',
  name: 'Jalapeño Inferno Smash',
  description: 'Pepper-jack, pickled jalapeños, crispy onion strings and chipotle mayo. Not for the faint of heart.',
  price: 950,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12d4035b1-1776767248130.png",
  alt: 'Spicy burger with jalapeños and crispy onion strings',
  dietary: [],
  allergens: ['Gluten', 'Dairy', 'Egg'],
  spice: 3,
  stock: 'in',
  modifiers: [sizeGroup, extrasGroup],
  serves: '1 person'
},
{
  id: 'item-004',
  categoryId: 'cat-signature',
  name: 'Mushroom Swiss Smash',
  description: 'Sautéed cremini mushrooms, melted Swiss cheese, garlic aioli and arugula.',
  price: 990,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1184213a4-1772350972886.png",
  alt: 'Burger topped with sautéed mushrooms and melted Swiss cheese',
  dietary: [],
  allergens: ['Gluten', 'Dairy', 'Egg'],
  spice: 0,
  stock: 'out',
  serves: '1 person'
},
{
  id: 'item-005',
  categoryId: 'cat-chicken',
  name: 'Crispy Chicken Stack',
  description: 'Buttermilk-brined fried chicken thigh, slaw, pickles and honey-chili drizzle.',
  price: 850,
  image: "https://images.unsplash.com/photo-1544120379-4428412e6568",
  alt: 'Crispy fried chicken sandwich with slaw and pickles',
  dietary: [],
  allergens: ['Gluten', 'Dairy', 'Egg'],
  spice: 1,
  stock: 'in',
  modifiers: [extrasGroup, sauceGroup],
  popular: true,
  serves: '1 person'
},
{
  id: 'item-006',
  categoryId: 'cat-chicken',
  name: 'Nashville Hot Tenders (5 pc)',
  description: 'Five hand-breaded tenders tossed in Nashville hot oil, served over white bread with pickles.',
  price: 920,
  image: "https://images.unsplash.com/photo-1454644003679-10c590efbaee",
  alt: 'Plate of golden fried chicken tenders with a spicy red glaze',
  dietary: [],
  allergens: ['Gluten', 'Egg'],
  spice: 3,
  stock: 'in',
  modifiers: [sauceGroup],
  serves: '1–2 people'
},
{
  id: 'item-007',
  categoryId: 'cat-chicken',
  name: 'Grilled Chicken Avocado Wrap',
  description: 'Lemon-herb grilled chicken, smashed avocado, tomato and baby spinach in a toasted tortilla.',
  price: 760,
  image: "https://images.unsplash.com/photo-1631329611305-b4600044f4ac",
  alt: 'Sliced grilled chicken wrap with avocado and spinach',
  dietary: ['Halal', 'High protein'],
  allergens: ['Gluten'],
  spice: 0,
  stock: 'in',
  serves: '1 person'
},
{
  id: 'item-008',
  categoryId: 'cat-sides',
  name: 'Loaded Smash Fries',
  description: 'Crinkle fries, cheddar sauce, beef crumble, jalapeños and scallions.',
  price: 590,
  promoPrice: 490,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_135eeb96f-1783430072778.png",
  alt: 'Crinkle fries loaded with cheese sauce and beef crumble',
  dietary: [],
  allergens: ['Dairy'],
  spice: 1,
  stock: 'in',
  serves: '2 people'
},
{
  id: 'item-009',
  categoryId: 'cat-sides',
  name: 'Sea Salt Fries',
  description: 'Skin-on fries tossed in sea salt and rosemary.',
  price: 290,
  image: "https://images.unsplash.com/photo-1695368830815-1b744ab89383",
  alt: 'Golden skin-on fries with sea salt in a paper cone',
  dietary: ['Vegetarian', 'Vegan'],
  allergens: [],
  spice: 0,
  stock: 'in',
  serves: '1 person'
},
{
  id: 'item-010',
  categoryId: 'cat-sides',
  name: 'Onion Ring Tower',
  description: 'Beer-battered onion rings stacked high with chipotle dip.',
  price: 420,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_44a86cc2a-1792003256274.png",
  alt: 'Stack of golden battered onion rings',
  dietary: ['Vegetarian'],
  allergens: ['Gluten', 'Egg'],
  spice: 0,
  stock: 'low',
  stockLeft: 4,
  serves: '2 people'
},
{
  id: 'item-011',
  categoryId: 'cat-shakes',
  name: 'Biscoff Cookie Shake',
  description: 'Thick vanilla shake blended with Biscoff biscuits and caramel.',
  price: 640,
  image: "https://images.unsplash.com/photo-1562164143-8a9f06b11f47",
  alt: 'Tall milkshake topped with whipped cream and cookie crumbles',
  dietary: ['Vegetarian'],
  allergens: ['Dairy', 'Gluten'],
  spice: 0,
  stock: 'in',
  serves: '1 person'
},
{
  id: 'item-012',
  categoryId: 'cat-shakes',
  name: 'Fresh Mint Lemonade',
  description: 'Hand-squeezed lemon, crushed mint and a pinch of black salt.',
  price: 260,
  image: "https://images.unsplash.com/photo-1620400081393-69907fa4e510",
  alt: 'Glass of mint lemonade with ice and lemon slice',
  dietary: ['Vegan'],
  allergens: [],
  spice: 0,
  stock: 'in',
  serves: '1 person'
},
{
  id: 'item-013',
  categoryId: 'cat-combos',
  name: 'Smash Duo Combo',
  description: '2 Classic Smash burgers, 2 sea salt fries and 2 soft drinks.',
  price: 2090,
  promoPrice: 1790,
  image: "https://images.unsplash.com/photo-1495208095434-958b3adee548",
  alt: 'Two burgers with fries and soft drinks arranged on a tray',
  dietary: [],
  allergens: ['Gluten', 'Dairy', 'Egg'],
  spice: 0,
  stock: 'in',
  popular: true,
  serves: '2 people'
},
{
  id: 'item-014',
  categoryId: 'cat-combos',
  name: 'Family Smash Box (4 burgers)',
  description: '4 Classic Smash burgers, large loaded fries, 10 onion rings and a 1.5L drink.',
  price: 4290,
  promoPrice: 3690,
  image: "https://images.unsplash.com/photo-1582675727516-43edb8707f40",
  alt: 'Box of four burgers with large fries and onion rings',
  dietary: [],
  allergens: ['Gluten', 'Dairy', 'Egg'],
  spice: 0,
  stock: 'low',
  stockLeft: 3,
  serves: '4 people'
},
{
  id: 'item-015',
  categoryId: 'cat-desserts',
  name: 'Molten Lava Brownie',
  description: 'Warm chocolate brownie with a gooey centre and vanilla scoop.',
  price: 520,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_189ae8736-1772618750697.png",
  alt: 'Warm chocolate brownie with a scoop of vanilla ice cream',
  dietary: ['Vegetarian'],
  allergens: ['Gluten', 'Dairy', 'Egg', 'Nuts'],
  spice: 0,
  stock: 'in',
  serves: '1 person'
},
{
  id: 'item-016',
  categoryId: 'cat-desserts',
  name: 'Cinnamon Churro Bites',
  description: 'Crisp churro bites rolled in cinnamon sugar with dulce de leche dip.',
  price: 380,
  image: "https://images.unsplash.com/photo-1618090340881-03691f2dfdcb",
  alt: 'Cinnamon churro bites with a dipping cup of caramel',
  dietary: ['Vegetarian'],
  allergens: ['Gluten', 'Dairy', 'Egg'],
  spice: 0,
  stock: 'in',
  serves: '1–2 people'
}];


export const offers: Offer[] = [
{
  id: 'offer-001',
  title: 'Buy 1 Get 1 on Classics',
  description: 'Order any Classic Smash and get a second one free. Auto-applied at checkout.',
  expiresIn: 'Ends in 2h 14m',
  tone: 'primary'
},
{
  id: 'offer-002',
  title: 'Rs 300 off over Rs 2,500',
  description: 'Use code SMASH300 on orders above Rs 2,500. One use per customer.',
  code: 'SMASH300',
  minSpend: 2500,
  expiresIn: 'Ends Sunday',
  tone: 'accent'
},
{
  id: 'offer-003',
  title: 'Free fries with combos',
  description: 'Every combo includes one free sea salt fries portion this week.',
  expiresIn: 'Ends in 3 days',
  tone: 'warning'
}];


export const addresses: Address[] = [
{
  id: 'addr-001',
  label: 'Home',
  line: 'House 24-B, Street 7, Gulberg III',
  area: 'Gulberg III, Lahore',
  note: 'Blue gate, ring the bell twice',
  isDefault: true
},
{
  id: 'addr-002',
  label: 'Office',
  line: 'Floor 4, Arfa Software Tower, Ferozepur Road',
  area: 'Gulberg II, Lahore',
  note: 'Call on arrival, reception will escort',
  isDefault: false
},
{
  id: 'addr-003',
  label: "Ammi's House",
  line: '112 C Block, Model Town',
  area: 'Model Town, Lahore',
  note: '',
  isDefault: false
}];


export const paymentMethods: PaymentMethod[] = [
{
  id: 'pay-cod',
  type: 'cod',
  label: 'Cash on delivery',
  detail: 'Pay the restaurant in cash when your order arrives',
  available: true
},
{
  id: 'pay-card',
  type: 'card',
  label: 'Visa ending 4821',
  detail: 'Expires 09/28 · Authorised after the restaurant accepts',
  available: true
},
{
  id: 'pay-wallet',
  type: 'wallet',
  label: 'JazzCash wallet',
  detail: 'Not supported by this restaurant yet',
  available: false,
  unavailableReason: 'Smash House Burgers has not enabled wallet payments'
}];


export const coupons: Coupon[] = [
{
  code: 'SMASH300',
  kind: 'fixed',
  value: 300,
  minSpend: 2500,
  description: 'Rs 300 off orders above Rs 2,500'
},
{
  code: 'BITE10',
  kind: 'percent',
  value: 10,
  maxDiscount: 250,
  minSpend: 1000,
  description: '10% off, up to Rs 250, on orders above Rs 1,000'
},
{
  code: 'WELCOME150',
  kind: 'fixed',
  value: 150,
  minSpend: 700,
  description: 'Rs 150 off your next order above Rs 700'
}];


export function formatPKR(amount: number): string {
  const rounded = Math.round(amount);
  return `Rs ${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}