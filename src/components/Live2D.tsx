import {useModel} from "../hooks/useModel";
import {useEffect} from "react";


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

export default Live2D