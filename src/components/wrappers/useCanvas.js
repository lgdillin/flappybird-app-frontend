import { useRef, useEffect } from 'react'

const useCanvas = (draw) => {

    const canvasRef = useRef(null)

    useEffect(() => {

        // Capture 2d context
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        let frameCount = 0
        let animationFrameId

        const render = () => {
            ++frameCount
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        //animationFrameId = window.requestAnimationFrame(render)
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return canvasRef
}

export default useCanvas