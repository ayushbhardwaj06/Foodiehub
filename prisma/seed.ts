import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // Create or update a demo user
    const chefMario = await prisma.user.upsert({
        where: { email: 'mario@example.com' },
        update: {},
        create: {
            email: 'mario@example.com',
            name: 'Chef Mario',
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mario',
        },
    })

    const chefLuigi = await prisma.user.upsert({
        where: { email: 'luigi@example.com' },
        update: {},
        create: {
            email: 'luigi@example.com',
            name: 'Chef Luigi',
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luigi',
        },
    })

    // Recipes data
    const recipes = [
        {
            name: 'Classic Margherita Pizza',
            ingredients: ['Pizza Dough', 'Tomato Sauce', 'Fresh Mozzarella', 'Basil Leaves', 'Olive Oil'],
            instructions: [
                'Preheat oven to 450°F (230°C).',
                'Roll out the dough.',
                'Spread tomato sauce over the dough.',
                'Top with mozzarella slices.',
                'Bake for 10-12 minutes until crust is golden.',
                'Garnish with fresh basil and a drizzle of olive oil.'
            ],
            prepTimeMinutes: 20,
            cookTimeMinutes: 15,
            servings: 4,
            difficulty: 'Easy',
            cuisine: 'Italian',
            caloriesPerServing: 300,
            tags: ['Pizza', 'Italian', 'Vegetarian', 'Dinner'],
            image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069',
            rating: 4.8,
            reviewCount: 120,
            mealType: ['Dinner'],
            userId: chefMario.id,
        },
        {
            name: 'Spaghetti Carbonara',
            ingredients: ['Spaghetti', 'Eggs', 'Pecorino Romano', 'Guanciale', 'Black Pepper'],
            instructions: [
                'Boil pasta in salted water.',
                'Fry guanciale until crispy.',
                'Whisk eggs and cheese together.',
                'Toss hot pasta with guanciale fat and egg mixture off heat.',
                'Serve with extra cheese and pepper.'
            ],
            prepTimeMinutes: 15,
            cookTimeMinutes: 15,
            servings: 2,
            difficulty: 'Medium',
            cuisine: 'Italian',
            caloriesPerServing: 650,
            tags: ['Pasta', 'Italian', 'Comfort Food'],
            image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2071',
            rating: 4.9,
            reviewCount: 85,
            mealType: ['Dinner', 'Lunch'],
            userId: chefMario.id,
        },
        {
            name: 'Chicken Tikka Masala',
            ingredients: ['Chicken Breast', 'Yogurt', 'Tomato Puree', 'Cream', 'Spices (Cumin, Coriander, Garam Masala)'],
            instructions: [
                'Marinate chicken in yogurt and spices.',
                'Grill or bake chicken pieces.',
                'Prepare the sauce with tomatoes and cream.',
                'Simmer chicken in the sauce.',
                'Serve with rice or naan.'
            ],
            prepTimeMinutes: 30,
            cookTimeMinutes: 40,
            servings: 4,
            difficulty: 'Hard',
            cuisine: 'Indian',
            caloriesPerServing: 500,
            tags: ['Curry', 'Indian', 'Spicy', 'Dinner'],
            image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2071',
            rating: 4.7,
            reviewCount: 200,
            mealType: ['Dinner'],
            userId: chefLuigi.id,
        },
        {
            name: 'Avocado Toast',
            ingredients: ['Sourdough Bread', 'Ripe Avocado', 'Lemon Juice', 'Chili Flakes', 'Salt'],
            instructions: [
                'Toast the bread.',
                'Mash avocado with lemon juice and salt.',
                'Spread on toast.',
                'Sprinkle with chili flakes.'
            ],
            prepTimeMinutes: 5,
            cookTimeMinutes: 5,
            servings: 1,
            difficulty: 'Easy',
            cuisine: 'American',
            caloriesPerServing: 250,
            tags: ['Breakfast', 'Healthy', 'Vegetarian', 'Quick'],
            image: 'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?q=80&w=1974',
            rating: 4.5,
            reviewCount: 50,
            mealType: ['Breakfast'],
            userId: chefLuigi.id,
        },
        {
            name: 'Beef Tacos',
            ingredients: ['Corn Tortillas', 'Ground Beef', 'Onion', 'Cilantro', 'Lime', 'Salsa'],
            instructions: [
                'Cook ground beef with spices.',
                'Warm tortillas.',
                'Assemble tacos with beef and toppings.',
                'Serve with lime wedges.'
            ],
            prepTimeMinutes: 15,
            cookTimeMinutes: 15,
            servings: 3,
            difficulty: 'Easy',
            cuisine: 'Mexican',
            caloriesPerServing: 400,
            tags: ['Tacos', 'Mexican', 'Street Food', 'Dinner'],
            image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=2070',
            rating: 4.6,
            reviewCount: 95,
            mealType: ['Dinner'],
            userId: chefMario.id,
        },
        {
            name: 'Sushi Roll Platter',
            ingredients: ['Sushi Rice', 'Nori', 'Fresh Fish (Salmon, Tuna)', 'Cucumber', 'Avocado'],
            instructions: [
                'Cook sushi rice and season with vinegar.',
                'Place nori on bamboo mat.',
                'Spread rice and fillings.',
                'Roll tightly and slice.'
            ],
            prepTimeMinutes: 45,
            cookTimeMinutes: 30,
            servings: 2,
            difficulty: 'Hard',
            cuisine: 'Japanese',
            caloriesPerServing: 350,
            tags: ['Sushi', 'Japanese', 'Seafood', 'Dinner'],
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070',
            rating: 4.9,
            reviewCount: 150,
            mealType: ['Dinner'],
            userId: chefLuigi.id,
        }
    ]

    for (const recipe of recipes) {
        await prisma.recipe.create({
            data: recipe,
        })
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
