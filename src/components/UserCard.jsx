import  axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({users}) => {
    const {_id, firstName, lastName, bio, phoneNumber, age, gender, location} = users || {};
    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
        try{
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
                withCredentials: true
            })
            console.log(res);
            dispatch(removeFeed(userId));
        }catch(err){
            console.log(err);
        }
    }
    
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <p>{bio}</p>
                <p>{age} - {gender}</p>
                <p>{phoneNumber}</p>
                <p>{location}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-secondary" 
                onClick={() => {handleSendRequest("ignored", _id)}}>Ignore</button>
                <button className="btn btn-primary"
                onClick={() => {handleSendRequest("interested", _id)}}>Intrested</button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;