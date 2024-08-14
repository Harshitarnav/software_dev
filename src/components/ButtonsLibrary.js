import React, { useEffect, useState } from "react";
import flyer from "../assets/Flyer.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
// import 'swiper/swiper-bundle.min.css';
import "../index.css"; // Ensure this imports your custom styles

import { fieldMarketingAgent } from "../assets/Strings";
import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/Icon.jpeg";
import { LocationIcon } from "../assets/WelcomeScreenImage";
import { themeColors } from "../theme";

import StarRating from "./StarRating";
import { formatEquipmentName } from "../helperFunctions/GymFormHelpersExtended";

export const PillButton = (props) => {
  return (
    <button
      className={
        "text-secondary bg-tertiary border-4 border-secondary inline-block px-3 rounded-full mr-2 mb-2 hover:bg-secondary hover:text-tertiary flex flex-row justify-center w-40 lg:w-52"
      }
    >
      <p className="text-sm lg:text-lg font-bold py-2">{props.label}</p>
    </button>
  );
};

export const BigButton = (props) => {
  return (
    <button
      className={`${props.textColor} ${props.bg} inline-block rounded-full mx-2 mb-2 px-8 lg:px-10 hover:bg-primary focus:outline-none focus:ring focus:border-primary ${props.width}`}
      onClick={props.onClick}
    >
      <p className="lg:text-sm font-bold px-0 lg:px-2 py-1 lg:py-2">
        {props.label}
      </p>
    </button>
  );
};

export const Placard = (props) => {
  console.log("KUCH HAI KYA", props);
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.hidden) {
      navigate("/BlogPost", { state: props });
    } else {
      navigate(`/ProductPortfolio/${props.id}`, { state: { gymID: props.id } });
    }
  };

  console.log('props.image', props.image)

  return (
    <div
      className={`flex flex-col h-fit rounded-3xl mx-4 lg:mx-8 ${props.bg}`}
      onClick={handleClick}
    >
      <img
        src={props.image[0]}
        alt="Logos"
        className="flex h-36 w-84 lg:h-56 m-2 lg:m-4 rounded-2xl"
      />
      <p
        className={`flex px-4 text-lg lg:text-3xl ${props.textColor} font-bold text-left`}
      >
        {props.name}
      </p>
      {props.location && (
        <div className="flex flex-row lg:px-0 mb-4 mx-3 mt-1">
          {!props.hidden ? (
            <>
              <LocationIcon
                className="w-5 lg:w-7 h-4 lg:h-6"
                color={props.locationIconColor}
              />
              <p className={`text-sm lg:text-xl ${props.textColor} font-bold `}>
                {props.location}
              </p>
            </>
          ) : (
            <p
              className={`text-sm lg:text-xl ${props.textColor} font-bold mx-1 text-left`}
            >
              {props.location}
            </p>
          )}
        </div>
      )}

      {props.hidden === true ? (
        ""
      ) : (
        <button
          className={`flex text-sm lg:text-lg ${
            props.bg === "bg-secondary" ? "bg-secondary" : "bg-tertiary"
          } font-bold ${
            props.textColor === "text-secondary"
              ? "text-tertiary"
              : "text-secondary"
          } w-fit rounded-full px-4 py-1 mx-4 mb-4`}
        >
          EXPLORE
        </button>
      )}
    </div>
  );
};

