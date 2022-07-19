import React, { useRef, useState, useLayoutEffect, useContext} from 'react'
import { globalContext } from "../../../utils/context"
import UWUsound from "../../../assets/uwu.mp3"
import Typed from 'typed.js'
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
                {value:1, duration:500},
                {value:0, duration:500, delay: props.sentence.length*60 },
            ],
            autoplay: false,
            easing: "linear",
            begin: () => { 
                context.dispatch({type:"pauseClick"}),
                sound.paused ? sound.play() : sound.currentTime = 0
            } ,
            complete: () => context.dispatch({type:"pauseClick"})
        }))
        
        const options = {
            strings: [props.sentence],
            typeSpeed: 20
        }
        let typed = new Typed(message.current, options)
        return () => {
            typed.destroy()
        }
    }, [props.refresh])

    useLayoutEffect(() => {
        props.display ? messageAnimation.play() : null
    }, [props.display])

    return (
        <div className="text-container" ref={message}></div>
    )
}
