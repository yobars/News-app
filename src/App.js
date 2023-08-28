import { isContentEditable } from "@testing-library/user-event/dist/utils";
import React, {Component, useState, useEffect} from "react";

// functional component
const App = () => {
  // state
  const [news, setNews] = useState([]); // by default, news array empty 
  const [searchQuery, setSearchQuery] = useState('react');
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react'); // default url
  const [loading, setLoading] = useState(false);

  // fetch news
  const fetchNews = () => {

    // set loading true
    setLoading(true)
    fetch(url)
    // fetch url and then return a promise, convert to JSON
    .then(result => result.json())
    // .then(data => console.log(data));
    // handle setNews
    .then(data => (setNews(data.hits), setLoading(false)))
    // catch any error
    .catch(error => console.log(error));
  };
 
  // this function will run when component mounts or when there is change in state
  useEffect(() => {
    fetchNews()
  }, [url]); // runs when url changes, when button clicked

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  };

  const handleSubmit = e => {
    e.preventDefault() // so that page doesnt reload
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : "")

  const searchForm = () => (
    <form onSubmit={handleSubmit}> 
        <input type="text" value={searchQuery} onChange={handleChange}/>
        <button>Search</button>
      </form>
  );

  const showNews = () => (
    news.map((n, i) => (
      <p key={i}>{n.title}</p>
    ))
  );
      
  return (
    <div>
      <h2>News App</h2>
      {showLoading()}
      {searchForm()}
      {showNews()}
    </div>
  );
};

// function App() {
//   return(
//     <div>
//         <h2>News App </h2>
        
//     </div>
//   )

// }
  
export default App;

/* NOTES */

/*
Source code -> single div=root , no content
Next.js -> server side rendered, entire content will be there
Enhance Search Engine Optimization
*/

// Added to Github -- done