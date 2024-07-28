import React, { useContext, useState } from 'react'
import './SearchBar.css'

import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { StoreContext } from '../../context/StoreContext';


const SearchBar = ({ placeholder, data }) => {

    const {handleFilter,clearInput,handleValue,filterData,setFilterData,

            wordEntered,setwordEntered} = useContext(StoreContext)

    const [srh,setSrh] = useState("")

    const handleSrh = () => {
        const newSrh = srh === "Y" ? "" : "Y";
        setSrh(newSrh);

        const s = document.getElementById("rest");
        const v = document.getElementsByClassName("search");

        if (newSrh === "Y") {
            s.classList.add("search-visible");
            // v.style.removeProperty("width");

            for (let i = 0; i < v.length; i++) {
                v[i].style.width = "300px";
            }
            // v.style.width = "210px";
        } else {
            s.classList.remove("search-visible");
            for (let i = 0; i < v.length; i++) {
                v[i].style.width = "50px";
            }
            // v.style.width = "40px";
        }
    };
    


    

    return (
        <div className='search'>
            <div className="search-inputs">

                <div className="search-icon" onClick={handleSrh}>
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
                            <a href='#explore-menu' onClick={() => handleValue(value.hotel_name)} className='data-item' >
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
