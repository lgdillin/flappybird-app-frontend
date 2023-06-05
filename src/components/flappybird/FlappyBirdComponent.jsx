import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useRef } from 'react';

// Image resources
import tube_down from '../game/tube_down.png'
import tube_up from '../game/tube_up.png'
import bird1 from '../game/bird1.png'
import bird2 from '../game/bird2.png'
import cloud from '../game/cloud.png'

function FlappyBirdComponent() {

    const GAME_WIDTH = 500;
    const GAME_HEIGHT = 500;

    const BIRD_WIDTH = 64;
    const BIRD_HEIGHT = 57;
    const [birdPosition, setBirdPosition] = useState(250) 
    const [birdMode, setBirdMode] = useState(bird1)

    const JUMP_HEIGHT = -35;
    const GRAVITY = .5;
    const [velocity, setVelocity] = useState(JUMP_HEIGHT)

    const OBSTACLE_WIDTH = 57;
    const OBSTACLE_GAP = 200;
    const OBSTACLE_SPEED = 5;
    const [obstacleHeight, setObstacleHeight] = useState(300)
    const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH - OBSTACLE_WIDTH)
    const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight

    const CLOUD_MIN = 25;
    const CLOUD_MAX = 475
    const CLOUD_SPEED = 2
    const CLOUD_WIDTH = 500;
    const [cloudLeft, setCloudLeft] = useState(GAME_WIDTH)
    const [cloudHeight, setCloudHeight] = useState(0)

    const [gameHasStarted, setGameHasStarted] = useState(false)
    const [score, setScore] = useState(0)


    const gameBoxRef = useRef()

    // Produce a random number between CLOUD_MIN and CLOUD_MAX
    const genRandomCloudHeight = () => {
        // 456 is a random number that produces cooler results
        return Math.min(Math.max(Math.random() * 456, CLOUD_MIN), CLOUD_MAX)
    }

    // Handle physics simulations on the bird
    useEffect(() => {
        let timeId;
        if(gameHasStarted && birdPosition < GAME_HEIGHT - BIRD_HEIGHT) {
            timeId = setInterval(() => {
                setBirdPosition(birdPosition => birdPosition + velocity)
                setVelocity(Math.max(0, velocity + GRAVITY))
            }, 24)
        }

        return () => {
            clearInterval(timeId);
        }
    }, [birdPosition, velocity, gameHasStarted])

    // Manage physics simulations for the tubes
    useEffect(() => {
        let cloudId

        if(gameHasStarted && cloudLeft >= -CLOUD_WIDTH) {
            cloudId = setInterval(() => {
                setCloudLeft((cloudLeft) => cloudLeft - CLOUD_SPEED)
            }, 24)

            return () => {
                clearInterval(cloudId) 
            }
        } else {
            setCloudLeft(GAME_WIDTH + CLOUD_WIDTH)
            setCloudHeight(genRandomCloudHeight())
        }

    }, [cloudLeft, gameHasStarted])


    useEffect(() => {
        let obstacleId

        if(gameHasStarted && obstacleLeft >= -OBSTACLE_WIDTH ) {
            obstacleId = setInterval(() => {
                setObstacleLeft((obstacleLeft) => obstacleLeft - OBSTACLE_SPEED)
            }, 24)

            return () => {
                clearInterval(obstacleId)
            }
        } else {
            setObstacleLeft(GAME_WIDTH + OBSTACLE_WIDTH)
            setObstacleHeight(Math.floor(Math.random() * (GAME_HEIGHT - OBSTACLE_GAP)))
            setScore(s => s + 1)
        }
    }, [obstacleLeft, gameHasStarted])

     // Collision detection
     useEffect(() => {
        const hasCollisionWithTop = birdPosition >= 0 
            && birdPosition < obstacleHeight;
        const hasCollisionWithBottom = birdPosition <= GAME_HEIGHT 
            && (birdPosition + BIRD_HEIGHT) >= GAME_HEIGHT - bottomObstacleHeight;


        // Handle if bird collides with a tube
        if((obstacleLeft >= 0 && obstacleLeft <= OBSTACLE_WIDTH 
            && (hasCollisionWithBottom || hasCollisionWithTop))
            || (birdPosition + BIRD_HEIGHT >= GAME_HEIGHT))
        {
            setGameHasStarted(false)
            setScore(0)
            setBirdPosition(250)
        }
    }, [birdPosition, obstacleLeft, obstacleHeight, bottomObstacleHeight, gameHasStarted])


    // Handle mouse inputs from the user
    const handleMouseDown = () => {
        if(!gameHasStarted) {
            setGameHasStarted(true) 
            setScore(0)
        }

        setBirdMode(bird2)

        let newBirdPosition = birdPosition + velocity
        setVelocity(JUMP_HEIGHT)
        setBirdPosition(Math.max(0, newBirdPosition))
    }

    // Handle when the user releases the mouse (resetting bird animation)
    const handleMouseUp = () => {
        setBirdMode(bird1)
    }

    return (
        <div className='FlappyBirdComponent'>
            
            <Div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                <GameBox ref={gameBoxRef} height={GAME_HEIGHT} width={GAME_WIDTH}>
                    
                    <Cloud 
                        top={cloudHeight}
                        left={cloudLeft}   
                    />

                    <Bird 
                        background={birdMode}
                        width={BIRD_WIDTH}
                        height={BIRD_HEIGHT}
                        top={birdPosition}
                    />

                    <ObstacleDown
                        top={0}
                        width={OBSTACLE_WIDTH}
                        height={obstacleHeight}
                        left={obstacleLeft}
                    />

                    <ObstacleUp
                        top={obstacleHeight + OBSTACLE_GAP}
                        width={OBSTACLE_WIDTH}
                        height={bottomObstacleHeight}
                        left={obstacleLeft}
                    />

                </GameBox>
                <ScoreBox>{score}</ScoreBox>
                <GameOver>{!gameHasStarted && 'Game Over!'}</GameOver>
            </Div>
        </div> 
    )

}

export default FlappyBirdComponent

const Bird = styled.div.attrs(props => ({
    style: { 
        height: props.height,
        width: props.width,
        top: props.top
    },
}))`
    background-image: url(${props => props.background});
    position: relative;
    background-color: none;
`;

const Div = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const ScoreBox = styled.div`
    display: flex;
    width: 100%;
    color: white;
    font-size: 24px;
    top: 1px;
    left: 30px;
    position: relative;
`

const GameOver = styled.div`
    display: flex;
    width: 100%;
    color: white;
    font-size: 48px;
    top: center;
    left: center;
    position: relative;
`

const GameBox = styled.div.attrs(props => ({
    style: {
        height: props.height,
        width: props.width,
        top: props.top
    },
}))`
    position: fixed;
    overflow: hidden;
    background-color: #87CEEB;
`;

const ObstacleUp = styled.div.attrs(props => ({
    style: {
        top: props.top,
        width: props.width,
        height: props.height,
        left: props.left
    },
}))`
    position: absolute;
    background-image: url(${tube_up});
`

const ObstacleDown = styled.div.attrs(props => ({
    style: {
        top: props.top,
        width: props.width,
        height: props.height,
        left: props.left
    },
}))`
    position: absolute;
    background-image: url(${tube_down});
`
const Cloud = styled.div.attrs(props => ({
    style: {
        top: props.top,
        left: props.left
    }
}))`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: none;
    background-image: url(${cloud});
`
