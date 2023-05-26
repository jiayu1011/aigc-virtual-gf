import {useEffect} from "react";
import {memo} from "react";
import style from './index.module.scss'

export const Live2D = memo((props: any) => {
    const { init } = props

    useEffect(() => {
        init()
    }, [])

    return (
        <div className={style.container}>
            <canvas id='canvas'></canvas>
        </div>
    )
})
