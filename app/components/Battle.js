import React from 'react'
import {FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle} from 'react-icons/fa'
import PropTypes from 'prop-types';
import {ThemeConsumer} from '../context/theme'
import { Link } from 'react-router-dom'


function Instructions() {
  return (
  
    <ThemeConsumer>
      {({theme}) => (
          <div className='instructions-container'>
          <h1 className='center-text header-lg'>
            Instructions
          </h1>
          <ol className='container-sm grid center-text battle-instructions'>
            <li>
              <h3 className='header-sm'>Enter two Github users</h3>
              <FaUserFriends className={`bg-${theme}`} color='rgb(255, 191, 116)' size={140} />
            </li>
            <li>
              <h3 className='header-sm'>Battle</h3>
              <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
            </li>
            <li>
              <h3 className='header-sm'>See the winners</h3>
              <FaTrophy className={`bg-${theme}`} color='rgb(255, 215, 0)' size={140} />
            </li>
          </ol>
        </div>
      )}
      
    </ThemeConsumer>
  )
}

class PlayerInput extends React.Component {
    state = {
      username: ''
  }
 
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.username)
   }

  handleChange = (event) => {
    this.setState({ 
      username: event.target.value
    })
  }


  render() {
    return (

        <ThemeConsumer>
          {({theme}) => (
            <form className="column player" onSubmit={this.handleSubmit}>
             <label htmlFor="username" className="player-label">
               {this.props.label}
             </label>
 
             <div className="row player-inputs">
             <input 
                 type="text"
                 id="username"
                 className={`input-${theme}`}
                 placeholder="Github Username"
                 autoComplete="off"
                 value={this.state.username}
                 onChange={this.handleChange}
             />
             <button
                 className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
                 type="submit"
                 disabled={!this.state.username}
             >
               Submit
             </button>
             </div>
            </form>
          )}
         
        </ThemeConsumer>
    )
  }
}

  PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
  }

  function PlayerPreview({userName, onReset,label}) {
      return (
          <ThemeConsumer>
            {({theme}) => (
              <div className="column player">
               <h3 className="player-label">{label}</h3>
                <div className={`row bg-${theme}`}>
                 <div className="player-info">
                   <img 
                       className="avatar-small"
                       src={`https://github.com/${userName}.png?size=200`}
                       alt={`Avatar for ${userName}`}    
                   />
                   <a 
                       className="link"
                       href={`https://github.com/${userName}`}
                   >
                       {userName}
                   </a>
                 </div>
                 <button className="btn-clear flex-center" onClick={onReset}>
                   <FaTimesCircle color="brown"/>
                 </button>
                 </div>
               </div>
            )}
          </ThemeConsumer>
      )
  }

export default class Battle extends React.Component {
   state = {
    playerOne: null,
    playerTwo: null
  }

  handleSubmit = (id,player) => this.setState({ [id]: player })
  handleReset = (id) => this.setState({ [id]: null })
  

render(){
  const { playerOne, playerTwo} = this.state
  
  return (
    <React.Fragment>
      <Instructions />
      <div className="players-container">
        <h1 className="center-text header-lg">Players</h1>

        <div className="row space-around">
            {playerOne === null ? 
              <PlayerInput 
                  label="playerOne"
                  onSubmit = {(player) => this.handleSubmit('playerOne', player)}
              />
              : <PlayerPreview 
                  userName={playerOne} 
                  label="Player One" 
                  onReset={() => this.handleReset('playerOne')}  
              />
            }  
            {playerTwo === null ? 
                 <PlayerInput 
                  label="playerTwo"
                  onSubmit = {(player) => this.handleSubmit('playerTwo', player)}
              /> 
              :  <PlayerPreview 
                  userName={playerTwo} 
                  label="Player Two" 
                  onReset={() => this.handleReset('playerTwo')}  
          />
            }  
        </div>

        {playerOne && playerTwo && (
          <Link
            className="btn dark-btn btn-space"
            to={{
              pathname: '/battle/results',
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </React.Fragment>
  )
}

}