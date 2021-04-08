import React, {useState, useEffect} from 'react';
import {getGenres} from '../actions/genreActions';

const Search = () => {
    const [data, setData] = useState({
        genres: [],
        genre: '',
        search: '',
        results: [],
        searched: false,
    });

    const {genres, genre, search, results, searched} = data;

    const loadGenres = () => {
        getGenres().then(data => {
            if(data.error) {
                console.log(data.error) 
            }else {
                setData({...data, genres: data})
            }
        })
    }

    useEffect(() => {
        loadGenres();
    }, []);

    return(
        <div>
            <h2>Search Bar NICE TO HAVE</h2>
        </div>
    )
}

export default Search;