import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import {MENU_API} from "../utils/constants";

const RestaurantMenu = () => {
    const [ resList, setResList ] = useState(null);

    const { resId } = useParams();
    const sanitizeResId = resId.replace(":", "");

    useEffect(()=>{
        fetchMenuList();
    }, []);

    const fetchMenuList = async () => {
        const resData = await fetch(MENU_API + sanitizeResId);
        const json = await resData.json();
        console.log(json);
        setResList(json.data);
    }

    if(resList === null) return <Shimmer />

    console.log(resList);
    const { name, cuisines, costForTwoMessage, avgRating } = resList?.cards[2]?.card?.card?.info;
    const { itemCards } = resList?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

    return (
        <div>
            <h2>{name}</h2>
            <p>{cuisines.join(", ")} - {avgRating + " Stars" }</p>
            <p>{costForTwoMessage}</p>
            <h2>List of Menu</h2>
            <ul>
                {itemCards.map(list => 
                    <li key={list.card.info.id}>
                        {list.card.info.name} - Rs {list.card.info.price}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default RestaurantMenu;