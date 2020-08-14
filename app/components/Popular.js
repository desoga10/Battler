import React from 'react';
import PropTypes from 'prop-types';
import {fetchPopularRepos} from '../utils/api'


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


export default class  Popular extends React.Component {

        constructor(props){
          super(props)

          this.state = {
            selectedLanguage: 'All',
            repos: null,
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
            error: null,
            repos: null
          })

          fetchPopularRepos(selectedLanguage)
            .then((repos) =>this.setState({
              repos,
              error: null
            }))
            .catch((err) => {
              console.log("Errors Fetching Repositories",err)

              this.setState({
                error: "There Was An Error Fetching The Repositories"
              })
            })
        }

        isLoading() {
          return this.state.repos === null && this.state.error === null;
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

             {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
           </React.Fragment>
         )
      }
}