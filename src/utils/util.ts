
export const blob2Base64 = (blob: any) => new Promise((resolve, reject) => {
    const rd = new FileReader()
    rd.onloadend = () => resolve(rd.result)
    rd.readAsDataURL(blob)
})