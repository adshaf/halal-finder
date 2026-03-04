"use client";

import { useState } from 'react';
import { Search, MapPin, Star, Clock, DollarSign, Filter } from 'lucide-react';

export default function SearchResults() {
    const [selectedFilters, setSelectedFilters] = useState({
        cuisine: [],
        priceRange: [],
        rating: 0,
        openNow: false
    });


    // Create a separate centralised mock API for mock data and remove restaurants below
    const restaurants = [
        { id: 1, name: "Al-Noor Restaurant", cuisine: "Middle Eastern", rating: 4.5, price: "$$", distance: "0.5 km", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400", lat: -33.8688, lng: 151.2093 },
        { id: 2, name: "Istanbul Grill", cuisine: "Turkish", rating: 4.8, price: "$$$", distance: "1.2 km", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400", lat: -33.8700, lng: 151.2100 },
        { id: 3, name: "Saffron Indian", cuisine: "Indian", rating: 4.3, price: "$$", distance: "0.8 km", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400", lat: -33.8680, lng: 151.2080 },
        { id: 4, name: "Bangkok Halal", cuisine: "Thai", rating: 4.6, price: "$$", distance: "1.5 km", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400", lat: -33.8710, lng: 151.2110 },
        { id: 5, name: "Marrakech Cafe", cuisine: "Moroccan", rating: 4.4, price: "$$$", distance: "2.0 km", image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400", lat: -33.8665, lng: 151.2070 },
        { id: 6, name: "Lahore Karahi", cuisine: "Pakistani", rating: 4.7, price: "$", distance: "1.8 km", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400", lat: -33.8695, lng: 151.2105 },
    ];
    
    return (
        <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <span className="text-gray-800 font-semibold text-xl">Halal Finder</span>
        </div>
        
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search restaurants..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-emerald-500 transition px-4 py-2">
            Login
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition">
            Register
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Side Panel - Filters */}
        <aside className="w-80 bg-white shadow-md p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Filter className="mr-2" size={20} />
              Filters
            </h2>
            <button className="text-sm text-emerald-600 hover:text-emerald-700">
              Clear All
            </button>
          </div>

          {/* Cuisine Type */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Cuisine Type</h3>
            {['Middle Eastern', 'Turkish', 'Indian', 'Pakistani', 'Thai', 'Moroccan'].map(cuisine => (
              <label key={cuisine} className="flex items-center mb-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-emerald-500 rounded" />
                <span className="ml-2 text-gray-600">{cuisine}</span>
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
            {['$', '$$', '$$$', '$$$$'].map(price => (
              <label key={price} className="flex items-center mb-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-emerald-500 rounded" />
                <span className="ml-2 text-gray-600">{price}</span>
              </label>
            ))}
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Minimum Rating</h3>
            {[4.5, 4.0, 3.5, 3.0].map(rating => (
              <label key={rating} className="flex items-center mb-2 cursor-pointer">
                <input type="radio" name="rating" className="w-4 h-4 text-emerald-500" />
                <span className="ml-2 text-gray-600 flex items-center">
                  {rating}+ <Star className="ml-1 text-yellow-500" size={16} fill="currentColor" />
                </span>
              </label>
            ))}
          </div>

          {/* Open Now */}
          <div className="mb-6">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-emerald-500 rounded" />
              <span className="ml-2 text-gray-700 font-semibold">Open Now</span>
            </label>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Map */}
          <div className="h-80 bg-gray-300 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-gray-500 mx-auto mb-2" />
                <p className="text-gray-600">Map View</p>
                <p className="text-sm text-gray-500">Integration with Google Maps/Mapbox</p>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {restaurants.length} Restaurants Found
              </h2>
              <p className="text-gray-600">Showing halal restaurants near you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map(restaurant => (
                <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine}</p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Star className="text-yellow-500 mr-1" size={16} fill="currentColor" />
                        <span className="text-sm font-semibold">{restaurant.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">{restaurant.price}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={14} className="mr-1" />
                      <span>{restaurant.distance}</span>
                      <Clock size={14} className="ml-3 mr-1" />
                      <span>Open until 10:00 PM</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}