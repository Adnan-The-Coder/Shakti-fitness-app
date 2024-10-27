import Image from 'next/image';
import React, { useState, useEffect } from 'react';

type Video = {
  id: number;
  title: string;
  url: string;
};

type Recipe = {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  author: string;
};

const Learning = () => {
  const videos: Video[] = [
    { id: 1, title: "10-Minute Full Body Home Workout", url: "https://www.youtube.com/embed/ml6cT4AZdqI" },
    { id: 2, title: "Mental Health Toolkit: Tools to Bolster Your Mood", url: "https://www.youtube.com/embed/CJIXbibQ0jI?si=cNMr1phBn2rpo7fN" },
    { id: 3, title: "Yoga for Beginners - 20 Minute Home Workout", url: "https://www.youtube.com/embed/v7AYKMP6rOE" },
    { id: 4, title: "Fat-Burning Cardio Workout", url: "https://www.youtube.com/embed/UBMk30rjy0o" },
    { id: 5, title: "Quick & Healthy Breakfast Ideas", url: "https://www.youtube.com/embed/d3qOoYZppaQ?si=EusvqyH8UXMtlm4P" },
    { id: 6, title: "David Laid: Transformation", url: "https://www.youtube.com/embed/n-uWtKO6JDo?si=lhy1eS-sQCX47ong" },
    { id: 7, title: "30-Minute Dumbbell Workout for Strength", url: "https://www.youtube.com/embed/XxuRSjER3Qk?si=U2t1F4AaCkjIc7b8" },
  ];

  const recipes: Recipe[] = [
    {
      id: 1,
      title: "Avocado Toast with Poached Egg",
      url: "https://www.eatright.org/food/planning-and-prep/recipes/avocado-toast",
      imageUrl: "https://img.icons8.com/?size=100&id=9Dv8Wi1vh0yp&format=png&color=000000",
      author: "EatRight",
    },
    {
      id: 2,
      title: "Detoxifying Green Smoothie",
      url: "https://www.healthline.com/nutrition/green-smoothie",
      imageUrl: "https://img.icons8.com/?size=100&id=33D0duL8XcoA&format=png&color=000000",
      author: "Healthline",
    },
    {
      id: 3,
      title: "Mediterranean Quinoa Salad",
      url: "https://www.bbcgoodfood.com/recipes/quinoa-salad",
      imageUrl: "https://img.icons8.com/?size=100&id=naNmza0RrDDM&format=png&color=000000",
      author: "BBC Good Food",
    },
  ];

  const [mainVideo, setMainVideo] = useState<Video>(videos[0]);
  const [otherVideos, setOtherVideos] = useState<Video[]>(videos.slice(1));
  const [randomRecipes, setRandomRecipes] = useState<Recipe[]>([]);

  const handleVideoClick = (selectedVideo: Video) => {
    setMainVideo(selectedVideo);
    setOtherVideos(videos.filter((video) => video.id !== selectedVideo.id));
  };

  const getRandomRecipes = () => {
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  useEffect(() => {
    setRandomRecipes(getRandomRecipes());
  }, []);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100">
      <section className="w-full md:w-4/4 lg:w-4/4 p-4">
        <div className="rounded-lg overflow-hidden shadow-lg bg-white mb-6">
          <iframe
            className="w-full h-64 md:h-96"
            src={mainVideo.url}
            title={mainVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            allowFullScreen
          ></iframe>
          <div className="p-4">
            <h2 className="text-xl font-bold">{mainVideo.title}</h2>
            <p className="text-gray-500">Health and Fitness Content</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">More Videos Like This</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white p-2 rounded-lg shadow cursor-pointer"
                onClick={() => handleVideoClick(video)}
              >
                <iframe
                  className="w-full h-40"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                  allowFullScreen
                ></iframe>
                <p className="mt-2 font-semibold text-sm">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <aside className="w-full md:w-3/4 lg:w-1/4 md:pl-6 mt-6 md:mt-0 md:hidden xl:block" >
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <h3 className="p-4 font-semibold text-lg border-b">Articles</h3>
          <ul className="divide-y">
            <li className="p-4 text-sm">
              <a href="https://www.healthline.com/nutrition/meal-prep-ideas" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#ff4f2b]">
                "5 Easy Meal Prep Ideas for Beginners"
              </a>
              <p className="text-gray-500">by HealthHub • 2.3K Views</p>
            </li>
            <li className="p-4 text-sm">
              <a href="https://www.verywellfit.com/benefits-of-exercise-4157124" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#ff4f2b]">
                "Top 10 Benefits of Regular Exercise"
              </a>
              <p className="text-gray-500">by FitLife • 1.7K Views</p>
            </li>
            <li className="p-4 text-sm">
              <a href="https://www.yogajournal.com/poses/yoga-for-flexibility" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#ff4f2b]">
                "How to Improve Flexibility with Yoga"
              </a>
              <p className="text-gray-500">by YogaJournal • 1.2K Views</p>
            </li>
            <li className="p-4 text-sm">
              <a href="https://www.shape.com/fitness/workouts/best-cardio-exercises" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#ff4f2b]">
                "Cardio Exercises to Burn Fat Fast"
              </a>
              <p className="text-gray-500">by ShapeFit • 1.8K Views</p>
            </li>
            <li className="p-4 text-sm">
              <a href="https://www.menshealth.com/fitness/g19547441/strength-training-tips/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#ff4f2b]">
                "Essential Strength Training Tips"
              </a>
              <p className="text-gray-500">by StrongNation • 2.0K Views</p>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-lg md:hidden xl:block">
          <h3 className="p-4 font-semibold text-lg border-b">Healthy Recipes</h3>
          <ul className="divide-y">
            {randomRecipes.map((recipe) => (
              <li key={recipe.id} className="p-4 flex items-center text-sm">
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="rounded-full mr-3 bg-gray-300"
                  width={40}
                  height={40}
                />
                <div>
                  <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#ff4f2b]">
                    {recipe.title}
                  </a>
                  <p className="text-gray-500">by {recipe.author}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Learning;