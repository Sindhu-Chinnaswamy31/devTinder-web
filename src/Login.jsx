import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [emailId, setEmailId] = useState("someuser@gamil.com");
    const [pwd, setPwd] = useState("Some@123");

    const handleLogin = async () => {
        try{
             const res = await axios.post("http://localhost:8000/login", {
                email: emailId,
                password: pwd
            })
            console.log(res);
        }catch(err){
            console.log(err);
        }
       
    }

    return (
        <div className="flex justify-center my-10">
            <div className="card card-border bg-base-100 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <label className="label text-md font-semibold">Email</label>
                        <input type="text" placeholder="Email" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                    </div>
                    <div>
                        <label className="label text-md font-semibold">Password</label>
                        <input type="password" placeholder="Password" className="input" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
                    </div>
                    <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;