import React, {useState, useLayoutEffect, useRef, useContext} from 'react'
import ClockImage from "../../../assets/alarm-clock.svg"
import anime from 'animejs/lib/anime.es.js'
import { globalContext } from '../../../utils/context'
import "./clock.scss"

export default function Clock() {
    const context = useContext(globalContext)
    const [blinkingDotsAnimation, setblinkingDotsAnimation] = useState(anime)
    const [clockAnimation, setclockAnimation] = useState(anime)
    const [timeUpdate, settimeUpdate] = useState(false)
    const [minutes, setminutes] = useState(0)
    const [hours, sethours] = useState(0)
    const clockDots = useRef(null)
    const clockContainer = useRef(null)
    let direction = false

    useLayoutEffect(() => {
        const timer = setTimeout(()=> settimeUpdate(!timeUpdate),1000)
        context.dispatch({type:"sleepTimeCounter"})
        setminutes(minutes+1)
 
        if (minutes >= 59) {
            sethours(hours+1)
            setminutes(0)
        } 

        return () => clearTimeout(timer)

    // have 2 arrows to set the alarm, uwu will sleep that time in minutes, and while thats happening pointer events are lockeds (dont disturbn them)
    // also they will get slowly hugry while sleeping
    // this is a MAYBE not sure if i will implement it

    }, [timeUpdate])

    useLayoutEffect(() => {
        setblinkingDotsAnimation(
            anime({
                targets: clockDots.current,
                opacity: [
                    {value:1, duration:250},
                    {value:0, duration:500},
                    {value:1, duration:250},
                ],
                loop: true,
                easing: "easeInOutSine"
            })
        )

        setclockAnimation(
            anime({
                targets: clockContainer.current,
                marginRight: ["50vw","0vw"],
                opacity: [0,1],
                duration: 700,
                direction: "normal",
                easing: "easeOutBack",
                complete: () => context.dispatch({type:"animationDone"})
            })
        )

    }, [])

    useLayoutEffect(() => {
        if (context.state.screenAnimationPlaying) {
            direction = !direction
            direction ? clockAnimation.reverse() : null
            clockAnimation.play()
        }

    }, [context.state.screenAnimationPlaying])

    return (
        <div className="clock" ref={clockContainer} >
            <img src={ClockImage} alt={ClockImage} />
            <span >{hours > 9 ? hours : `0${hours}`}<a ref={clockDots} >:</a>{minutes > 9 ? minutes : `0${minutes}`}</span>
        </div>
    )
}
