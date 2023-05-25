import {useEffect} from "react";
import {memo} from "react";


export const Live2D = memo((props: any) => {
    const { init } = props

    useEffect(() => {
        init()
    }, [])

    return (
        <>
            <canvas id='canvas'></canvas>
        </>
    )
})
