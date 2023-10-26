'../styles/Nutritionalinfo.css'
import React from 'react';


function NutritionalInfo() {
  return (
    <div>
      <header>
        <h1>Nutritional Information</h1>
        <h2>Banana</h2>
      </header>

      <div className="nutritional-info">
        <img src="banana.jpg" alt="Banana" id="banana-image" />
        <h2>Nutritional Content per 100g:</h2>
        <p>
          <span className="nutrient-label">Calories:</span>
          <span className="nutrient-value">89</span> kcal
        </p>
        <p>
          <span className="nutrient-label">Fats:</span>
          <span className="nutrient-value">0.3g</span>
        </p>
        <p>
          <span className="nutrient-label">Saturated Fats:</span>
          <span className="nutrient-value">0.1g</span>
        </p>
        <p>
          <span className="nutrient-label">Sugars:</span>
          <span className="nutrient-value">12g</span>
        </p>
        <p>
          <span className="nutrient-label">Salts:</span>
          <span className="nutrient-value">0.01g</span>
        </p>
      </div>
    </div>
  );
}

export default NutritionalInfo;

//OR:
const bananaData = {
    name: 'Banana',
    image: 'banana.jpg',
    nutritionalInfo: {
      Calories: '89 kcal',
      Fats: '0.3g',
      'Saturated Fats': '0.1g',
      Sugars: '12g',
      Salts: '0.01g',
    },
  };
  
  const appleData = {
    name: 'Apple',
    image: 'apple.jpg',
    nutritionalInfo: {
      Calories: '52 kcal',
      Fats: '0.2g',
      'Saturated Fats': '0.03g',
      Sugars: '14g',
      Salts: '0.002g',
    };
  };
  
  // Use the NutritionalInfo component with different food data
  <NutritionalInfo foodData={bananaData} />;
  <NutritionalInfo foodData={appleData} />;
  

function NutritionalInfo({ foodData }) {
  const { name, image, nutritionalInfo } = foodData;

  return (
    <div>
      <header>
        <h1>Nutritional Information</h1>
        <h2>{name}</h2>
      </header>

      <div className="nutritional-info">
        <img src={image} alt={name} id="food-image" />
        <h2>Nutritional Content per 100g:</h2>
        {Object.keys(nutritionalInfo).map((nutrient) => (
          <p key={nutrient}>
            <span className="nutrient-label">{nutrient}:</span>
            <span className="nutrient-value">{nutritionalInfo[nutrient]}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default NutritionalInfo;


