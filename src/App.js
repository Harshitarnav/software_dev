import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

// Import Screens
import HomePage from './Screens/HomePage';
import Marketplace from './Screens/marketplace/Marketplace';
import Listing from './Screens/marketplace/Listing';
import ProductPortfolio from './Screens/marketplace/ProductPortfolio';
import BlogPost from './Screens/marketplace/BlogPost';
import BlogList from './Screens/marketplace/BlogList';

// Import Components
import NavBar_Marketplace from "./components/NavBar_Marketplace";
import BottomBar from "./components/BottomBar";
import { analytics } from "./config/firebase";
import { logEvent } from "firebase/analytics";
import './index.css'; // Import the global stylesheet
import { getLocation } from './helperFunctions/MarketplaceHelper';
import TCPage from './Screens/TCPage';
import Careers from './Screens/careers';
import PPPage from './Screens/PPPage';
import FitnesCenter from './Screens/marketplace/FitnesCenter';

function App() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isGymsDashboard = location.pathname === '/GymsDashboard';

    const [userCity, setUserCity] = useState(null);

    useEffect(() => {
        // Log an event when the user enters the app
        // Capture the user's browser type
        const currentTime = new Date().toISOString();
        const userAgent = navigator.userAgent;
        logEvent(analytics, `${userAgent}, ${currentTime}`);
    }, []);

    useEffect(() => {
        setUserCity(getLocation());
    }, []);

    return (
        <div className="App pt-36" >
            {!isGymsDashboard && (
                <NavBar_Marketplace
                    textColor={isHomePage ? 'text-white' : 'text-black'}
                    borderColor={isHomePage ? 'border-white' : 'border-gray-300'}
                    bgColor={isHomePage ? 'bg-gray-800' : 'bg-white'}
                />
            )}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Marketplace" element={<Marketplace />} />
                <Route path="/Listing" element={<Listing />} />
                <Route path="/ProductPortfolio/:id" element={<ProductPortfolio />} />
                <Route path="/fitnes-center" element={<FitnesCenter />} />
                <Route path="/BlogList" element={<BlogList />} />
                <Route path="/BlogPost" element={<BlogPost />} />
                <Route path="/TCPage" element={<TCPage />} />
                <Route path="/PPPage" element={<PPPage />} />
                <Route path="/careers" element={<Careers />} />
            </Routes>
            {/* Conditionally render the BottomBar */}
            {!isGymsDashboard && <BottomBar />}
        </div>
    );
}

export default App;
