import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
const Requests = () => {
    const requests = useSelector((state) => state.requests); 
    console.log(requests);
    const dispatch = useDispatch();
    
    const reviewRequest = async (status, requestId) => {
        try{
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, {}, {
                withCredentials: true
            })
            dispatch(removeRequest(res.data.data._id));
        }catch(err){
            console.log(err);
        }
    }

    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/recivied", {
                withCredentials: true
            })
            dispatch(addRequests(res.data.data));
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if(requests.length == 0){
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="flex justify-center text-2xl">No Requests</h1>
            </div>
        )
    }

    return (
        <>
            <h1 className="flex justify-center text-2xl my-4">Connectoion Requests</h1>
            <div className="flex justify-center items-center flex-wrap">
                {requests.map((request) => (
                    <div key={request._id} className="card w-120 h-50 bg-base-300 shadow-xl m-4">
                        <div className="card-body">
                            <div className="flex items-center gap-4">
                                {/* Image on left */}
                                <div className="flex-shrink-0">
                                <img 
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                                    alt="User" 
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                </div>

                                {/* Details on right */}
                                <div className="flex flex-col">
                                <p className="text-lg font-bold">{request.fromUserId.firstName} {request.fromUserId.lastName}</p>
                                <p className="text-md">{request.fromUserId.phoneNumber}</p>
                                <p className="text-md">{request.fromUserId.age} - {request.fromUserId.gender}</p>
                                <p className="text-md">{request.fromUserId.location}</p>
                                <p className="text-md italic">{request.fromUserId.bio}</p>
                                </div>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-outline btn-primary"
                                    onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                                    <button className="btn btn-outline btn-secondary"
                                    onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                                </div>
                            </div>
                            </div>
                    </div>
                ))}
            </div>
        </>
        )
};

export default Requests;