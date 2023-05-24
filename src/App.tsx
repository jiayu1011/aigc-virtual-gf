import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import {Live2D} from "./components/Live2D";
import {Bubble} from "./components/Bubble";
import {Input} from "./components/Input";
import {useChatGPT} from "./hooks/useChatGPT";
import {useModel} from "./hooks/useModel";

const App = () => {
    const {init, model} = useModel()
    const {fetchStream, getLastChat, chats, replyCompleted} = useChatGPT()

    const chat = useMemo(() => getLastChat(), [chats])

    const handleSynthesize = async () => {
        try {
            if (!chat) return

        } catch (e: any) {
            throw new Error('声音合成失败', e)
        }
    }

    // 请求完成
    useEffect(() => {
        if (!replyCompleted || !chat || !model) return

        handleSynthesize()
        console.log('trigger Tap 1')
        model.motion('Tap', 1)
        model.internalModel.motionManager.on('motionFinish', () => {
        })

    }, [replyCompleted, chat, model])

    return (
        <div>
            <div style={{height: '100vh', width: '100vw', zIndex: '1', position: 'absolute'}}>
                <Live2D {...{init, model}}></Live2D>
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
                <div style={{marginTop: '50px'}}><Bubble text={chat?.content} {...{replyCompleted}} /></div>
                <div style={{marginBottom: '50px'}}><Input {...{fetchStream, getLastChat, chats, replyCompleted}} /></div>
            </div>
        </div>

    );
}

export default App;
