import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Form, Input } from "reactstrap";
import '../../styles/components/search/SearchInput.scss'
import { searchBook } from "../../services/BookMange";
import { Link } from "react-router-dom";


const SearchInput = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchContainerRef = useRef(null);
    const [showResult, setShowResult] = useState(true)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowResult(false)
            } else {
                setShowResult(true)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (query.length > 2) {
            setIsSearching(true);
            const fetchSearchBook = async () => {
                try {
                    const response = await searchBook({ query });
                    setResults(response.data)
                    setIsSearching(false)
                } catch (error) {
                    console.error("There was an error fetching the search results!", error);
                    setIsSearching(false);
                }
            }
            fetchSearchBook()
        } else {
            setResults([]);
        }
    }, [query]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className="search-container" ref={searchContainerRef}>
            <Form className="search-form">
                <Input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for books..."
                />
                <button type="button" className="search-icon">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </Form>
            <ul className="search-results">
                {isSearching ? <div>Loading...</div> : (showResult ?
                    results.map((result, index) => (
                        <Link to={`/book/${result.book_id}`} key={index} className="search-result-item">
                            <div className="result-item-left">
                                <div className="result-item-title">{result.title}</div>
                                <div className="result-item-price">{result.price}</div>
                            </div>
                            <img src={`${result.image}`} alt={result.title} className="result-item-image" />
                        </Link>
                    )
                    ) : <></>)
                }
            </ul>
        </div>
    )
}
export default SearchInput