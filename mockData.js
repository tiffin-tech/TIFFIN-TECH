const vendors = [
  {
    id: 1,
    name: "Mama's Kitchen",
    description: "Home-style meals with love and care since 2010",
    isVeg: false,
    priceFull: 2500,
    priceHalf: 1400,
    rating: 4.5,
    deliveryAreas: ["Campus North", "Hostel Zone", "Tech Park"],
    menu: [
      { day: "Monday", lunch: "Roti, Dal, Rice, Paneer Sabzi", dinner: "Roti, Rice, Mix Veg, Salad" },
      { day: "Tuesday", lunch: "Roti, Chole, Rice, Salad", dinner: "Roti, Rice, Dal, Bhindi Sabzi" },
      { day: "Wednesday", lunch: "Roti, Rajma, Rice, Salad", dinner: "Roti, Rice, Matar Paneer, Raita" },
      { day: "Thursday", lunch: "Roti, Kadhi, Rice, Salad", dinner: "Roti, Rice, Aloo Gobhi, Papad" },
      { day: "Friday", lunch: "Roti, Chana Masala, Rice, Salad", dinner: "Biryani, Raita, Salad" },
      { day: "Saturday", lunch: "Roti, Dal Makhani, Rice, Salad", dinner: "Roti, Rice, Butter Chicken, Naan" },
      { day: "Sunday", lunch: "Special Thali", dinner: "Special Thali" }
    ],
    reviews: [
      { user: "Rahul S.", rating: 5, comment: "Best food around campus! Always fresh and tasty." },
      { user: "Priya M.", rating: 4, comment: "Good quality food, reasonable prices." },
      { user: "Amit K.", rating: 4.5, comment: "Consistently good meals throughout the week." }
    ]
  },
  {
    id: 2,
    name: "Green Bite",
    description: "100% organic and vegetarian meals for health-conscious students",
    isVeg: true,
    priceFull: 2200,
    priceHalf: 1200,
    rating: 4.2,
    deliveryAreas: ["Campus South", "Hostel Zone", "Residential Area"],
    menu: [
      { day: "Monday", lunch: "Roti, Dal, Rice, Lauki Sabzi", dinner: "Roti, Rice, Mix Veg, Salad" },
      { day: "Tuesday", lunch: "Roti, Chole, Rice, Salad", dinner: "Roti, Rice, Dal, Tinda Sabzi" },
      { day: "Wednesday", lunch: "Roti, Rajma, Rice, Salad", dinner: "Roti, Rice, Paneer Sabzi, Raita" },
      { day: "Thursday", lunch: "Roti, Kadhi, Rice, Salad", dinner: "Roti, Rice, Aloo Matar, Papad" },
      { day: "Friday", lunch: "Roti, Chana Masala, Rice, Salad", dinner: "Veg Biryani, Raita, Salad" },
      { day: "Saturday", lunch: "Roti, Dal Makhani, Rice, Salad", dinner: "Roti, Rice, Malai Kofta, Naan" },
      { day: "Sunday", lunch: "Special Thali", dinner: "Special Thali" }
    ],
    reviews: [
      { user: "Neha P.", rating: 4.5, comment: "Love their healthy options!" },
      { user: "Vikram R.", rating: 4, comment: "Good vegetarian food, never oily." },
      { user: "Sonia T.", rating: 4, comment: "Fresh ingredients and consistent quality." }
    ]
  },
  {
    id: 3,
    name: "Spice Delight",
    description: "Authentic North Indian flavors with a homely touch",
    isVeg: false,
    priceFull: 2700,
    priceHalf: 1500,
    rating: 4.7,
    deliveryAreas: ["Campus North", "Campus South", "Hostel Zone"],
    menu: [
      { day: "Monday", lunch: "Roti, Dal, Rice, Paneer Butter Masala", dinner: "Roti, Rice, Mix Veg, Salad" },
      { day: "Tuesday", lunch: "Roti, Chole, Rice, Salad", dinner: "Roti, Rice, Dal, Bhindi Masala" },
      { day: "Wednesday", lunch: "Roti, Rajma, Rice, Salad", dinner: "Roti, Rice, Kadhai Paneer, Raita" },
      { day: "Thursday", lunch: "Roti, Kadhi, Rice, Salad", dinner: "Roti, Rice, Aloo Jeera, Papad" },
      { day: "Friday", lunch: "Roti, Chana Masala, Rice, Salad", dinner: "Chicken Biryani, Raita, Salad" },
      { day: "Saturday", lunch: "Roti, Dal Makhani, Rice, Salad", dinner: "Roti, Rice, Butter Chicken, Naan" },
      { day: "Sunday", lunch: "Special Thali", dinner: "Special Thali" }
    ],
    reviews: [
      { user: "Arjun M.", rating: 5, comment: "Best non-veg options around!" },
      { user: "Divya S.", rating: 4.5, comment: "Worth every penny. Delicious food!" },
      { user: "Karan P.", rating: 5, comment: "Their butter chicken is to die for!" }
    ]
  },
  {
    id: 4,
    name: "Quick Bites",
    description: "Fast, delicious and affordable meals for busy students",
    isVeg: false,
    priceFull: 2000,
    priceHalf: 1100,
    rating: 3.9,
    deliveryAreas: ["Campus North", "Tech Park"],
    menu: [
      { day: "Monday", lunch: "Roti, Dal, Rice, Aloo Sabzi", dinner: "Roti, Rice, Mix Veg, Salad" },
      { day: "Tuesday", lunch: "Roti, Chole, Rice, Salad", dinner: "Roti, Rice, Dal, Baingan Sabzi" },
      { day: "Wednesday", lunch: "Roti, Rajma, Rice, Salad", dinner: "Roti, Rice, Paneer Sabzi, Raita" },
      { day: "Thursday", lunch: "Roti, Kadhi, Rice, Salad", dinner: "Roti, Rice, Aloo Gobhi, Papad" },
      { day: "Friday", lunch: "Roti, Chana Masala, Rice, Salad", dinner: "Biryani, Raita, Salad" },
      { day: "Saturday", lunch: "Roti, Dal, Rice, Salad", dinner: "Roti, Rice, Chicken Curry, Naan" },
      { day: "Sunday", lunch: "Special Thali", dinner: "Special Thali" }
    ],
    reviews: [
      { user: "Ravi K.", rating: 4, comment: "Good for the price." },
      { user: "Anjali M.", rating: 3.5, comment: "Decent food when you're on a budget." },
      { user: "Sanjay P.", rating: 4, comment: "Quick delivery and consistent taste." }
    ]
  }
];

// For vendor details page, we'll use URL parameters to get vendor ID
function getVendorById(id) {
  return vendors.find(vendor => vendor.id === parseInt(id));
}