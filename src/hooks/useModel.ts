import {useState} from "react";
import * as PIXI from 'pixi.js'
import {Live2DModel, MotionPriority} from "pixi-live2d-display";
import {getAudio} from "../utils/voicevox";
import {blob2Base64} from "../utils/util";

if (!process.env.REACT_APP_MODEL_PATH) {
    throw new Error("missing model path")
}

export const useModel = () => {
    const [model, setModel] = useState<any>() // live2d model
    const [app, setApp] = useState<any>() // pixi app

    const motionManager = model?.internalModel.motionManager

    const initLive2D = async (t?: PIXI.Application) => {
        const current = t ?? app
        if (!current) return

        const model = await Live2DModel.from(process.env.REACT_APP_MODEL_PATH || '')

        // console.log('model', model)

        current.stage.addChild(model)

        model.anchor.set(0.5, 0.5)

        const modelAspectRatio = model.width / model.height
        const screenAspectRatio = current.view.width / current.view.height
        let scale = 1
        if (screenAspectRatio > modelAspectRatio) {
            scale = current.view.height / model.height
        } else {
            scale = current.view.width / model.width
        }

        // 全身
        // model.scale.set(scale * 1)
        // model.position.set(current.view.width / 2, current.view.height / 2)

        // 半身
        model.scale.set(scale * 1.8)
        model.position.set(current.view.width / 2, current.view.height * 0.85)

        setModel(model)
    }

    const init = () => {
        if (!window) return

        (window as any).PIXI = PIXI

        const canvas = document.getElementById('canvas')
        if (!canvas) return

        const pixiApp = new PIXI.Application({
            view: canvas as HTMLCanvasElement,
            resizeTo: window,
            transparent: true
        })


        setApp(pixiApp)
        initLive2D(pixiApp)
    }

    const lipSync = async (text: string) => {
        if (!model || !app || !text) return

        // console.log('before get audio', text)
        await getAudio(text, model, async (data: any) => {
            const blob = new Blob([data], { type: 'audio/wav' })
            const b64: any = await blob2Base64(blob)

            model.motion('Happy', 0, MotionPriority.NORMAL, b64)

        })
    }


    return {
        model,
        app,
        init,
        lipSync
    }
}