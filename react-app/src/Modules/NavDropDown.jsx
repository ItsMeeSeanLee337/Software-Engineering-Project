import React from 'react'
import {Link} from 'react-router-dom';
function NavDropDown() {
  return (
      <div style={{marginTop: '10px'}} className="noDecoration">
        <ul className="noDecoration">
          <li className="noDecoration">
              <Link to="/display-custom-recipes">Custom Recipes</Link>
          </li>
          
        </ul>
      </div>
  )
}

export default NavDropDown