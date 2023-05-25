export const getAudio = async (text: string, model: any, cb?: Function) => {
    const sid = new Date().getTime() + 'a_whw'

    const body = {
        session_id: sid,
        text: text,
        voice_name: 'meimiyu',
        speed: 50,
        volume: 50,
        sample_rate: 16000,
        audio_format:'wav'
    }
    const res = await fetch(process.env.REACT_APP_AUDIO_URL || '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Token': 'v1.42e0e882d1144b6893de6c50b77a4c57.86400000.1685003823235-1149628490354581520',
            'SessionID': sid
        },
        body: JSON.stringify(body)
    }).then(res => res.arrayBuffer())
    cb && cb(res)
}