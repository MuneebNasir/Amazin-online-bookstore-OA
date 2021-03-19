import React from "react";
import SearchBar from "./BookInterface/searchBar";


let App = (props) => {

    return (
        <div className="banner-text" style={{margin: 0, padding: 0, display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <h1 className="headline" >
                Welcome To Amazin Book Store
            </h1>
            <SearchBar books={props.books}/>
        </div>);
}

export default App;