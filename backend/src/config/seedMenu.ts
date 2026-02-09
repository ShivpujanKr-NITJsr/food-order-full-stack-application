import MenuItem from '../models/MenuItem';

export const seedMenu = async () => {
  const count = await MenuItem.countDocuments();

  if (count > 0) {
    console.log('Menu already exists');
    return;
  }

  //   await MenuItem.insertMany([
  //     {
  //       name: 'Pizza',
  //       description: 'Cheese Pizza',
  //       price: 199,
  //       image: 'https://via.placeholder.com/150',
  //     },
  //     {
  //       name: 'Burger',
  //       description: 'Veg Burger',
  //       price: 99,
  //       image: 'https://via.placeholder.com/150',
  //     },
  //     {
  //       name: 'Pasta',
  //       description: 'White Sauce Pasta',
  //       price: 149,
  //       image: 'https://via.placeholder.com/150',
  //     },
  //   ]);

  //   await MenuItem.deleteMany({});

  await MenuItem.insertMany([
    // {
    //   name: 'Pizza',
    //   description: 'Delicious cheese pizza',
    //   price: 199,
    //   image:
    //     'https://images.unsplash.com/photo-1601924582975-7e9f5f6b6b22?auto=format&fit=crop&w=800&q=80',
    // },
    {
      name: 'Burger',
      description: 'Juicy veg burger',
      price: 129,
      image:
        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Pasta',
      description: 'Creamy pasta',
      price: 179,
      image:
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Sandwich',
      description: 'Fresh sandwich',
      price: 99,
      image:
        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'French Fries',
      description: 'Crispy fries',
      price: 89,
      image:
        'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80',
    },
  ]);

  console.log('Menu seeded successfully');
};
