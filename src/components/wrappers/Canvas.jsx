import useCanvas from "./useCanvas"

const Canvas = props => {

    const { draw, ...rest } = props
    //const { context, ...moreConfig } = options
    const canvasRef = useCanvas(draw)

    return (
        <div className="Canvas">
            <canvas ref={canvasRef} {...rest} />
        </div>
    )
}

export default Canvas