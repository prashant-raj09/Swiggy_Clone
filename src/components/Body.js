import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [searchRestaurant, setSearchRestaurant] = useState("");
  const [restaurants, setRestaurant] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  console.log(filteredRestaurants);

  // ------------------- Fetching Swiggy Data Start ----------------------------

  const getData = async () => {
    const response = await fetch(
      "https://api.allorigins.win/raw?url=" +
        encodeURIComponent(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0203896&lng=77.6570531&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        )
    );
    const restaurantData = await response.json();
    function checkJsonData(jsonData) {
      for (let i = 0; i < jsonData?.data?.cards.length; i++) {
        // initialize checkData for Swiggy Restaurant data
        let checkData =
          restaurantData?.data?.cards[i]?.card?.card?.gridElements
            ?.infoWithStyle?.restaurants;

        // if checkData is not undefined then return it
        if (checkData !== undefined) {
          return checkData;
        }
      }
    }
    const resData = checkJsonData(restaurantData);

    setRestaurant(resData);
    setFilteredRestaurants(resData);
  };

  useEffect(() => {
    getData();
  }, []);

  // ------------------- Fetching Swiggy Data Start ----------------------------

  // ------------------------- Search Restaurants Start --------------------------------
  const getSearchRestaurant = (searchRestaurant, restaurants) => {
    if (searchRestaurant !== "") {
      const filteredData = restaurants.filter((restaurant) =>
        restaurant?.info?.name
          .toLowerCase()
          .includes(searchRestaurant.toLowerCase())
      );
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage(
          `Sorry, we couldn't find any results for "${searchRestaurant}"`
        );
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };

  const filterTopRestaurants = (restaurants) => {
    console.log("Clicked");
    const filterRestaurant = restaurants.filter(
      (restaurant) => restaurant?.info?.avgRatingString > 4.2
    );
    setFilteredRestaurants(filterRestaurant);
  };

  // ------------------------- Top Restaurants Start -----------------------------------

  return (
    <div className="my-32 mx-28">
      <div className="flex m-4 justify-center items-center space-x-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchRestaurant}
            onChange={(e) => setSearchRestaurant(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => {
              getSearchRestaurant(searchRestaurant, restaurants);
            }}
            className="bg-blue-400 text-white rounded-md px-4 py-2 hover:bg-blue-500 hover:text-yellow-50 transition-colors duration-200"
          >
            Search
          </button>
        </div>
        {errorMessage && <div className="error-container">{errorMessage}</div>}
        <div>
          <button
            onClick={() => {
              filterTopRestaurants(restaurants);
            }}
            className="bg-blue-400 text-white rounded-md px-4 py-2 hover:bg-blue-500 hover:text-yellow-50 transition-colors duration-200"
          >
            Filter Top Restaurants
          </button>
        </div>
      </div>

      {restaurants.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="flex flex-wrap">
          {filteredRestaurants.map((restaurant) => {
            return (
              <RestaurantCard
                key={restaurant?.info?.id}
                {...restaurant?.info}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Body;
