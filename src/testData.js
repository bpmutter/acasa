
const ben = {
  first_name: "Homer",
  last_name: "Simpson",
  date_added: new Date(),
  profile_picture:
    "https://okdiario.com/img/2019/09/05/mejores-frases-de-homer-simpson-655x368.jpg",
  location: {
    city: "Medellin",
    country: "Colombia",
  },
  contact: {
    email: "ben@perlmutter.io",
    phone: "+1 (914) 589-5304",
    website: "https://ben.perlmutter.io",
    whatsapp: "+1 (914) 589-5304",
  },
  bio: `I’m a passionate software developer with an entrepreneurial and product-oriented mindset. I have experience building web applications with the MERN stack, Flask, Postgres and more. I love transforming an idea into a plan, and that plan into an application. Software development isn't just a job for me, but a vocation—it's my creative outlet and a way to add value to the world. I like to write words in addition to code. Check out my recent writings here: https://ben.perlmutter.io/blog`,
  languages: ["english", "spanish"],
  listings: [],
};

const listing1 = {
  active: true,
  title: "1 bedroom 2nd floor walkup in Laureles",
  primary_img:
    "https://pix10.agoda.net/hotelImages/167/167577/167577_15020322560025067789.jpg?s=1024x768",
  additional_imgs: [
    "https://r-cf.bstatic.com/images/hotel/max1024x768/365/36548015.jpg",
    "https://cdn.decoist.com/wp-content/uploads/2017/03/Modern-apartment-units-inside-heritage-building-Down-Under.jpg",
  ],
  amenities: ["hot water"],
  wifi_speed: 50,
  bathrooms: 1,
  bedrooms: 1,
  beds: 1,
  max_guests: 2,
  roommates: 2,
  price_in_dollars: 500,
  lgbtq_friendly: true,
  created_at: new Date(),
  updated_at: new Date(),
  dates_available: [
    {
      start: new Date(),
      end: null,
    },
  ],
  description: "best apartment round town",
  living_with_host: false,
  type: "apartment",
  location: {
    address: "124 Jefferson Place",
    neighborhood: "Laureles",
    city: "Medellin",
    state_province: "Antioquia",
    country: "Colombia",
    description:
      "in the barrio de laureles right near some high quality tiendas and la 70",
    geo: [0, 0],
  },
  owner: {
    username: "ben",
    first_name: "Ben",
    last_name: "Perlmutter",
    profile_picture:
      "https://avatars0.githubusercontent.com/u/57849986?s=400&u=8897665d835d70b9b506b44e525eebcf0de3053e&v=4",
  },
  payment_methods: ["cash", "Paypal", "Bitcoin"],
  pets: ["cat", "dog"],
  rules: ["overnight guests allowed", "no parties", "quiet after 10"],
};

const listing2 = listing1;
const listing3 = listing1;
const listings = [listing1, listing2, listing3]

const exports = {
    ben,
    listings
}
export default exports