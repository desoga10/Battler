import React from 'react';
import {battle} from '../utils/api';
import {FaCompass, FaBriefcase, FaUsers, FaUser, FaUserFriends, FaCode } from 'react-icons/fa';

export default class Results extends React.Component {

    constructor(props){
      super(props)

      this.state = {
        winner: null,
        loser: null,
        error: null,
        loading: true
      }
    }
  componentDidMount () {
    const {playerOne, playerTwo} = this.props

    battle([playerOne, playerTwo])
      .then((players) => {
          this.setState({
            winner: players[0],
            loser: players[1],
            error: null,
            loading: false
          })
      }).catch( ({message}) => {
        this.setState({
          error: message,
          loading: false
        })
      })
  }


  render() {
    const { winner, loser, error, loading} = this.state;

    if(loading === true) {
      return (
        <div>LOADING</div>
      )
    } 
    if(error) {
      return (
      <p className="center-text error">{ error }</p>
      )
    }

    return (
      <div className="grid space-around container-sm">
        {/* Loser Card */}
        <div className="card bg-light">
          <h4>
          {winner.score === loser.score ? 'Tie' : 'Winner'}
          </h4>
          <img 
              className="avatar"
              src={winner.profile.avatar_url}
              alt={`Avatar for ${winner.profile.login}`}
          />
           <h4 className="center-text">
              Score: {winner.score.toLocaleString()}
            </h4>
          <h2 className="center-text"> 
            <a className="link" href={winner.profile.html_url}>
              {winner.profile.login}
            </a>
          </h2>

          <ul className="card-list">
            <li>
              <FaUser color="pink" size={22} />
              {winner.profile.name}
            </li>
            {winner.profile.location && (
              <li>
                <FaCompass color="brown" size={22} />
                {winner.profile.location}
              </li>
            )}
            {winner.profile.company && (
              <li>
                <FaBriefcase color="blue" size={22} />
                {winner.profile.company}
              </li>
            )}
             <li>
              <FaUsers color="yellow" size={22} />
              {winner.profile.followers.toLocaleString()} Followers
            </li>
             <li>
              <FaUserFriends color="orange" size={22} />
              {winner.profile.following.toLocaleString()} following
            </li>
          </ul>
        </div>

        {/* Loser Card */}
        <div className="card bg-light">
          <h4>
          {winner.score === loser.score ? 'Tie' : 'Loser'}
          </h4>
          <img 
              className="avatar"
              src={loser.profile.avatar_url}
              alt={`Avatar for ${loser.profile.login}`}
          />
            <h4 className="center-text">
              Score: {loser.score.toLocaleString()}
            </h4>
          <h2 className="center-text"> 
            <a className="link" href={loser.profile.html_url}>
              {loser.profile.login}
            </a>
          </h2>

          <ul className="card-list">
            <li>
              <FaUser color="pink" size={22} />
              {loser.profile.name}
            </li>
            {loser.profile.location && (
              <li>
                <FaCompass color="brown" size={22} />
                {loser.profile.location}
              </li>
            )}
            {loser.profile.company && (
              <li>
                <FaBriefcase color="blue" size={22} />
                {loser.profile.company}
              </li>
            )}
             <li>
              <FaUsers color="yellow" size={22} />
              {loser.profile.followers.toLocaleString()} Followers
            </li>
             <li>
              <FaUserFriends color="orange" size={22} />
              {loser.profile.following.toLocaleString()} following
            </li>
          </ul>
        </div>
      </div>
    )
  }
}