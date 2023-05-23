import {useState} from "react";
import * as PIXI from 'pixi.js'
import {Live2DModel} from "pixi-live2d-display";

(window as any).PIXI = PIXI


export const useModel = () => {
    const [model, setModel] = useState<any>() // live2d model
    const [app, setApp] = useState<any>() // pixi app
    // const [originalModelHeight, setOriginalModelHeight] = useState(0)
    // const [originalModelWidth, setOriginalModelWidth] = useState(0)

    const initLive2D = async (t?: PIXI.Application) => {
        const current = t ?? app
        if (!current) return

        const model = await Live2DModel.from('/Resources/Hiyori/Hiyori.model3.json')

        console.log(model)

        current.stage.addChild(model)

        // setOriginalModelHeight(model.height)
        // setOriginalModelWidth(model.width)

        model.anchor.set(0.5, 0.5)
        //
        const modelAspectRatio = model.width / model.height
        const screenAspectRatio = current.view.width / current.view.height
        let scale = 1
        if (screenAspectRatio > modelAspectRatio) {
            scale = current.view.height / model.height
        } else {
            scale = current.view.width / model.width
        }

        model.scale.set(scale * 2)

        model.position.set(current.view.width / 2, current.view.height)

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


    return {
        // model,
        // app,
        init,

    }
}