import { useParams } from "react-router-dom";
import {useState} from "react";

const Chat = () => {
    const { targetUserid } = useParams();
    const [messages, setMessages] = useState([{text : "Hello"}]); // Array to store messages = [];


    return (
        <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-y-scroll p-5">
                {/* Display messages */}
                {messages.map((msg, index) => {
                    return (
                        <div className="bg-gray-500 p-2 rounded" key={index}>
                            {msg.text}
                        </div>
                        
                    )
                })}
            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input type="text" className="flex-1 border border-gray-500 text-white rounded p-2" placeholder="Type a message" />
                <button className="btn btn-primary rounded">Send</button>
            </div>
        </div>
    )
}

export default Chat;