export const Carousel = ({ slides }) => {
  return (
    <div className="carousel-container relative w-full">
      <Swiper
        spaceBetween={-40}
        slidesPerView={1.5}
        centeredSlides={false}
        // modules={[Navigation, Pagination, Scrollbar, A11y]}
        // navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: false }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="carousel-slide">
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Handles Jobs and Lists for Fitness centres and blogs
export const ListCard = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [data, setData] = useState(props);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/ProductPortfolio/${props.gymID}`, { state: data });
    // navigate(`/ProductPortfolio/${props.gymID}`);
  };

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (props.image && props.image.length > 0) {
      const transformed = props.image.map(convertToDirectLink);
      setData((prevData) => ({
        ...prevData,
        image: transformed,
      }));
    }
  }, [props.image]);

  return (
    <div
      id="Full Card"
      className="flex flex-row h-fit bg-secondary w-full rounded-3xl p-2 lg:p-4 my-6"
      // onClick={onClick}
    >
      {props.extraText === "Jobs" ? (
        <img
          src={icon}
          alt="Logo"
          className="h-32 lg:h-56 w-1/3 lg:w-1/4 rounded-3xl"
        />
      ) : (
        <img
          src={data.image[1]}
          alt="Logo"
          className="h-32 lg:h-56 w-1/3 lg:w-1/4 rounded-3xl"
        />
      )}
      <div
        id="Text Part"
        className="flex flex-col h-fit bg-secondary w-3/4 rounded-2xl"
      >
        <div
          id="Top"
          className="flex flex-col lg:flex-row justify-between lg:pb-16 px-4"
        >
          <div className="flex flex-col items-start">
            <p className="text-lg lg:text-4xl text-tertiary font-bold text-left">
              {props.gymDisplayName}
            </p>
            <div className="flex flex-row py-2 gap-x-1">
              <LocationIcon
                className="w-3 lg:w-7 h-4 lg:h-8"
                color={themeColors.lightAccent}
              />
              <p className="text-sm lg:text-2xl text-tertiary font-bold text-left">
                {props.cityDisplayName}
              </p>
            </div>
          </div>

          <div className="flex lg:hidden lg:pt-3 items-start pb-3">
            {props.extraText === "Jobs" ? (
              <button
                onClick={handleButtonClick}
                className="flex text-[10px] lg:text-xl text-secondary font-bold bg-tertiary rounded-full lg:mx-4 my-auto px-2 lg:px-8 py-1 lg:py-2"
              >
                View Description
              </button>
            ) : (
              <p className="text-[10px] lg:text-xl text-tertiary font-semibold text-left">
                {props.extraText}
              </p>
            )}
          </div>

          {/* Stars and Reviews at teh top for bigger screens */}
          {/* {props.stars?
                <div className="hidden lg:flex flex-col items-end">
                <div className="text-lg lg:text-3xl text-tertiary font-bold">
                    {[...Array(parseInt(props.rating))].map((_, starIndex) => (
                    <span key={starIndex} className='text-sm lg:text-4xl text-tertiary'>&#9733;</span>
                    ))}
                </div>
                <p className="text-sm lg:text-xl text-tertiary font-bold">{props.NoOfReview} Reviews</p>
                </div>
                :
                null} */}
          <StarRating rating={props.rating} NoOfReview={props.NoOfReview} />
        </div>

        {/* Line */}
        {props.stars ? (
          <div className="flex ml-4 mr-2 lg:mx-4 border-t-2 border-tertiary lg:my-4"></div>
        ) : null}

        {/* Stars and Reviews at bottom for smaller screens */}
        <div
          id="Bottom"
          className="flex flex-row w-full justify-between items-center pl-4"
        >
          {props.stars ? (
            <div className="flex lg:hidden flex-col items-start">
              <div className="text-lg lg:text-3xl text-tertiary font-bold">
                {[...Array(parseInt("5"))].map((_, starIndex) => (
                  <span
                    key={starIndex}
                    className="text-sm lg:text-4xl text-tertiary"
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              {/* <p className="text-lg lg:text-3xl text-tertiary font-bold">Stars</p> */}
              <p className="text-[10px] lg:text-xl text-tertiary font-bold -mt-1">
                {props.NoOfReview} Reviews
              </p>
            </div>
          ) : null}

          {/* Extra Text at bottom for bigger screen */}
          <div className="lg:flex hidden items-start">
            {props.extraText === "Jobs" ? (
              <button
                onClick={handleButtonClick}
                className="flex text-[10px] lg:text-xl text-secondary font-bold bg-tertiary rounded-full my-auto mx-4 lg:px-6 py-1 lg:py-2"
              >
                View Description
              </button>
            ) : (
              <p className="text-[12px] lg:text-2xl text-tertiary font-semibold">
                {props.extraText}
              </p>
            )}
          </div>
          {props.hidden === false ? (
            ""
          ) : props.buttonText === "Apply" ? (
            <a
              href="https://forms.gle/JYR3i4z7yRU4Vf836"
              className="flex text-[10px] lg:text-xl text-secondary font-bold bg-tertiary rounded-full lg:mx-4 my-auto px-2 lg:px-4 py-1 lg:py-2 lg:mt-4"
            >
              {props.buttonText}
            </a>
          ) : (
            <button
              onClick={handleNavigation}
              className="flex text-[10px] lg:text-xl text-secondary font-bold bg-tertiary rounded-full lg:mx-4 mr-2 px-3 lg:px-5 py-1 lg:py-2"
            >
              {props.buttonText}
            </button>
          )}
          {/* <a href={props.buttonText==='Apply'?"https://forms.gle/JYR3i4z7yRU4Vf836":'/ProductPortfolio'} className="flex text-[10px] lg:text-xl text-secondary font-bold bg-tertiary rounded-full lg:mx-4 my-auto px-2 py-1 lg:py-2 lg:mt-4">{props.buttonText}</a> */}
        </div>
      </div>

      {isPopupOpen && (
        <JobDescriptionPopup
          text={fieldMarketingAgent}
          handleClosePopup={handleClosePopup}
        />
      )}
    </div>
  );
};

export const JobDescriptionPopup = ({ text, handleClosePopup }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-tertiary bg-opacity-50 p-2">
      <div className="bg-secondary text-black p-4 rounded-2xl border-4 border-secondary overflow-y-auto max-h-[65vh] max-w-[90vw] w-full sm:w-auto">
        <div className="px-4 py-2 flex flex-col text-left">
          <h2 className="text-2xl font-bold mb-4">About the job</h2>
          <h3 className="text-xl font-semibold">Position Overview :</h3>
          <p className="mb-4">{text.positionOverview}</p>

          <h3 className="text-xl font-semibold">Responsibilities :</h3>
          <ul className="list-disc list-inside pl-4 mb-4">
            {text.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold">Qualifications :</h3>
          <ul className="list-disc list-inside pl-4 mb-4">
            {text.qualifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold">Benefits :</h3>
          <ul className="list-disc list-inside pl-4 mb-4">
            {text.benefits.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <p className="mb-4">{text.closing}</p>

          <button
            onClick={handleClosePopup}
            className="bg-tertiary text-black rounded font-semibold text-lg px-2 mx-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const ClickOpen = ({ heading, details, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="flex lg:px-4 py-2 justify-between items-center">
        <p className="flex text-secondary text-lg lg:text-2xl font-bold">
          {heading}:
        </p>
        <button
          onClick={toggleVisibility}
          className="text-secondary text-2xl lg:text-4xl font-bold"
        >
          {isVisible ? "-" : "+"}
        </button>
      </div>
      {isVisible && (
        <div className="flex flex-col lg:px-4 pb-2">
          {details && (
            <p className="text-primary text-sm lg:text-lg">{details}</p>
          )}
          {children}
        </div>
      )}
    </>
  );
};

/**
 * Displays a list
 * @param {String} title
 * @param {List} items
 * @returns
 */
export const ListDisplay = ({ items }) => {
  const displayItems =
    items && items.length > 0 ? items : ["Nothing to Display"];

  return (
    <div className="flex flex-col">
      <ul className="list-disc ml-6">
        {displayItems.map((item, index) => (
          <li key={index} className="text-secondary text-base lg:text-lg">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Function to convert Google Drive link to a direct link
const convertToDirectLink = (url) => {
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
  return fileIdMatch !== null
    ? `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}`
    : url;
  // https://drive.google.com/file/d/1WfXOGMBkKV8xOoz06GwUQ5E4h9Imkg_3/view?usp=share_link
  // return fileIdMatch !== null ? `https://drive.google.com/file${fileIdMatch[0]}view?usp=share_link` : url;
};
