import React from 'react';
import PropTypes from 'prop-types';
import {fetchPopularRepos} from '../utils/api';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle} from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';


function LanguageNav ({selected, onUpdateLanguage}) {
  const languages = ["All", "javascript", "Ruby", "Java", "Css", "Python"];       
   return (
    <ul className="flex-center">
     { languages.map( (language) => 
    <li key={language}>
      <button 
        className="btn-clear nav-link"
        style={language === selected ? { color: 'pink'} : null}
        onClick={() => onUpdateLanguage(language)}
        >
        {language}
      </button>
    </li>
   )}
    </ul>)
}

LanguageNav.prototype = {
   selected: PropTypes.string.isRequired,
   onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid ({repos}) {
    return (
      <ul className="grid space-around">
          {repos.map((repo, index) => {
            const  { name, owner, html_url, stargazers_count, forks, open_issues } = repo
            const {login, avatar_url} = owner

            return (
              <li key={html_url}>
                <Card 
                    header={`#${index + 1}`}
                    avatar={avatar_url}
                    href={html_url}
                    name={login}
                >
                  <ul className="card-list">
                    <li>
                      <Tooltip text="Github Username">
                          <FaUser color='red' size={22}/>
                          <a href={`https://github.com/${login}`}>
                              {login}
                          </a>
                      </Tooltip>
                    </li>
                    <li>  
                      <FaStar color='green' size={22}/>
                      {stargazers_count.toLocaleString()} Stars
                    </li>
                    <li>  
                      <FaCodeBranch color='blue' size={22}/>
                      {forks.toLocaleString()} Forks
                    </li>
                    <li>  
                      <FaExclamationTriangle color='gold' size={22}/>
                      {open_issues.toLocaleString()} Open
                    </li>
                  </ul>
                </Card>
              </li>
            )
          }
        )}
      </ul>
    )
} 

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}


export default class  Popular extends React.Component {

        state = {
          selectedLanguage: 'All',
          repos: {},
          error: null
        }

        componentDidMount() {
          this.updateLanguage(this.state.selectedLanguage)
        }

        updateLanguage = (selectedLanguage) => {
          this.setState({
            selectedLanguage,
            error: null
          })


          if(!this.state.repos[selectedLanguage]) {

            fetchPopularRepos(selectedLanguage) 
              .then((data) => {
                this.setState(
                  ({repos}) => ({
                    repos: {
                      repos,
                      [selectedLanguage]: data
                    }
                  }))

              })
              .catch((err) => {
                console.log("Errors Fetching Repositories",err)
  
                this.setState({
                  error: "There Was An Error Fetching The Repositories"
                })
              })
            }
        }

        isLoading = () => {
            const  { selectedLanguage, repos, error} = this.state;
            return !repos[selectedLanguage] && error === null 
        }

         render() {
         const {selectedLanguage, repos, error} = this.state;

         return (
           <React.Fragment>
             <LanguageNav 
              selected = {selectedLanguage}
              onUpdateLanguage = {this.updateLanguage}
             />

             {this.isLoading() && <Loading text='Fetching Repositories' />}

             {error && <p className="center-text error">{error}</p>}

             {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
           </React.Fragment>
         )
      }
}