import {useState} from "react";
import {systemMessage} from "../utils/constants";
import {OpenAIChatStream} from "../utils/OpenAIStream";


export const useChatGPT = () => {
    const [chats, setChats] = useState<Message[]>([])
    const [replyCompleted, setReplyCompleted] = useState(true)

    const fetchStream = async (chat: Message) => {

        const messages: Message[] = [
            {role: 'system', content: systemMessage},
            ...chats,
            chat
        ]

        try {
            setReply('', true)
            setReplyCompleted(false)

            const payload: OpenAIStreamPayload = {
                //model: "gpt-4",
                model: "gpt-3.5-turbo",
                messages: messages,
                temperature: 0.7,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                max_tokens: 1000,
                stream: true,
                n: 1,
            };

            const data = await OpenAIChatStream(payload)
            if (!data) return

            console.log('fetch chatgpt', data)

            const reader = data.getReader()
            const decoder = new TextDecoder()
            let done = false
            // 解码二进制流
            while (!done) {
                const {value, done: doneReading} = await reader.read()
                done = doneReading
                const chunkValue = decoder.decode(value)
                setReply(chunkValue, false) // 每解码一段数据，就附加到chats结尾
            }
            setReplyCompleted(true)
        } catch (e: any) {
            alert(e)
        }
    }

    const setReply = (value: string, isNew: boolean) => {
        setChats((old) => {
            // 判断是否是对于新问题的回答
            if (isNew) {
                return [...old, {role: 'assistant', content: value}]
            } else {
                // 如果是同一问题的回答，则在最后一个回答的基础上附加
                const lastMsg = {...old[old.length-1]}
                const newLastMsg = {...lastMsg, content: lastMsg.content + value}
                return [...old.slice(0, -1), newLastMsg]
            }
        })
    }

    const getLastChat = () => {
        return chats.filter(item => item.role === 'assistant').slice(-1)[0]
    }

    return {
        fetchStream,
        getLastChat,
        chats,
        replyCompleted
    }
}