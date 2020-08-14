import React from 'react';
import PropTypes from 'prop-types';
import {fetchPopularRepos} from '../utils/api';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle} from 'react-icons/fa'


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
              <li key={html_url} className="repo bg-light">
                <h4 className="header-lg center-text">
                  #{index + 1}
                </h4>
                <img 
                  className="avatar"
                  src={avatar_url}
                  alt={`avatar for ${login}`}
                />
                <h2 className="center-text">
            <a className="link" href={html_url}>{login}</a>
                </h2>
                  <ul className="card-list">
                    <li>
                        <FaUser color='red' size={22}/>
                        <a href={`https://github.com/${login}`}>
                          {login}
                        </a>
                    </li>
                    <li>  
                      <FaUser color='green' size={22}/>
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

        constructor(props){
          super(props)

          this.state = {
            selectedLanguage: 'All',
            repos: {},
            error: null
          }

          this.updateLanguage = this.updateLanguage.bind(this)
          this.isLoading = this.isLoading.bind(this)
        }

        componentDidMount() {
          this.updateLanguage(this.state.selectedLanguage)
        }

        updateLanguage(selectedLanguage) {
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

        isLoading() {
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

             {this.isLoading() && <p>Loading...</p>}

             {error && <p>{error}</p>}

             {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
           </React.Fragment>
         )
      }
}