import axios from "axios";
import {BASE_URL} from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
    const [isUserPremium, setIsUserPremium] = useState(false);
    useEffect(() => {
        verifyPremiumUser();
    }, []);

    const verifyPremiumUser = async () => {
        const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
        });

        if (res.data.isPremium) {
        setIsUserPremium(true);
        }
    };

    const handleBuyClick = async (type) => {
        const order = await axios.post(BASE_URL + "/payment/create", 
            {
                memberShipType: type,
                amount: 500
            },
            {
                withCredentials: true,
            }
        );
        console.log(order);
        const { amount, keyId, currency, notes, orderId } = order.data;

        const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
            name: notes.firstName + " " + notes.lastName,
            email: notes.emailId,
            contact: "9999999999",
        },
        theme: {
            color: "#F37254",
        },
        handler: verifyPremiumUser,
        };
        //It should open the razorpay payment dailogbox
        const rzp = new window.Razorpay(options);
        rzp.open(); 
    }

    return isUserPremium ? (
       <h1 className="flex justify-center text-2xl my-4">You're are already a premium user</h1>
    ) : (
        <>
            <div>
                <h1 className="flex justify-center text-2xl my-4">Choose your premium</h1>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex w-full">
                    <div className="card bg-base-300 rounded-box grid h-100 grow place-items-center">
                        <h2>Silver membership</h2>
                        <ul className="relative bottom-08">
                            <li>- Chat with other personas.</li>
                            <li>- 100 connection perday.</li>
                            <li>- 3 Months.</li>
                        </ul>
                        <button className="btn btn-primary" onClick={() => handleBuyClick("silver")}>Subscribe</button>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="card bg-base-300 rounded-box grid h-100 grow place-items-center">
                        <h2>Gold membership</h2>
                        <ul className="relative bottom-08">
                            <li>- Chat with other personas.</li>
                            <li>- 200 connection perday.</li>
                            <li>- 6 Months.</li>
                        </ul>
                        <button className="btn btn-primary" onClick={() => handleBuyClick("gold")}>Subscribe</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Premium;