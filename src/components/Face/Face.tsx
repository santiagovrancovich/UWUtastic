import React, { useEffect, useRef, useState, useLayoutEffect, useContext } from 'react'
import { globalContext } from '../../utils/context'
import anime from 'animejs/lib/anime.es.js'
import UWUiconRegular from "../../assets/uwu_emote.svg"
import UWUiconBlush from "../../assets/uwu_emote_blush.svg"
import UWUiconOpenMouth from "../../assets/uwu_emote_open_mouth.svg"
import UWUiconEyes from "../../assets/uwu_emote_eyes.svg"
import SleepIcon from "../../assets/sleep.svg"
import LoveParticle1 from "../../assets/love_particle_1.svg"
import LoveParticle2 from "../../assets/love_particle_2.svg"
import LoveParticle3 from "../../assets/love_particle_3.svg"
import "./Face.scss"

const particleSprites = [LoveParticle1,LoveParticle2,LoveParticle3]

export default function Face(props) {
    const [blushAnimation, setblushAnimation] = useState(anime)
    const [sleepAnimation, setsleepAnimation] = useState(anime)
    const [particlesAnimation, setparticlesAnimation] = useState(anime)
    const [displaySleep, setdisplaySleep] = useState(false)
    const blushHtml = useRef(null)
    const sleepHtml = useRef(null)
    const particlesHtml = useRef(null)
    const context = useContext(globalContext)

    useEffect(() => {
        setblushAnimation(
            anime({
                targets: blushHtml.current,
                opacity: [0,1],
                duration: 1000,
                autoplay: false,
                easing: "easeInSine"
            }))
        setsleepAnimation(
            anime({
                targets: sleepHtml.current,
                translateY: "-6vh",
                translateX: "6vh",
                opacity: [
                    {value:0, duration:100},
                    {value:1, duration:1000},
                    {value:0, duration:1000},
                ],
                duration: 2100,
                loop: true,
                easing: "easeInSine",    
            }))
    }, [])


    useLayoutEffect(() => {
        setparticlesAnimation(
            anime({
                targets: particlesHtml.current,
                translateX: {value:`${anime.random(-10,50)}vw`, duration:0},
                translateY: [
                    {value: "0vh", duration: 0},
                    {value: "-30vh", duration: 2000}
                ],
                opacity: [
                    {value: 1, duration: anime.random(200,800)},
                    {value: 0, duration: 500}
                ],
                easing: "easeInSine",
                autoplay: false,
            }))

        blushAnimation.seek(blushAnimation.duration*props.blush)
        props.blush > 1 ? particlesAnimation.play() : null
        
    }, [props.blush])

    useLayoutEffect(() => {
        if (context.state.screen == "sleepScreen") {
            setdisplaySleep(true)
            sleepAnimation.reset()
            sleepAnimation.play()
        } else {
            setdisplaySleep(false)
            sleepAnimation.pause()
        }

       blushAnimation.seek(blushAnimation.duration*props.blush)

    }, [context.state.screen])

    return (
    <div className="image-container">
        <img className="sleeping-particle" ref={sleepHtml} src={SleepIcon} alt={SleepIcon} style={{display: displaySleep ? "block" : "none"}} ></img>
        <img className="face" draggable="false" src={UWUiconEyes} alt={UWUiconEyes}/>
        <img className="face switch" draggable="false" src={UWUiconRegular} alt={UWUiconRegular} style={{ opacity: context.state.mouthOpen ? 0 : 1 }}/>
        <img className="face switch" draggable="false" src={UWUiconOpenMouth} alt={UWUiconOpenMouth} style={{ opacity: context.state.mouthOpen ? 1 : 0 }}/>
        <img className="face" draggable="false"src={UWUiconBlush} alt={UWUiconBlush} ref={blushHtml} style={{opacity:0}} />
        <div className="playing-particles">  
            <img src={particleSprites[(Math.floor(Math.random()*particleSprites.length))]} ref={particlesHtml}/>
        </div>
    </div>
    )
}