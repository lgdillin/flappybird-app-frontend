import Canvas from "../wrappers/Canvas"
import FlappyBirdComponent from "./FlappyBirdComponent"

export default function GameComponent() {

	const draw = (ctx, frameCount) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		ctx.fillStyle = '#000000'
		ctx.beginPath()
		ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
		ctx.fill()
	}

	return (
		<div className="GameComponent">
			{/* <Canvas draw={draw}/> */}
			<FlappyBirdComponent />
		</div>
	)
}

// const useScript = url => {
// 	useEffect(() => {
// 		const script = document.createElement('script');

// 		script.src = url;
// 		script.async = true;

// 		document.body.appendChild(script);

// 		return () => {
// 			document.body.removeChild(script);
// 		}
// 	}, [url]);
// }