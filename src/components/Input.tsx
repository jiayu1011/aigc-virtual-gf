
export const Input = (props: any) => {
    const {fetchStream} = props

    const handleKeyDown = async (e: any) => {
        if (e.keyCode !== 13) return
        if (!e.target.value) return

        // console.log('send msg', e.target.value)
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