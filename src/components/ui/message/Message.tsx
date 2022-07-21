import React, { useRef, useState, useLayoutEffect, useContext} from 'react'
import { globalContext } from "../../../utils/context"
import UWUsound from "../../../assets/uwu.mp3"
import anime from 'animejs/lib/anime.es.js'
import "./Message.scss"

const sound = new Audio(UWUsound)

export default function Message(props) {
    const [messageAnimation, setmessageAnimation] = useState(anime)
    const context = useContext(globalContext)
    const message = useRef(null)

    useLayoutEffect(() => {
        setmessageAnimation(anime({
            targets: message.current,
            opacity: [
                {value:1, duration:1000},
                {value:0, duration:1500, delay: props.sentence.length*60 },
            ],
            scaleX: [
                {value: 0.65, duration: 0},
                {value: 1, duration: 1000}
            ],
            autoplay: false,
            easing: "easeOutElastic",
            begin: () => { 
                context.dispatch({type:"pauseClick"}),
                sound.paused ? sound.play() : sound.currentTime = 0
            } ,
            complete: () => context.dispatch({type:"pauseClick"})
        }))
    }, [props.sentence])

    useLayoutEffect(() => {
        props.display ? messageAnimation.play() : null
    }, [props.display])

    return (
        <div className="text-container" ref={message}>{ props.sentence }</div>
    )
}
