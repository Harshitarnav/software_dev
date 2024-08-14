import React, { useEffect, useState } from "react";
import "../../App.css";
import { ListCard, PillButton, Placard } from "../../components/ButtonsLibrary";
import "../../index.css";
import { cardData1 } from "../../assets/Strings";
import {
  fetchAllGyms,
  getLocation,
} from "../../helperFunctions/MarketplaceHelper";
import { useLocation, useNavigate } from "react-router-dom";
import icon from "../../assets/Icon.jpeg";
import MockGymData from "../../data/gymData";

function Listing() {
  const Gymlocation = useLocation();
  const queryParams = new URLSearchParams(Gymlocation.search);
  const locationParam = queryParams.get("location");
  const navigate = useNavigate();
  const [location, setLocation] = useState(locationParam || "");
  const [filter, setFilter] = useState("Gyms/Fitness Centres");
  const [sort, setSort] = useState("noSort");

  const props = {
    city: locationParam,
  };

  useEffect(() => {
    setLocation(locationParam || "");
  }, [locationParam]);

  console.log(sort)

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [userCity, setUserCity] = useState(null);
  const [cityGymList, setCityGymList] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const totalPages =
    cityGymList !== null && Math.ceil(cityGymList.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = MockGymData.filter(
    (card) => card.city === props.city
  ).sort((a, b) => {
    if (sort === "lowToHigh") {
      return a.rating - b.rating;
    } else if (sort === "highToLow") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const currentItems =
    cityGymList !== null &&
    cityGymList.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  useEffect(() => {
    setLoading(true); // Start loading
    setUserCity(props.city);

    const cityGyms = async () => {
      const cityGymList = await fetchAllGyms(props.city);
      setCityGymList(cityGymList);
    };
    cityGyms();

    setLoading(false); // Stop loading
  }, []);

  return (
    <div className="bg-tertiary flex flex-col px-4 lg:px-48 min-h-screen pt-10">
      {/* <div className="flex flex-row lg:py-4">
                <PillButton label="Gyms/Fitness Centres" list={true}/>
                <PillButton label="Fitness Classes" list={true}/>
                <PillButton label="Sports" list={true}/>
            </div> */}

      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search for gyms, fitness classes, sports"
            className="w-full h-12 border-2 border-secondary rounded-lg px-4"
          />
          <button
            onClick={() => navigate(`/listing?location=${location}`)}
            class="bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-opacity-50 transition duration-300 ease-in-out"
          >
            Search
          </button>
        </div>

        <div className="flex justify-between">
          <div class="flex items-center gap-5">
            <div class="text-primary font-semibold">Type of Center</div>
            <div class="flex gap-3 items-center">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="gyms"
                  class="text-primary border-gray-300 rounded focus:ring-primary focus:ring-opacity-50"
                />
                <label for="gyms" class="ml-2 text-primary">
                  Gyms
                </label>
              </div>
              |
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="yoga"
                  class="form-checkbox text-primary border-gray-300 rounded focus:ring-primary focus:ring-opacity-50"
                />
                <label for="yoga" class="ml-2 text-primary">
                  Yoga
                </label>
              </div>
              |
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="functional-training"
                  class="form-checkbox text-primary border-gray-300 rounded focus:ring-primary focus:ring-opacity-50"
                />
                <label for="functional-training" class="ml-2 text-primary">
                  Functional Training
                </label>
              </div>
              |
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="cardio"
                  class="form-checkbox text-primary border-gray-300 rounded focus:ring-primary focus:ring-opacity-50"
                />
                <label for="cardio" class="ml-2 text-primary">
                  Cardio
                </label>
              </div>
            </div>
          </div>

          <div class="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="block w-full bg-bg text-white border border-gray-300 rounded-lg py-2 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="noSort">Select Filter</option>
              <option value="lowToHigh">Ratings: Low to High</option>
              <option value="highToLow">Ratings: High to Low</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-full pt-32">
          <p className="text-secondary text-lg lg:text-2xl font-bold">
            Loading...
          </p>
        </div>
      ) : (
        MockGymData !== null && (
          <div className="flex flex-col py-8">
            <p className="flex text-secondary text-lg lg:text-4xl font-bold text-left pl-2">
              SHOWING FITNESS CENTRES IN {userCity.toUpperCase()}
            </p>
            <div className="">
              <div className="flex flex-wrap">
                {filteredData.filter((card) => card.city === props.city).map(
                  (card, index) => (
                    <ListCard
                      key={index}
                      // image={
                      //   card.image === "<url>" ? [icon, icon, icon] : card.image
                      // }
                      image={card.Portfolio}
                      name={card.gymName}
                      city={card.city}
                      gymDisplayName={card.gymDisplayName}
                      cityDisplayName={card.cityDisplayName}
                      rating={card.rating}
                      NoOfReview={card.NoOfReview}
                      locality={card.locality}
                      buttonText={"EXPLORE"}
                      extraText={"Free Trials | Membership deals Available"}
                      stars={true}
                      gymID={card.gymID}
                    />
                  )
                )}
              </div>
              <div className="flex justify-center mt-8">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(index + 1)}
                    className={`mx-1 px-3 py-1 rounded ${
                      index + 1 === currentPage
                        ? "bg-secondary text-tertiary"
                        : "bg-tertiary text-secondary border-2 border-secondary"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Listing;
