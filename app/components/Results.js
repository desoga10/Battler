import React from 'react';
import {battle} from '../utils/api';
import {FaCompass, FaBriefcase, FaUsers, FaUser, FaUserFriends, FaCode } from 'react-icons/fa';
import Card from './Card';
import PropTypes from 'prop-types';


function ProfileList ({profile}) {
  return (
    <ul className="card-list">
    <li>
      <FaUser color="pink" size={22} />
      {profile.name}
    </li>
    {profile.location && (
      <li>
        <FaCompass color="brown" size={22} />
        {profile.location}
      </li>
    )}
    {profile.company && (
      <li>
        <FaBriefcase color="blue" size={22} />
        {profile.company}
      </li>
    )}
     <li>
      <FaUsers color="yellow" size={22} />
      {profile.followers.toLocaleString()} Followers
    </li>
     <li>
      <FaUserFriends color="orange" size={22} />
      {profile.following.toLocaleString()} following
    </li>
  </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
}
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
        {/* Winner Card */}
        <Card 
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
        >
          <ProfileList profile={winner.profile} />
        </Card>
          

        {/* Loser Card */}
      
          <Card
              header={winner.score === loser.score ? 'Tie' : 'Loser'}
              subheader={`Score: ${loser.score.toLocaleString()}`}
              avatar={loser.profile.avatar_url}
              name={loser.profile.login}
              href={loser.profile.html_url}
          >
              <ProfileList profile={loser.profile} />
          </Card>
        </div>
      )
  }
}