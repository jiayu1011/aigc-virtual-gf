import React, {useEffect, useMemo, useState} from 'react';
import {Live2D} from "./components/Live2D";
import {Bubble} from "./components/Bubble";
import {Input} from "./components/Input";
import {useChatGPT} from "./hooks/useChatGPT";
import {useModel} from "./hooks/useModel";
import style from './App.module.scss';

const App = () => {
    const {init, lipSync, model} = useModel()
    const {fetchStream, getLastChat, chats, replyCompleted} = useChatGPT()

    const chat = useMemo(() => getLastChat(), [chats])

    const handleSynthesize = async () => {
        try {
            if (!chat) return

            lipSync(chat.content)
        } catch (e: any) {
            throw new Error('声音合成失败', e)
        }
    }

    // 请求完成
    useEffect(() => {
        if (!replyCompleted || !chat || !model) return

        handleSynthesize()
    }, [replyCompleted, chat, model])

    return (
        <div className={style.container}>
            <div className={style.live2d}>
                <Live2D {...{init, model}}/>
            </div>
            <div className={style.mask}>
                {replyCompleted && <Bubble text={chat?.content} needsFaceIcon />}
                <Input {...{fetchStream, getLastChat, chats, replyCompleted}} />
            </div>
        </div>

    );
}

export default App;
