import React from 'react';
import './App.css';
import Live2D from "./components/Live2D";
import {Bubble} from "./components/Bubble";
import {Input} from "./components/Input";
import {useChatGPT} from "./hooks/useChatGPT";

const App = () => {
    const {fetchStream, getLastChat, chats, replyCompleted} = useChatGPT()
    return (
        <div>
            <div style={{height: '100vh', width: '100vw', zIndex: '1', position: 'absolute'}}>
                <Live2D></Live2D>
            </div>
            <div style={{
                height: '100vh',
                width: '100vw',
                zIndex: '2',
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{marginTop: '50px'}}><Bubble {...{fetchStream, getLastChat, chats, replyCompleted}} /></div>
                <div style={{marginBottom: '50px'}}><Input {...{fetchStream, getLastChat, chats, replyCompleted}} /></div>
            </div>
        </div>

    );
}

export default App;
