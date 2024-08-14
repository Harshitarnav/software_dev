import React, { useEffect, useState, useRef } from "react";
import "../../App.css";
import iphone_home from "../../assets/Website_content/iphone_home.png";
import icon from "../../assets/Icon.jpeg";
import { Carousel, PillButton, Placard } from "../../components/ButtonsLibrary";
import logoSVG from "../../assets/Website_content/TR_Website_content-04.svg";
import FormComponent from "../../components/FormComponent";
import { NearYou } from "../../components/NearYou";
import { themeColors } from "../../theme";
import { AppStore, PlayStore } from "../../assets/WelcomeScreenImage";
import backgroundImage from "../../assets/Website_content/TR_Image_desktop.png";
import { fetchAllGyms } from "../../helperFunctions/MarketplaceHelper";
import FitnessTypeDropDown from "../../components/dropDown/FitnessTypeDropDown";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LocationDropDown from "../../components/dropDown/LocationDropDown";

function Marketplace() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [location, setLocation] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const Gymlocation = useLocation();
  const queryParams = new URLSearchParams(Gymlocation.search);
  const locationParam = queryParams.get("location");

  console.log("locationParam", locationParam);

  const handleInputClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    navigate(`/marketplace?location=${location}`);
  };

  console.log("isDropdownOpen", isDropdownOpen);
  return (
    <div className="bg-tertiary w-full">
      {/* Main cover slideshow */}

      {/* Slideshow */}

      {/* <img src={coverImages[0]} alt="Cover" className="object-cover w-screen h-20"/> */}

      {/* Home Page- First block */}
      <div
        id="about"
        className="bg-tertiary"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 600,
        }}
      >
        {/* Left Column with Form */}
        <div className="lg:w-1/2 lg:pr-8 text-white flex flex-col items-center">
          {/* Form */}
          <form className="p-8 rounded-lg pt-44" onSubmit={handleNavigation}>
            <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-tertiary">
              EXPLORE GYMS/ CLASSES
            </h2>
            <div className="mb-4 w-3/4 flex w-1/2 rounded-2xl">
              {/* <label htmlFor="searchInput1" className="block text-gray-700">Input 1</label> */}
              <input
                type="text"
                id="searchInput1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                name="searchInput1"
                placeholder="Select Location"
                className="w-full h-10 px-4 rounded-xl bg-tertiary text-primary focus:border-4 focus:border-secondary placeholder-color custom-input"
              />
               {/* <LocationDropDown setLocation={setLocation} /> */}
            </div>
            <div
              className="mb-4 w-3/4 flex w-1/2 rounded-2xl flex-col"
              ref={dropdownRef}
            >
              {/* <label htmlFor="searchInput1" className="block text-gray-700">Input 1</label> */}
              <input
                type="text"
                id="searchInput2"
                name="searchInput2"
                onClick={handleInputClick}
                placeholder="Select Fitness Type"
                className="w-full h-10 px-4 rounded-xl bg-tertiary text-primary focus:border-4 focus:border-secondary placeholder-color custom-input"
              />
              {isDropdownOpen && <FitnessTypeDropDown />}
            </div>

            <button
              type="submit"
              className="flex w-fit bg-secondary text-tertiary font-semibold py-2 px-6 rounded-full hover:bg-tertiary hover:border-4 hover:border-secondary hover:text-primary"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Describing Train Rex- Second block */}
      {/* <div className="bg-secondary text-white py-32">
                <h1 className="text-4xl lg:text-5xl font-bold mb-14 px-2">{'TRAIN REX IS A ONE STOP FITNESS SOLUTION'}</h1>
                <AppButton
                    hide={false}
                    bg={'bg-tertiary'}
                />
            </div> */}

      {/* Written*/}
      <div className="flex flex-row justify-center items-center bg-secondary py-4 gap-x-4">
        <img src={logoSVG} alt="Logoss" className="h-3 lg:h-4" />
        <h2 className="flex text-[15px] lg:text-2xl font-bold text-tertiary">
          ONE STOP FITNESS SOLUTION
        </h2>
        <img src={logoSVG} alt="Logo" className="h-3 lg:h-4" />
      </div>

      <NearYou
        heading={
          locationParam
            ? `CHECK OUT FITNESS CENTRES AT ${locationParam.toUpperCase()} `
            : "CHECK OUT FITNESS CENTRES NEAR YOU"
        }
        headingMobile="FITNESS CENTRES NEAR YOU"
        bg="bg-tertiary"
        headingColor="text-secondary"
        size="mx-auto lg:mx-40"
        locationIconColor={themeColors.lightAccent}
        locationParam={locationParam}
      />

      {/* Gym Lists */}

      {/* Info */}
      <div
        id="about"
        className="bg-secondary flex flex-col lg:flex-row lg:ml-48 items-center lg:justify-end lg:rounded-l-[64px] lg:h-[600px]"
      >
        {/* Left Column with SVGs and Text */}
        <div className="lg:w-1/2 lg:pr-8 pb-8 flex flex-col items-center">
          <img src={logoSVG} alt="Logo" className="h-6 lg:h-10 my-8" />
          {/* Text */}

          <p className="text-[15px] text-tertiary font-semibold lg:text-2xl mx-6">
            Your Personal Trainer in your pocket,
          </p>
          <p className="text-[15px] text-tertiary font-semibold lg:text-2xl mx-6">
            {" "}
            waiting to find your person, track your progress
          </p>
          <p className="text-[15px] text-tertiary font-semibold lg:text-2xl mb-8 mx-6">
            {" "}
            and provide professional guidance.
          </p>
          {/* Button */}
          {/* <a href="https://apps.apple.com/gb/app/train-rex/id6476014470" target="_blank" rel="noopener noreferrer" className="bg-secondary hover:bg-primary text-tertiary font-semibold text-xl py-2 px-8 rounded-3xl border border-gray-300 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline">
                        START TODAY <span style={{ fontSize: '1.5rem' }}>&#8250;</span>
                    </a> */}
          <div className="flex flex-row justify-between lg:gap-x-6">
            <AppStore className="w-40 h-10 lg:h-16" />
            <PlayStore className="w-40 h-10 lg:h-16" />
          </div>
        </div>

        {/* Right Column with Image */}
        <div className="w-fit hidden lg:flex flex-row px-14 mr-auto lg:mr-12 gap-x-8">
          {/* <div className="relative h-0 lg:h-auto"> */}
          <img
            src={iphone_home}
            alt="Home Image"
            className="w-64 h-1/3 lg:h-5/8"
          />
          <img
            src={iphone_home}
            alt="Home Image"
            className="w-64 h-1/3 lg:h-5/8"
          />
          {/* </div> */}
        </div>
      </div>

      {/* Blog List */}
      <NearYou
        heading="CHECK OUT THE TRAIN REX BLOG"
        headingMobile="TRAIN REX BLOGS"
        bg="bg-tertiary"
        headingColor="text-secondary"
        size="mx-auto lg:mx-40"
        locationIconColor={themeColors.lightAccent}
      />

      {/* Footer */}
      <div className="bg-tertiary py-8 px-4 text-white flex flex-col items-center">
        <h3 className="text-xl font-semibold">Train Rex</h3>
        <p className="text-sm text-center mt-2">
          © 2024 Train Rex. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Marketplace;
