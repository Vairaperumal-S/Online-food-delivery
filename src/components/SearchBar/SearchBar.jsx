import React, { useState } from 'react'
import './SearchBar.css'

import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";


const SearchBar = ({ placeholder, data }) => {

    const [filterData, setFilterData] = useState([]);
    const [wordEntered, setwordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setwordEntered(searchWord);

        const newFilter = data.filter((value) => {
            return value.hotel_name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilterData([]);
        }
        else {
            setFilterData(newFilter);
        }
    };

    const clearInput = () => {
        setFilterData([]);
        setwordEntered("");
    }

    const handleValue = (arg) => {
        // let restaurant = document.getElementById("rest");
        let ans = arg;
        console.log(ans+"\t");
        // console.log(arg);
        setwordEntered(ans);
        if (ans !== "") {
            setFilterData([]);
        }
    }

    return (
        <div className='search'>
            <div className="search-inputs">

                <div className="search-icon">
                    {/* {(filterData.length === 0 && wordEntered === "") ? <CiSearch /> : <div></div>} */}
                    <CiSearch />
                </div>

                <input id='rest' type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter} />

                <div className="search-icon">
                    {(filterData.length === 0 && wordEntered === "") ? <div></div>: <IoIosClose id='clearBtn' onClick={clearInput} />}
                </div>
            </div>
            {filterData.length != 0 && (
                <div className="data-result">
                    {filterData.slice(0, 8).map((value, key) => {
                        // console.log(value.hotel_id)
                        return (
                            <a onClick={() => handleValue(value.hotel_name)} className='data-item' >
                                <p id={value.hotel_id}>{value.hotel_name}</p>
                            </a>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar
