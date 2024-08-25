const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  areaName,
  sla,
  costForTwo,
  avgRatingString,
}) => {
  const RestaurantImage =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

  return (
    <div className="flex flex-col w-56 m-4 p-4 bg-slate-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-yellow-100 cursor-pointer">
      <img
        className="w-full h-36 rounded-lg object-cover mb-3"
        alt="restu-img"
        src={RestaurantImage + cloudinaryImageId}
      />
      <h3 className="font-bold text-lg mb-1">{name}</h3>
      <h5 className="text-sm text-gray-600 mb-1">{cuisines.join(", ")}</h5>
      <h5 className="text-sm text-gray-600 mb-1">{areaName}</h5>
      <div className="flex justify-between items-center text-sm mt-2">
        <span className="bg-green-500 text-white px-2 py-1 rounded-lg">
          {avgRatingString}
        </span>
        <span>{sla?.lastMileTravelString ?? "2.0 km"}</span>
      </div>
      <h4 className="mt-2 font-semibold">{costForTwo ?? "₹200 for two"}</h4>
    </div>
  );
};

export default RestaurantCard;
