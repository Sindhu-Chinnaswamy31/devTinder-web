import  axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const getFeed = async () => {

        if(!feed){
            return;
        }
        try{
            const res = await axios.get(BASE_URL + "/feed", {
                withCredentials: true   
            })
            dispatch(addFeed(res.data));
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) return;
   const feedArray = Array.isArray(feed) ? feed : feed?.feed;

// Conditional rendering
if (!feedArray || feedArray.length === 0) {
    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="flex justify-center text-2xl">No feed</h1>
        </div>
    );
}

    return (
        feed && (
        <div className="flex justify-center my-10">
                <UserCard users={feed[0]}/>
        </div>
        )
    )
}

export default Feed;