import {memo} from "react";

export const Bubble = memo((props: any) => {
    const { text, replyCompleted } = props

    return (
        <>
            <div>
                {text? text : replyCompleted? 'nothing...':'让我想想...'}
            </div>
        </>
    )
})