import {useState} from "react";
import * as PIXI from 'pixi.js'
import {Live2DModel} from "pixi-live2d-display";
import {getAudio} from "../utils/voicevox";

if (!process.env.REACT_APP_MODEL_PATH) {
    throw new Error("missing model path")
}

export const useModel = () => {
    const [model, setModel] = useState<any>() // live2d model
    const [app, setApp] = useState<any>() // pixi app

    const initLive2D = async (t?: PIXI.Application) => {
        const current = t ?? app
        if (!current) return

        const model = await Live2DModel.from(process.env.REACT_APP_MODEL_PATH || '')

        console.log(model)

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

        model.scale.set(scale * 1)
        // model.scale.set(scale * 2)
        model.position.set(current.view.width / 2, current.view.height / 2)

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
        if (!model || !app) return

        // const {start, stop} = await getAudio(text, model, () => {
        //
        // })
    }


    return {
        model,
        app,
        init,
    }
}