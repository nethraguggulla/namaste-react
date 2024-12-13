import { RES_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props;
    const { rating } = resData.info.externalRatings?.aggregatedRating;
    const { slaString } = resData.info?.sla;
    const { name, cuisines, costForTwo, cloudinaryImageId } = resData?.info;
    return (
        <div className='res-card' style={{backgroundColor:"#f0f0f0"}}>
            <img className='res-logo' src={RES_URL + cloudinaryImageId}/>
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{costForTwo}</h4>
            <h4>{rating} Stars</h4>
            <h4>{slaString} MINS</h4>
        </div>
    );
}

export default RestaurantCard;