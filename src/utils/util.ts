export const blob2Base64 = (blob: any) => new Promise((resolve, reject) => {
    const rd = new FileReader()
    rd.onloadend = () => resolve(rd.result)
    rd.readAsDataURL(blob)
})

export const generateRandomString = (len: number) => {
    const set = '1234567890abcdef'
    let res = ''
    for (let i=0;i<len;i++) {
        res += set[Math.floor(Math.random()*set.length)]
    }
    return res
}