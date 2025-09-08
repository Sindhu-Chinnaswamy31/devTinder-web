import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {createSocketConnection} from "../utils/socket";
import {useSelector} from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const { targetUserid } = useParams();
    const [messages, setMessages] = useState([]); // Array to store messages = [];
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector(store => store.user.user);
    const userId = user?._id;

    const fetchChatMessages = async () => {
        try{
            const chat = await axios.get(BASE_URL + "/chat/" + targetUserid, {
                withCredentials: true
            });
            console.log(chat);
            const chatMessages = chat?.data?.messages.map(msg => {
                const {senderId, text} = msg;
                return {
                    firstName: senderId?.firstName,
                    lastName: senderId?.lastName,
                    text: text,
                    senderId:senderId?._id
                }
            });
            setMessages(chatMessages);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {
        if(!userId){
            return;
        }
        const socket = createSocketConnection();
        //As soon as the page loaded, the socket connection is made and join chat event is emited
        socket.emit("joinChat", {
            firstName : user.firstName,
            userId,
            targetUserid
        });

        socket.on("messageRecivied", ({firstName,lastName,text, senderId}) => {
            setMessages(messages => [...messages, { firstName, lastName, text, senderId }]);
        });

        return () => {
            socket.disconnect();
        }

    }, [userId, targetUserid]);

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName : user.firstName,
            lastName : user.lastName,
            userId,
            targetUserid,
            text : newMessage,
            senderId: userId
        });
        setNewMessage("");
    }

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-y-scroll p-5">
                {/* Display messages */}
                {messages.map((msg, index) => {
                    const isMe = msg.senderId === userId; // 👈 Check if message is from current user

                    return (
                        <div key={index} className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Chat Avatar"
                                        src={isMe
                                            ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                                            : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"}
                                    />
                                </div>
                            </div>
                            <div className="chat-header">
                                {`${msg.firstName} ${msg.lastName}`}
                                <time className="text-xs opacity-50">12:45</time>
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            <div className="chat-footer opacity-50">
                                {isMe ? "Seen" : "Delivered"}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    type="text" className="flex-1 border border-gray-500 text-white rounded p-2" 
                    placeholder="Type a message" />
                <button onClick={sendMessage} className="btn btn-primary rounded">Send</button>
            </div>
        </div>
    )
}

export default Chat;