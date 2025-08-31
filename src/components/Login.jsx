import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [pwd, setPwd] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isloginform, setLoginform] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const handleLogin = async () => {
        try{
            const res = await axios.post(BASE_URL + "/login", {
                    email: emailId,
                    password: pwd
                },
                {
                    withCredentials: true
                }
            );
            dispatch(addUser(res.data));
            return navigate("/feed");
        }catch(err){
            console.log(err);
            setError(err.response.data);
        }
       
    }

    const handleSignUP = async () => {
        try{
            const res = await axios.post(BASE_URL + "/signUp", {
                    email: emailId,
                    password: pwd,
                    firstName: firstName,
                    lastName: lastName
                },
                {
                    withCredentials: true
                }
            );
            dispatch(addUser(res.data.user));
            return navigate("/profile");
        }catch(err){
            console.log(err);
            setError(err.response.data);
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="card card-border bg-base-100 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isloginform ? "Login" : "Sign Up"}</h2>
                    <div>
                        <label className="label text-md font-semibold">Email</label>
                        <input type="text" placeholder="Email" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                    </div>
                    <div>
                        <label className="label text-md font-semibold">Password</label>
                        <input type="password" placeholder="Password" className="input" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
                    </div>
                    {!isloginform && (
                        <>
                            <div>
                                <label className="label text-md font-semibold">First Name</label>
                                <input type="text" placeholder="First Name" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                            </div>
                            <div>
                                <label className="label text-md font-semibold">Last Name</label>
                                <input type="text" placeholder="Last Name" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                            </div>
                        </>
                    )}
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={isloginform ? handleLogin : handleSignUP}>{isloginform ? "Login" : "Sign Up" }</button>
                    </div>
                    <p className="flex justify-center cursor-pointer py-5" onClick={
                        () => {setLoginform((value) => !value)}
                    }>{isloginform ? "New User? SignUp Here" : "Existing User Login Here"} </p>
                </div>
            </div>
        </div>
    )
};

export default Login;