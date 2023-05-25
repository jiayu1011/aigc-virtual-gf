import {useEffect, useMemo, useRef, useState} from "react";
import {generateRandomString} from "../utils/util";

export const Input = (props: any) => {
    const {fetchStream} = props

    const [text, setText] = useState<string>('')
    const [isRecording, setIsRecording] = useState<boolean>(false)

    const recognitionRef = useRef<any>()


    const handleInputChange = (e: any) => {
        setText(e.target.value)
    }

    const handleKeyDown = (e: any) => {
        if (e.keyCode !== 13) return

        handleChatSubmit()
    }

    const handleChatSubmit = async () => {
        if (!text) {
            alert('输入为空')
            return
        }

        setText('')
        // console.log('send msg', e.target.value)
        try {
            await fetchStream({role: 'user', content: text})
        } catch (e: any) {
            alert(e)
        }
    }

    const handleStartRecording = async () => {
        recognitionRef.current.start()
        setIsRecording(true)
    }

    const handleStopRecording = () => {
        recognitionRef.current.stop()
        setIsRecording(false)
    }

    const taskId = useMemo(() => generateRandomString(32), [])
    const token = '3c1ed2e75c2644d295646faa8173c9d0'
    const appkey = 'HEWr26k1icPoDMa6'
    const instruction = (type: string) => {
        switch (type) {
            case 'start':
                return {
                    "header": {
                        "task_id": taskId,
                        "message_id": generateRandomString(32),
                        "namespace": "SpeechTranscriber",
                        "name": 'StartTranscription',
                        "appkey": appkey
                    },
                    "payload": {
                        // "format": "opus",
                        "sample_rate": 16000,
                        "enable_intermediate_result": true, // 返回中间识别结果
                    }
                }
            case 'stop':
                return {
                    "header": {
                        "task_id": taskId,
                        "message_id": generateRandomString(32),
                        "namespace": "SpeechTranscriber",
                        "name": 'StopTranscription',
                        "appkey": appkey
                    }
                }
        }


    }

    const initSpeechRecognition = async () => {
        const recognition = new (window as any).webkitSpeechRecognition()
        recognition.lang = 'zh-CN'
        recognition.continuous = true // 不中断识别
        // recognition.interimResults = true
        recognition.onresult = (event: any) => {
            console.log(event.results)
            let temp = ''
            for (let i=0;i<Object.keys(event.results).length;i++) {
                temp += event.results[i][0].transcript
            }
            setText(temp)
        }
        recognitionRef.current = recognition
    }
    
    useEffect(() => {
        initSpeechRecognition()
    }, [])

    return (
        <>
            <div style={{display: 'flex'}}>
                <input value={text} placeholder='跟我聊聊天吧～' onKeyDown={handleKeyDown} onChange={handleInputChange} />
                {!isRecording && <button onClick={handleStartRecording}>start recording</button>}
                {isRecording && <button onClick={handleStopRecording}>stop</button>}
                <button onClick={handleChatSubmit}>⬆️</button>
            </div>
        </>
    )
}