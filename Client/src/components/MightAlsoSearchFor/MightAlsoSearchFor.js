import React, { useState } from 'react';
import "../NavBar/navBar.css";

const MightAlsoSearchFor = ({ filterData }) => {

    const selectedFilters = {
        ratings: [],
        genres: [],
        movieTitle:"",
        superId:"",
      };

    const handleClick = (event, item) => {
        event.preventDefault();
        selectedFilters.superId=item;
        filterData(selectedFilters);
    };

    return (
        <div>
            <div className="content-list">
                <div className="list-container">
                    <h3 className="list-header">You might also search for...</h3>
                    <ul className="item-list">
                        <li><a href="#!" onClick={(e) => handleClick(e,"HR")}>Highly-rated 10 movies</a></li>
                        <li><a href="#!" onClick={(e) => handleClick(e, "LR")}>Least-rated 10 movies</a></li>
                        <li><a href="#!" onClick={(e) => handleClick(e, "RL")}>Recently released top 10 movies</a></li>
                        <li><a href="#!" onClick={(e) => handleClick(e, "OR")}>Oldest movies</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MightAlsoSearchFor;
