import React, { useEffect, useState } from 'react';
import '../../App.css';
import { BigButton, ClickOpen, ListDisplay } from '../../components/ButtonsLibrary';
import Modal from 'react-modal'; // Ensure you have react-modal installed
import { useLocation, useParams } from 'react-router-dom';
import { NearYou } from '../../components/NearYou';
import Slider from 'react-slick';
import {reviews} from '../../assets/Strings'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { themeColors } from '../../theme';
import PaymentComponent from '../../components/PaymentComponent.js';
import { Link, animateScroll as scroll, scroller } from 'react-scroll';
import { refineData } from '../../helperFunctions/basicHelper.js';
import { UserLoginModal } from '../../helperFunctions/ModalHelpers/UserCreds.js';
import { fetchGymData } from '../../helperFunctions/MarketplaceHelper.js';
import MockGymData from '../../data/gymData.js';

function ProductPortfolio () {
    const location = useLocation();
    // console.log('Location : ', location);
    const data = location.state || {}; 

    console.log('params', data.gymID)
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [signInModal, setSignInModal] = useState(false);
    const [gymData, setGymData] = useState(null);
    const [months, setMonths] = useState(1);
    const [newGymData, setNewGymData] = useState({});
    const [myData, setMyData] = useState({});

    const [showPopup, setShowPopup] = useState(false);

    useEffect(()=>{
        const getGymData = async () => {
         const result = await MockGymData.filter((item) => item.gymID === data.gymID)
         setGymData(result[0])
        } 
        getGymData()
     },[])

     console.log('newGymData', newGymData)

    const testData = {
        equipmentList: ['Treadmill', 'Dumbbells', 'Bench Press'],
        facilities: ['Shower', 'Locker Room', 'Sauna'],
        classes: ['Yoga', 'Pilates', 'CrossFit']
    }

    const handleMembershipButton = (months, amount) => {
        setMonths(months);
        setSignInModal(true);
        setMyData({
            gymName :   data.name,
            city    :   gymData?.city || data.city,
            months  :   months,
            amount  :   amount * 100,
            image   :   data.image[0]
        })

    }

    /**
     * Fetches the gymData
     */
    useEffect(() => {
        const loadGymData = async () => {
            try {
                const gymData = await fetchGymData(data.city, data.name);
                console.log(gymData);
                setGymData(gymData);
            } catch (error) {
                console.error('Error fetching gym data:', error.message);
            }
        };

        loadGymData();
    }, [data]);

    const openModal = (index) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // const settings = {
    //     initialSlide: selectedImageIndex,
    //     dots: true,
    //     infinite: true,
    //     vertical:true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    // };

    const [visibleReviews, setVisibleReviews] = useState(3);

    const showMoreReviews = () => {
        setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 3);
    };

    const showLessReviews = () => {
        setVisibleReviews(3);
    };

    const scrollToSection = (sectionId) => {
        scroller.scrollTo(sectionId, {
          duration: 800,
          delay: 10,
          smooth: 'easeInOutQuart'
        });
    };

    return (
        <div className="bg-tertiary flex flex-col px-8 lg:px-48 pt-12">
            {/* Image Section */}
            <div className="flex flex-row h-96 bg-secondary border-4 border-secondary rounded-2xl">
                <div className="relative flex h-full lg:h-84 w-full border-2 border-secondary rounded-2xl">
                    <img src={data.image[1]} alt="Logo" className="w-full rounded-2xl border-4 border-secondary" onClick={() => openModal(0)}/>
                    <div className="absolute bottom-0 right-0 bg-secondary bg-opacity-100 rounded-xl lg:hidden flex justify-between p-2">
                        <p className="flex text-tertiary text-xl font-bold">
                            + {data.image.length} photos
                        </p>
                    </div>
                </div>
                <div className="hidden lg:flex flex-col border-2 border-secondary rounded-2xl w-full">
                    <div className="flex h-56">
                        <img src={data.image[1]} alt="Logo" className="w-full rounded-2xl border-4 border-secondary" onClick={() => openModal(1)} />
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="flex h-36 w-full">
                            <img src={data.image[2]} alt="Logo" className="w-full rounded-2xl border-4 border-secondary" onClick={() => openModal(2)} />
                        </div>
                        <div className="relative flex h-36 w-full">
                            <img src={data.image[1]} alt="Logo" className="w-full rounded-2xl border-4 border-secondary" onClick={() => openModal(3)} />
                            <div className="absolute bottom-0 right-0 bg-secondary bg-opacity-100 rounded-xl hidden lg:flex justify-between p-2">
                                <p className="flex text-tertiary text-xl font-bold">
                                    + {data.image.length-4} photos
                                </p>
                            </div>
                            {/* <p className="absolute top-0 left-0 text-tertiary text-4xl font-bold bg-opacity-50 p-2 rounded-xl my-8 mx-16 flex items-center justify-center">
                                + {data.image.length}
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="flex inset-0 fixed justify-center bg-black bg-opacity-50 z-50 pt-36 lg:p-64 mb-auto lg:-mt-48">
                    <div className="relative p-4 rounded-xl">
                        <button
                            className="absolute -top-5 lg:-top-9 right-4 lg:right-4 text-tertiary text-4xl lg:text-6xl h-8"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <Carousel
                            selectedItem={selectedImageIndex}
                            showThumbs={true}
                            className="w-72 lg:w-96 h-auto"
                            >
                            {data.image.slice(0, 5).map((img, index) => (
                                <div key={index} >
                                <img src={img} alt={`Image ${index}`} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            )}

            <UserLoginModal modalIsOpen={signInModal} setModalIsOpen={setSignInModal} myData={myData}/>

            {/* <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal-content" overlayClassName="modal-overlay">
                <Slider {...settings}>
                    {data.image.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Slide ${index}`} className="w-full rounded-2xl" />
                        </div>
                    ))}
                </Slider>
            </Modal> */}
            
            {/* ------------------------------- */}
            {/* ----Gym Information Section---- */}
            {/* ------------------------------- */}
            <div className='flex flex-col justify-between'>
                <div className='flex flex-row justify-between pt-8 pb-2'>
                    <div className='flex flex-col justify-start'>
                        <p className='flex text-4xl lg:text-6xl font-bold text-secondary'>{gymData?.gymDisplayName || data.name}</p>
                        <div className='flex pt-4'>
                            <p className='flex text-2xl lg:text-4xl font-bold text-secondary'>{gymData?.cityDisplayName} </p>
                        </div>
                    </div>

                    {/* Review and Ratings */}
                    <div className="flex flex-col">
                        <div className="hidden lg:flex flex-col items-end">
                            <div className="text-lg lg:text-3xl text-secondary font-bold">
                                {[...Array(parseInt(gymData?.rating || 0))].map((_, starIndex) => (
                                <span key={starIndex} className='text-sm lg:text-4xl text-secondary'>&#9733;</span>
                                ))}
                            </div>
                            {/* <p className="text-lg lg:text-3xl text-tertiary font-bold">Stars</p> */}
                            <p className="text-sm lg:text-xl text-secondary font-bold">{gymData?.NoOfReview} Reviews</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row justify-between'>
                    <div className='flex flex-col'>
                        <div className='flex flex-col py-4'>
                            <p className='flex text-[15px] lg:text-xl font-bold text-black'>Address</p>
                            <p className='flex text-[15px] lg:text-xl font-bold text-secondary'>{gymData?.address}</p>
                            <p className='flex text-[15px] lg:text-xl font-bold text-secondary'>{gymData?.locality},</p>
                            <p className='flex text-[15px] lg:text-xl font-bold text-secondary'>{gymData?.cityDisplayName}, {gymData?.pinCode}</p>
                        </div>
                        <div className='flex flex-col mb-4'>
                            <p className='flex text-[15px] lg:text-xl font-bold text-black'>Timing</p>
                            <p className='flex text-[15px] lg:text-xl font-bold text-secondary'>{gymData?.openingTime} to {gymData?.closingTime}</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col bg-secondary px-4 pt-2 px-10 rounded-2xl items-center mt-4 pb-2 lg:pb-0 mb-2 lg:mb-8">
                        <p className='flex text-sm font-semibold text-black p-2'>Liked {data.name}? </p>
                        <BigButton label='BOOK A FREE TRIAL' bg='bg-tertiary' textColor='text-secondary' width='w-full'/>
                        <BigButton
                            label='BUY MEMBERSHIP'
                            onClick={() => scrollToSection('membership-section')}
                            bg='bg-tertiary'
                            textColor='text-secondary'
                            width='w-full'
                        />
                        {/* <div> 
                            <PaymentComponent />
                        </div> */}
                        <BigButton label='CALL 9999999999' bg='bg-tertiary' textColor='text-secondary' width='w-full'/>
                    </div>
                </div>
            </div>

            <div id='membership-section' className="flex flex-col lg:flex-row justify-between mb-8 mt-4 lg:gap-x-6">

                {/* -------------------------------- */}
                {/* ------ Rating and Reviews ------ */}
                {/* -------------------------------- */}
                <div className='flex flex-col justify-between lg:border-4 border-secondary rounded-2xl lg:w-3/5'>
                    <p className='flex lg:px-4 py-4 pb-2 text-secondary text-xl lg:text-3xl font-bold text-left'>Rating and Reviews</p>

                    <div className='flex pb-0 lg:px-4'>
                        <p className='flex text-secondary text-sm lg:text-xl font-bold'>Known for:</p>
                    </div>

                    <div className="flex lg:mx-4 border-t-2 border-secondary lg:my-4"></div>

                    {/* List of reviews */}
                    <div className='flex flex-col lg:px-4 h-fit'>
                        {reviews.slice(0, visibleReviews).map((review, index) => (
                        <div key={index} className='flex flex-col mb-4'>
                            <div className='flex flex-row gap-x-4 py-2'>
                                <p className='flex text-secondary text-sm lg:text-xl font-bold'>{review.name}</p>
                                <div className='flex'>
                                    {[...Array(parseInt(review.stars))].map((_, starIndex) => (
                                    <span key={starIndex} className='text-sm lg:text-xl text-secondary'>&#9733;</span>
                                    ))}
                                </div>
                            </div>
                            <p className='flex text-black text-sm lg:text-lg text-left'>{review.review}</p>
                            <div className="flex border-t-[1px] border-secondary mt-4"></div>
                        </div>
                        ))}
                    </div>

                    {/* <div className="flex lg:mx-4 border-t-2 border-secondary my-4"></div> */}

                    <div className='flex justify-between lg:justify-center pb-8 lg:pb-2'>
                        {visibleReviews < reviews.length ? 
                            <BigButton label='View More' bg='bg-secondary' textColor='text-tertiary' width='lg:w-1/7' onClick={showMoreReviews} />
                            :
                            <BigButton label='View Less' bg='bg-secondary' textColor='text-tertiary' width='lg:w-1/7' onClick={showLessReviews} />
                        }
                        <BigButton label='Add Review' bg='bg-secondary' textColor='text-tertiary' width='w-1/7 flex justify-center' />
                    </div>
                </div>
                
                <div className="flex flex-col justify-between lg:w-2/5 h-fit gap-y-6">
                    {/* -------------------------------- */}
                    {/* ---- Buy Membership Section ---- */}
                    {/* -------------------------------- */}
                    <div className='flex flex-col border-2 lg:border-4 border-secondary rounded-2xl w-full h-fit'>
                        <div className='flex flex-row justify-between pt-2 pb-2 lg:pb-0'>
                            <button className="text-primary text-[16px] lg:text-lg font-bold px-4 py-2 focus:bg-secondary focus:rounded-full focus:ml-4 focus:mt-2 focus:px-4 lg:focus:px-5">Membership Prices</button>
                            <button className="text-primary text-[16px] lg:text-lg font-bold px-4 py-2 focus:bg-secondary focus:rounded-full focus:mr-4 focus:mt-2 focus:px-4 lg:focus:px-5">Traffic Hours</button>
                        </div>
                        
                        <div className="flex mx-[12px] lg:mx-4 border-t-2 border-secondary lg:my-4"></div>

                        {gymData?.dailyPrice && (
                            <div>
                                <div className='flex px-4 py-2 justify-between'>
                                    <p className='text-primary text-sm lg:text-xl font-semibold'>Single day</p>
                                    <button onClick={() => {
                                        handleMembershipButton(0, gymData?.dailyPrice)
                                        }} className='text-primary text-sm lg:text-lg font-semibold bg-secondary rounded-full px-4 py-1 lg:py-0'>Rs. {gymData?.dailyPrice}</button>
                                </div>
                                <div className="flex mx-[12px] lg:mx-4 border-t-[1px] border-secondary lg:my-4"></div>
                            </div>
                        )}

                        {gymData?.monthlyPrice && (
                            <div>
                                <div className='flex px-4 py-2 justify-between'>
                                    <p className='text-primary text-sm lg:text-xl font-semibold'>1 month</p>
                                    <button onClick={() => {
                                        handleMembershipButton(1, gymData?.monthlyPrice)
                                        }} className='text-primary text-sm lg:text-lg font-semibold bg-secondary rounded-full px-4 py-1 lg:py-0'
                                    >
                                        {gymData?.monthlyPrice}
                                    </button>
                                </div>
                                <div className="flex mx-[12px] lg:mx-4 border-t-[1px] border-secondary lg:my-4"></div>
                            </div>
                        )}

                        {gymData?.quarterlyPrice && (
                            <div>
                                <div className='flex px-4 py-2 justify-between'>
                                    <p className='text-primary text-sm lg:text-xl font-semibold'>3 months</p>
                                    <button onClick={() => 
                                        handleMembershipButton(3, gymData?.quarterlyPrice)
                                    } className='text-primary text-sm lg:text-lg font-semibold bg-secondary rounded-full px-4 py-1 lg:py-0'
                                    >
                                        Rs. {gymData?.quarterlyPrice || "Loading..."}
                                    </button>
                                </div>
                                <div className="flex mx-[12px] lg:mx-4 border-t-[1px] border-secondary lg:my-4"></div>
                            </div>
                        )}

                        {gymData?.halfYearlyPrice && (
                            <div>
                                <div className='flex px-4 py-2 justify-between'>
                                    <p className='text-primary text-sm lg:text-xl font-semibold'>6 months</p>
                                    <button onClick={() => 
                                        handleMembershipButton(6, gymData?.halfYearlyPrice)
                                    } className='text-primary text-sm lg:text-lg font-semibold bg-secondary rounded-full px-4 py-1 lg:py-0'>Rs. {gymData?.halfYearlyPrice || "Loading..."}</button>
                                </div>
                                <div className="flex mx-[12px] lg:mx-4 border-t-[1px] border-secondary lg:my-4"></div>
                            </div>
                        )}

                        {gymData?.yearlyPrice && (
                            <div>
                                <div className='flex px-4 py-2 lg:pb-8 justify-between'>
                                    <p className='text-primary text-sm lg:text-xl font-semibold'>12 months</p>
                                    <button onClick={() => 
                                        handleMembershipButton(12, gymData?.yearlyPrice)
                                    } className='text-primary text-sm lg:text-lg font-semibold bg-secondary rounded-full px-4 py-1 lg:py-0'>Rs. {gymData?.yearlyPrice || "Loading..."}</button>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Traffic Graph */}
                    {data.trafficHours ? (
                    <div className="flex flex-col bg-tertiary border-2 lg:border-4 border-secondary rounded-3xl justify-between h-72">
                        <div className="flex flex-row justify-between">
                            <p className="text-primary text-lg font-bold px-4 pt-4">Traffic Hours</p>
                        </div>

                        <div className="flex mx-[12px] lg:mx-4 border-t-2 border-secondary -mt-10 lg:-mt-6"></div>

                        <div className="flex flex-col">
                            <div className="flex flex-row items-end justify-between pb-2 px-10">
                                {data.trafficHours.map((hour, index) => (
                                    <div key={index} className={`bg-secondary w-3 lg:w-4 h-${hour} rounded-full`}></div>
                                ))}
                            </div>

                            <div className="self-center bg-secondary" style={{ width: '95%', height: 1.2 }}></div>

                            <div className="flex flex-row px-4 py-2 justify-between">
                                <p className="text-primary text-[12px] font-semibold">6am</p>
                                <p className="text-primary text-[12px] font-semibold">10am</p>
                                <p className="text-primary text-[12px] font-semibold">2pm</p>
                                <p className="text-primary text-[12px] font-semibold">6pm</p>
                                <p className="text-primary text-[12px] font-semibold">10pm</p>
                            </div>
                        </div>
                    </div>
                    ) : (
                    <div className="flex flex-col bg-tertiary border-2 lg:border-4 border-secondary rounded-2xl justify-between h-72">
                        <div className="flex flex-row justify-between">
                            <p className="text-primary text-lg font-bold px-4 pt-4">Traffic Hours</p>
                        </div>

                        <div className="flex mx-[12px] lg:mx-4 border-t-2 border-secondary -mt-10 lg:-mt-6"></div>

                        <div className="flex flex-col relative">
                            <div className="flex flex-row items-end justify-between pb-2 px-10">
                                <div className="bg-secondary w-3 lg:w-4 h-8 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-16 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-32 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-8 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-16 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-32 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-8 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-16 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-32 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-8 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-16 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-32 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-8 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-16 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-32 rounded-full"></div>
                                <div className="bg-secondary w-3 lg:w-4 h-8 rounded-full"></div>
                            </div>

                            <div className="self-center bg-secondary" style={{ width: '95%', height: 1.2 }}></div>

                            <div className="flex flex-row px-4 py-2 justify-between">
                                <p className="text-primary text-[12px] font-semibold">6am</p>
                                <p className="text-primary text-[12px] font-semibold">10am</p>
                                <p className="text-primary text-[12px] font-semibold">2pm</p>
                                <p className="text-primary text-[12px] font-semibold">6pm</p>
                                <p className="text-primary text-[12px] font-semibold">10pm</p>
                            </div>

                            <div className="absolute inset-0 flex justify-center items-center bg-tertiary bg-opacity-75 rounded-2xl">
                                <p className="text-primary text-lg font-bold px-4 -mt-16">Not enough available data</p>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>

            {/* Gym Details */}
            <div className='flex flex-col h-fit lg:border-4 border-secondary rounded-2xl'>
                <ClickOpen heading='Amenities '>
                    <ListDisplay items={testData.facilities} />
                </ClickOpen>
                <div className="flex lg:mx-4 border-t-[1px] border-secondary"></div>

                <ClickOpen heading='Equipments '>
                    <ListDisplay items={testData.equipmentList} />
                </ClickOpen>
                <div className="flex lg:mx-4 border-t-[1px] border-secondary"></div>

                <ClickOpen heading='Classes '>
                    <ListDisplay items={testData.classes} />
                </ClickOpen>
                <div className="flex lg:mx-4 border-t-[1px] border-secondary"></div>
                
            </div>

            {/* Near You Section */}
            <NearYou 
                heading='CHECK OUT FITNESS CENTRES NEAR YOU'
                headingMobile='FITNESS CENTRES NEAR YOU'
                bg='bg-tertiary'
                headingColor='text-secondary'
                size='-ml-8'
                locationIconColor={themeColors.lightAccent}
                location='Delhi'
                name='GYM NAME'/>
        </div>
    );
}

export default ProductPortfolio;