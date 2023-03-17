import React, { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from './SocketContext';

export const Chat = () => {
    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const chatBoxRef = useRef(null);

    useEffect(() => {
        if (socket == null) return;

        socket.on('message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('message');
        };
    }, [socket]);

    useEffect(() => {
        if (chatBoxRef.current == null) return;
        chatBoxRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (inputValue.trim() === '') {
            return;
        }

        socket.emit('message', {
            timestamp: Date.now(),
            text: inputValue,
        });

        setInputValue('');
    };

    return (
        <div className="wrapper">
            <div className="chat-box">
                {messages.map(({ timestamp, text }, i) => (
                    <div
                        key={timestamp}
                        className={`message ${i % 2 === 0 ? 'right' : 'left'}`}
                    >
                        {text}
                    </div>
                ))}
                <div ref={chatBoxRef} />
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};
