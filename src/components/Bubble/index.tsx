import {memo, ReactNode, useMemo} from "react";
import style from './index.module.scss'
export const Bubble = memo((props: {
    needsFaceIcon: boolean,
    children: ReactNode
}) => {
    const { needsFaceIcon } = props

    return (
        <div className={style.container}>
            <div className={style.bubbleHead}></div>
            <div className={style.wrapper}>
                {props.children}
            </div>
        </div>
    )
})