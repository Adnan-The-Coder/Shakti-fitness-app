import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaSearch, FaHeart, FaLeaf, FaUtensils } from 'react-icons/fa';
import toast from 'react-hot-toast';

ChartJS.register(ArcElement, Tooltip, Legend);
interface Meal {
  name: string;
  kcal: number;
}

const Meals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietPlan, setDietPlan] = useState('Normal Diet');
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]); 

  const mealsData: Meal[] = [
    { name: 'Sandwich', kcal: 150 },
    { name: 'Egg', kcal: 78 },
    { name: 'Biryani', kcal: 271},
    { name: 'Vegetables', kcal: 50 },
    { name: 'Bread', kcal: 120 },
    { name: 'Oatmeal', kcal: 150 },
    { name: 'Smoothie', kcal: 200 },
    { name: 'Chicken Salad', kcal: 250 },
    { name: 'Pasta', kcal: 400 },
    { name: 'Apple', kcal: 95 },
    { name: 'Banana', kcal: 105 },
    { name: 'Yogurt', kcal: 110 },
    { name: 'Rice', kcal: 206 },
    { name: 'Grilled Fish', kcal: 220 },
    { name: 'Quinoa', kcal: 222 },
    { name: 'Tofu Stir Fry', kcal: 300 },
    { name: 'Peanut Butter', kcal: 588 },
    { name: 'Cheeseburger', kcal: 303 },
    { name: 'Chocolate Bar', kcal: 215 },
    { name: 'Caesar Salad', kcal: 350 },
    { name: 'Baked Salmon', kcal: 367 },
    { name: 'French Fries', kcal: 365 },
    { name: 'Pancakes', kcal: 350 },
    { name: 'Granola', kcal: 200 },
    { name: 'Chickpeas', kcal: 164 },
    { name: 'Lentil Soup', kcal: 180 },
    { name: 'Sushi', kcal: 300 },
    { name: 'Burrito', kcal: 500 },
    { name: 'Cottage Cheese', kcal: 206 },
    { name: 'Hummus', kcal: 166 },
    { name: 'Pita Bread', kcal: 170 },
    { name: 'Muffin', kcal: 400 },
    { name: 'Tacos', kcal: 300 },
    { name: 'Spinach Salad', kcal: 150 },
    { name: 'Zucchini Noodles', kcal: 33 },
    { name: 'Cucumber Slices', kcal: 16 },
    { name: 'Popcorn', kcal: 31 },
    { name: 'Ice Cream', kcal: 207 },
    { name: 'Cheese Slice', kcal: 113 },
    { name: 'Avocado Toast', kcal: 240 },
    { name: 'Green Smoothie', kcal: 180 },
    { name: 'Fruit Salad', kcal: 80 },
    { name: 'Beef Stir Fry', kcal: 400 },
    { name: 'Vegetable Soup', kcal: 100 },
    { name: 'Rice Bowl', kcal: 350 },
    { name: 'Meatballs', kcal: 250 },
    { name: 'Fried Chicken', kcal: 400 },
    { name: 'Stuffed Peppers', kcal: 220 },
    { name: 'Potato Salad', kcal: 240 },
    { name: 'Tomato Soup', kcal: 90 },
    { name: 'Shrimp Tacos', kcal: 260 },
    { name: 'Vegetable Stir Fry', kcal: 120 },
    { name: 'Bagel with Cream Cheese', kcal: 320 },
    { name: 'Chili', kcal: 350 },
    { name: 'Cobb Salad', kcal: 420 },
    { name: 'Falafel', kcal: 400 },
    { name: 'Tuna Salad', kcal: 200 },
    { name: 'Peach', kcal: 68 },
    { name: 'Pineapple', kcal: 82 },
    { name: 'Kale Salad', kcal: 150 },
    { name: 'Baked Potato', kcal: 161 },
    { name: 'Tuna Wrap', kcal: 290 },
    { name: 'Pasta Salad', kcal: 220 },
    { name: 'Chili Cheese Fries', kcal: 450 },
    { name: 'Granola Bar', kcal: 100 },
    { name: 'Rice Cakes', kcal: 35 },
    { name: 'Chicken Quesadilla', kcal: 350 },
    { name: 'Egg Salad', kcal: 210 },
    { name: 'Minestrone Soup', kcal: 150 },
    { name: 'Buffalo Wings', kcal: 300 },
    { name: 'Carrot Sticks', kcal: 41 },
    { name: 'Greek Salad', kcal: 200 },
    { name: 'Churros', kcal: 280 },
    { name: 'Baked Ziti', kcal: 400 },
    { name: 'Beef Tacos', kcal: 320 },
    { name: 'Cereal', kcal: 150 },
    { name: 'Coconut Water', kcal: 46 },
  ];
  

  const mealSuggestions: Meal[] = [
    { name: 'Salad', kcal: 120 },
    { name: 'Smoothie', kcal: 200 },
    { name: 'Chicken Breast', kcal: 165 },
    { name: 'Rice Bowl', kcal: 350 },
    { name: 'Fruit Salad', kcal: 80 },
  ];
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = mealsData.filter(meal =>
        meal.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMeals(filtered);
    } else {
      setFilteredMeals([]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchInitiated(true); 
    toast.success(`Searching for "${searchQuery}"...`);
  };

  const calorieData = {
    labels: ['Consumed', 'Remaining'],
    datasets: [
      {
        data: [2232, 1081],
        backgroundColor: ['#FF6B6B', '#E9ECEF'],
        borderColor: ['#FF6B6B', '#E9ECEF'],
        borderWidth: 1,
      },
    ],
  };

  const macroData = {
    labels: ['Carbs', 'Proteins', 'Fats'],
    datasets: [
      {
        label: 'Macronutrients',
        data: [324, 97, 50],
        backgroundColor: ['#FFD93D', '#6A0572', '#0DCAF0'],
      },
    ],
  };

  const dietPlans = [
    { name: 'Normal Diet', description: 'Balanced intake for overall health', icon: <FaUtensils />, image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'Flexitarian Diet', description: 'Primarily plant-based with occasional meat', icon: <FaLeaf />, image: 'https://images.pexels.com/photos/6805053/pexels-photo-6805053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'Volumetric Diet', description: 'Low-calorie, high-volume foods for satiety', icon: <FaHeart />, image: 'https://images.pexels.com/photos/29060268/pexels-photo-29060268/free-photo-of-fresh-salad-bar-with-colorful-vegetable-selection.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  ];

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-orange-600 mb-4">Choose a Diet Plan</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {dietPlans.map((plan, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
              <img src={plan.image} alt={plan.name} width={300} height={200} className="rounded-md object-cover w-full h-32 sm:h-40" />
              <div className="flex items-center mt-4">
                {plan.icon}
                <h2 className="ml-2 font-semibold text-lg">{plan.name}</h2>
              </div>
              <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
              <button
                className="mt-4 w-full bg-[#ff4f2b] text-white py-2 px-4 rounded hover:bg-orange-600"
                onClick={() => setDietPlan(plan.name)}
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Your {dietPlan} Progress</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Calorie Consumption</h3>
            <Doughnut data={calorieData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Macronutrient Breakdown</h3>
            <Doughnut data={macroData} />
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex items-center bg-white p-4 rounded-lg shadow-lg mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for foods..."
            className="flex-1 p-2 border-0 focus:outline-none text-gray-700"
          />
          <button type="submit" className="text-[#ff4f2b] p-2">
            <FaSearch size={20} />
          </button>
        </form>

        {searchQuery && (
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMeals.length > 0 ? (
                filteredMeals.map((meal, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>{meal.name}</span>
                    <span className="text-gray-600 text-sm">1 Serving</span>
                    <span className="text-gray-600 text-sm">{meal.kcal} kcal</span>
                    <button className="text-orange-500 hover:text-orange-600">
                      <FaUtensils size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No results found.</p>
              )}
            </div>
          </div>
        )}

        {searchQuery === '' && (
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Suggested Meals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mealSuggestions.map((meal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>{meal.name}</span>
                  <span className="text-gray-600 text-sm">{meal.kcal} kcal</span>
                  <button className="text-[#ff4f2b]">
                    <FaUtensils size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meals;