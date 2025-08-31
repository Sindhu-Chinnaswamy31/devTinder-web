import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
const Connections = () => {
    const connections = useSelector((state) => state.connections); 
    console.log(connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            })
            dispatch(addConnections(res.data.data));
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if(connections.length == 0){
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="flex justify-center text-2xl">No connections</h1>
            </div>
        )
    }

    return (
        <>
            <h1 className="flex justify-center text-2xl my-4">Connections</h1>
            <div className="flex justify-center items-center flex-wrap">
                {connections.map((connection) => (
                    <div key={connection._id} className="card w-200 h-50 bg-base-300 shadow-xl m-4">
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
                                <p className="text-lg font-bold">{connection.fromUserId.firstName} {connection.fromUserId.lastName}</p>
                                <p className="text-md">{connection.fromUserId.phoneNumber}</p>
                                <p className="text-md">{connection.fromUserId.age} - {connection.fromUserId.gender}</p>
                                <p className="text-md">{connection.fromUserId.location}</p>
                                <p className="text-md italic">{connection.fromUserId.bio}</p>
                                </div>
                            </div>
                            </div>
                    </div>
                ))}
            </div>
        </>
        )
};

export default Connections;