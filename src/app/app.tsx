import React, { useState, useEffect, useContext } from 'react'
import { getRandomColor, getRandomSentence } from '../utils/helper'
import { globalContext } from "../utils/context"
import { useSwipeable } from 'react-swipeable'
import Face from '../components/Face/Face'
import Message from '../components/ui/message/Message'
import FoodBar from '../components/ui/foodBar/foodBar'
import "./app.scss"
import Clock from '../components/ui/clock/Clock'

function App() {
    const [sentence, setsentence] = useState("You're the best master")
    const [display, setDisplay] = useState(false)
    const [color, setcolor] = useState("#ff9aa2")
    const [blush, setblush] = useState(0)
    const context = useContext(globalContext)

    const swipeController = useSwipeable({
        onSwipedRight: () => { 
            switch (context.state.screen) {
                case "foodScreen":
                    context.dispatch({type:"animationBegin"})
                    setTimeout(() => {
                        context.dispatch({type:"changeScreen", screen:"playScreen"})
                        setblush(0)
                    }, 1000);
                    break
                case "playScreen":
                    context.dispatch({type:"animationBegin"})
                    context.dispatch({type:"changeScreen", screen:"sleepScreen"})
                    setblush(0)
                    break
                default:
                    break;
            }
        },
        onSwipedLeft: () => {
            switch (context.state.screen) {
                case "sleepScreen":
                    context.dispatch({type:"animationBegin"})
                    setTimeout(() => {
                        context.dispatch({type:"changeScreen", screen:"playScreen"})
                        setblush(0)
                    }, 700);
                    break;
                case "playScreen":
                    context.dispatch({type:"animationBegin"})
                    context.dispatch({type:"changeScreen", screen:"foodScreen"});
                    setblush(0)
                    break
                default:
                    break;
            }
        },...{
            trackTouch: true,
            trackMouse: true,
        }
    })

    useEffect(()=>{
        if (blush > 1) {
            setDisplay(true)
            setsentence(getRandomSentence(sentence))
            setblush(0)
            context.dispatch({type:"playTime"})
            setTimeout(() => {
                setDisplay(false)
            }, sentence.length*120);
        }
        if (context.state.hunger > 2) {
            setDisplay(true)
            setsentence("Could you feed me master? I'm Hungry!")
            setblush(0)
            setTimeout(() => {
                setDisplay(false)
            }, sentence.length*120);  
        }

        if (context.state.sleepTime <= 0) {
            setDisplay(true)
            setsentence("I'm tired master! can i get a nap?")
            setblush(0)
            setTimeout(() => {
                setDisplay(false)
            }, sentence.length*120);  
        }
    },[blush])
    
    switch (context.state.screen) {
        case "playScreen":
            return (
                <div {...swipeController} className="app-container" style={{backgroundColor: color, pointerEvents: context.state.clickeable ? "auto" : "none"}} >
                    <span className="color-changer" onClick={() => setcolor(getRandomColor(color))}></span>
                    <div className="face-container" onClick={() => setblush(blush+0.2)} >
                        <Face blush={blush} />
                    </div>
                    <Message display={display} sentence={sentence} refresh={blush} />
                </div>
            )
        case "foodScreen":
            return (
                <div {...swipeController} className="app-container" style={{backgroundColor: color, pointerEvents: context.state.clickeable ? "auto" : "none"}} >
                    <span className="color-changer" onClick={() => setcolor(getRandomColor(color))}></span>
                    <div className="face-container">
                        <Face blush={blush} />
                    </div>
                    <FoodBar/>
                </div>
            )
        case "sleepScreen":
            return (
                <div {...swipeController} className="app-container" style={{backgroundColor: color, pointerEvents: context.state.clickeable ? "auto" : "none" }}>
                    <span className="color-changer" onClick={() => setcolor(getRandomColor(color))}></span>
                    <div className="face-container">
                        <Face blush={blush} />
                    </div>
                    <div className="clock-container">
                        <Clock/>
                    </div>
                </div>
            )       
        default:
            return (
                <div {...swipeController} className="app-container" style={{backgroundColor: color, pointerEvents: context.state.clickeable ? "auto" : "none"}} >
                    <span className="color-changer" onClick={() => setcolor(getRandomColor(color))}></span>
                    <div className="face-container" onClick={() => setblush(blush+0.2)} >
                        <Face blush={blush} />
                    </div>
                    <Message display={display} sentence={sentence} refresh={blush} />
                </div>
            )
    }
}

export default App