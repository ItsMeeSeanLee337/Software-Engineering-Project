import React from 'react';
import Navbar from './Navbar';
import '../styles/landing_page.css'; // Import your CSS stylesheet

function Home() {
    return (
        <div>
            <Navbar></Navbar>
            <div className="centered-container">
                <header className="centered-content">
                    <div className="container">
                        <h1>Welcome to Nutripro</h1>
                        <p>Your one-stop solution for a healthier you! Whether your starting your fitness journey or have years of experience, Nutripro can help you set and achieve your nutrition goals. </p>
                        <img src="../images/food.jpg" alt="img for home page on Nutripro" />
                    </div>
                </header>

                <section id="features" className="centered-content features">
                    <div className="container">
                        <div className="feature">
                            <i className="fas fa-utensils"></i>
                            <h2>Meal Planning</h2>
                            <p>Plan your daily meals with our customizable nutrition guide.</p>
                        </div>
                        <img src="../images/food.jpg" alt="img for meal planner page on Nutripro" />
                        <div className="feature">
                            <i className="fas fa-chart-line"></i>
                            <h2>Nutrition Tracking</h2>
                            <p>Track your daily intake and monitor your progress.</p>
                        </div>
                        <img src="../images/food.jpg" alt="img for nutrition tracking page on Nutripro" />
                        <div className="feature">
                            <i className="fas fa-apple-alt"></i>
                            <h2>Healthy Recipes</h2>
                            <p>Discover and cook delicious, healthy recipes.</p>
                        </div>
                        <img src="../images/food.jpg" alt="img for various food" />
                    </div>
                </section>

                <section className="centered-content cta">
                    <div className="container">
                        <h2>Start Your Health Journey Today</h2>
                        <p>Join us and take the first step towards a healthier lifestyle.</p>
                        <a href="/register" className="cta-button">Sign Up Now</a> 
                    </div>
                </section>
                <section className="centered-content cta">
                    <div className="container">
                        <h1>Already have an account?</h1>
                        <p>Log in here:</p>
                        <a href="/login" className="cta-button">login</a> 
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
