import React from 'react';
import Navbar from './Navbar';
import '../styles/landing_page.css'; // Import your CSS stylesheet

function Home() {
    return (
        <div>
            <div className="centered-container">
                <header className="centered-content">
                    <h1>Welcome to Nutripro</h1>
                    <p>Your one-stop solution for a healthier you! Whether your starting your fitness journey or have years of experience, Nutripro can help you set and achieve your nutrition goals. </p>
                    <img src={require('../images/placeholder.jpg')} alt="img for home page on Nutripro" />
                </header>
                <section id="features" className="centered-content features">
                    <div className="feature">
                        <i className="fas fa-utensils"></i>
                        <h2>Meal Planning</h2>
                        <p>Plan your daily meals with our customizable nutrition guide.</p>
                    </div>
                    <img src={require('../images/placeholder.jpg')} alt="img for meal planner page on Nutripro" />
                    <div className="feature">
                        <i className="fas fa-chart-line"></i>
                        <h2>Nutrition Tracking</h2>
                        <p>Track your daily intake and monitor your progress.</p>
                    </div>
                    <img src={require('../images/placeholder.jpg')} alt="img for nutrition tracking page on Nutripro" />
                    <div className="feature">
                        <i className="fas fa-apple-alt"></i>
                        <h2>Healthy Recipes</h2>
                        <p>Discover and cook delicious, healthy recipes.</p>
                    </div>
                    <img src={require('../images/placeholder.jpg')} alt="img for various food" />
                </section>
                <section className="centered-content cta">
                    <h2>Start Your Health Journey Today</h2>
                    <p>Join us and take the first step towards a healthier lifestyle.</p>
                    <a href="/register" className="cta-button">Sign Up Now</a> 
                </section>
                <section className="centered-content cta">
                    <h1>Already have an account?</h1>
                    <a href="/Login" className="cta-button">Login</a> 
                </section>
            </div>
        </div>
    );
}

export default Home;
