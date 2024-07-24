import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import '../../styles/components/search/SearchResults.scss';
import { searchBook } from "../../services/BookMange";

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const location = useLocation();

    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (query) {
            setIsSearching(true);
            const fetchSearchBook = async () => {
                try {
                    const response = await searchBook({ query });
                    setResults(response.data);
                    setIsSearching(false);
                } catch (error) {
                    console.error("There was an error fetching the search results!", error);
                    setIsSearching(false);
                }
            };
            fetchSearchBook();
        }
    }, [query]);

    return (
        <div className="search-results-container">
            {isSearching ? (
                <div>Loading...</div>
            ) : (
                <ul className="search-results">
                    {results.map((result, index) => (
                        <Link to={`/book/${result.book_id}`} key={index} className="search-result-item">
                            <div className="result-item-left">
                                <div className="result-item-title">{result.title}</div>
                                <div className="result-item-price">{result.price}</div>
                            </div>
                            <img src={`${result.image}`} alt={result.title} className="result-item-image" />
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;
