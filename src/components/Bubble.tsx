import {useMemo} from "react";

export const Bubble = (props: any) => {
    const { getLastChat, chats, replyCompleted } = props

    const chat = useMemo(() => {
        return getLastChat()
    }, [chats])

    return (
        <>
            <div>
                {chat && chat.content? chat.content : replyCompleted? 'nothing...':'让我想想...'}
            </div>
        </>
    )
}