import {useEffect, useMemo, useRef, useState} from "react";
import {generateRandomString} from "../../utils/util";
import style from './index.module.scss'

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
        <div className={style.container}>
            <div className={style.wrapper}>
                <input className={style.input} value={text} placeholder='跟我聊聊天吧～' onKeyDown={handleKeyDown} onChange={handleInputChange} />
                <div className={style.buttonGroup}>
                    {!isRecording && <div className={style.audioStartBtn} onClick={handleStartRecording}></div>}
                    {isRecording && <div className={style.audioStopBtn} onClick={handleStopRecording}></div>}
                    <div className={style.sendBtn} onClick={handleChatSubmit}></div>
                </div>
            </div>
        </div>
    )
}