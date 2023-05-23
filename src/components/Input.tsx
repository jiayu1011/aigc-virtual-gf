import {useChatGPT} from "../hooks/useChatGPT";


export const Input = () => {
    const {fetchStream} = useChatGPT()

    const handleKeyDown = (e: any) => {
        if (e.keyCode !== 13) return
        if (!e.target.value) return

        console.log(e.target.value)
        try {
            fetchStream({role: 'user', content: e.target.value})
        } catch (e: any) {
            alert(e)
        }
    }
    return (
        <>
            <input onKeyDown={handleKeyDown}/>
        </>
    )
}