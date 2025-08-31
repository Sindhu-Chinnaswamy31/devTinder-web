import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || '');
    const [gender, setGender] = useState(user.gender);
    const [bio, setBio] = useState(user.bio);
    const [location, setLocation] = useState(user.location);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleProfileUpdate = async () => {
        try{
            const res = await axios.patch(BASE_URL + "/profile/editProfile/" + user._id, {
                    firstName: firstName,
                    lastName: lastName,
                    age: age,
                    gender: gender,
                    bio: bio,
                    location: location,
                    phoneNumber: phoneNumber
                },
                {
                    withCredentials: true
                }
            );
            dispatch(addUser(res.data.user));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        }catch(err){
            console.log(err);
            setError(err.response.data);
        }
       
    }

    return (
        <>
            {showToast && (
            <div className="toast toast-top toast-start">
                <div className="alert alert-success">
                <span>Profile Updated successfully.</span>
                </div>
            </div>
            )}

            <div className="flex justify-center items-start gap-10 my-10">
            {/* Update Profile Card */}
            <div className="card bg-base-100 shadow-xl w-[400px]">
                <div className="card-body space-y-4">
                <h2 className="card-title justify-center">Update Profile</h2>

                <div>
                    <label className="label text-md font-semibold">First Name</label>
                    <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="label text-md font-semibold">Last Name</label>
                    <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="label text-md font-semibold">Age</label>
                    <input
                    type="number"
                    placeholder="Age"
                    className="input input-bordered w-full"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    />
                </div>

                <div>
                    <label className="label text-md font-semibold">Gender</label>
                    <select
                    className="select select-bordered w-full"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="label text-md font-semibold">Phone Number</label>
                    <input
                    type="text"
                    placeholder="Phone Number"
                    className="input input-bordered w-full"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div>
                    <label className="label text-md font-semibold">Location</label>
                    <input
                    type="text"
                    placeholder="Location"
                    className="input input-bordered w-full"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div>
                    <label className="label text-md font-semibold">Bio</label>
                    <textarea
                    placeholder="Write something about yourself..."
                    className="textarea textarea-bordered w-full"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    />
                </div>

                <p className="text-red-500">{error}</p>

                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={handleProfileUpdate}>
                    Update
                    </button>
                </div>
                </div>
            </div>

            {/* UserCard Preview */}
            <div className="w-[300px]">
                <UserCard
                users={{ firstName, lastName, bio, phoneNumber, age, gender, location }}
                />
            </div>
            </div>
        </>
    );

}

export default EditProfile;