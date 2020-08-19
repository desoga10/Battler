import React from 'react';
import {ThemeConsumer} from '../context/theme'
import {NavLink} from 'react-router-dom';

const activeStyle = {
  color: 'red'
}

export default function Nav () {
  return (
    <ThemeConsumer>
      { ({theme, toggleTheme}) => (
        <nav className="row space-between">
          <ul className="row-nav">
              <li className="spacer">
                <NavLink 
                    to="/" 
                    exact
                    activeStyle={activeStyle}
                    className="nav-link">
                    Popular
                </NavLink>
              </li>
              <li>
                <NavLink 
                    to="/battle"
                    activeStyle={activeStyle} 
                    className="nav-link">
                      Battle
                </NavLink>
              </li>
          </ul>



          <button
            style={{fontSize: 30}}
            className="btn-clear"
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🕶' : '🚈'}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  )
}