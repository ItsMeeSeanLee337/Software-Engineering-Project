import React from 'react'
import {Link} from 'react-router-dom';
function NavDropDown() {

  const urlParams = new URLSearchParams(window.location.search);
  const dataToSend = urlParams.get('data');
  return (
      <div style={{marginTop: '10px'}} className="noDecoration">
        <ul className="noDecoration">
          <li className="noDecoration">
              <Link id = 'goToDisplayRecipe' to={`/display-custom-recipes?data=${dataToSend}`}>Custom Recipes</Link>
          </li>
        </ul>
      </div>
  )
}

export default NavDropDown