




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
    const res = await fetch('/audio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Token': 'v1.d1ee064814b044dbaade60f4f098fe48.86400000.1684912005938-1149628490354581520',
            'SessionID': sid
        },
        body: JSON.stringify(body)
    }).then(res => res.arrayBuffer())
    cb && cb(res)
}