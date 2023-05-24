import {useModel} from "../hooks/useModel";
import {useEffect} from "react";
import {memo} from "react";


const Live2D = () => {
    const { init } = useModel()

    useEffect(() => {
        init()
    }, [])

    return (
        <>
            <canvas id='canvas'></canvas>
        </>
    )
}

export default memo(Live2D)