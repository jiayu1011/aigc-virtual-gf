import {memo} from "react";
import style from './index.module.scss'

export const Bubble = memo((props: {
    text: string,
    needsFaceIcon: boolean
}) => {
    const { text, needsFaceIcon } = props

    return (
        <div className={style.container}>
            <div>{text ?? '让我想想...'}</div>
        </div>
    )
})