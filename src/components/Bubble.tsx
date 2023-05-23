import {useChatGPT} from "../hooks/useChatGPT";
import {useMemo} from "react";

export const Bubble = () => {
    const { getLastChat, chats, replyCompleted } = useChatGPT()

    const chat = useMemo(() => getLastChat(), [chats])

    return (
        <>
            <div>
                {chat && chat.content? chat.content : replyCompleted? 'nothing...':'让我想想...'}
            </div>
        </>
    )
}