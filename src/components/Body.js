import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';
import { useEffect, useState } from 'react';

const Body = () => {

    const [listOfRestaurant, setListOfRestaurant] = useState([]);

    const [filteredRestuarant, setFilteredRestuarant] = useState([]);

    const [searchText, setSearchText] = useState("");

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.37240&lng=78.43780&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        const api_data = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setListOfRestaurant(api_data);
        setFilteredRestuarant(api_data);
    }
   
    return listOfRestaurant.length === 0 ? <Shimmer /> : (
        
        <div className='body'>
            <div className='filter'>
                <div className='search'>

                    <input type="text" className='search-inpt' value={searchText} onChange={(e)=>{
                        setSearchText(e.target.value);
                    }}/>

                    <button className="search-btn" onClick={()=>{
                        const filteredSearchRes = listOfRestaurant.filter(
                            (res)=>res.info.name.toLowerCase().includes(searchText.toLocaleLowerCase())
                        );
                        console.log(filteredSearchRes);
                        setFilteredRestuarant(filteredSearchRes);
                    }}>Search</button>

                </div>
                <button className='filter-btn' onClick={() => {
                    const filteredList = listOfRestaurant.filter(
                        (res) => res.info.avgRating > 4
                    );
                    console.log(filteredList);
                    setListOfRestaurant(filteredList);
                }} >Top Rated Restaurants</button>

            </div>

            <div className='rest-container'>
               {
                    filteredRestuarant.map( restaurant => <RestaurantCard key={restaurant.info.id} resData={restaurant}/>)
               }
            </div>
        </div>
    );
}

export default Body;