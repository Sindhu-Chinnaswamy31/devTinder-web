import NavBar from './NavBar';
import {Outlet, useNavigate} from "react-router-dom";
import Footer from './Footer';
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux'; 
import { addUser } from '../utils/userSlice';
import { useEffect } from 'react';

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if(!userData.user){
            return;
        }

        try{
            const res = await axios.get(BASE_URL + "/profile", {
                withCredentials: true
            })
            dispatch(addUser(res.data));
        }catch(err){
           console.log(err);
           return navigate("/Login");
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <NavBar />
            <Outlet /> {/* Renders the matching child route of a parent route or nothing if no child route matches. */}
            <Footer />
       </div>
    )
};

export default Body;