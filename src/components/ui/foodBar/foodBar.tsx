import React, { useRef, useState, useLayoutEffect, useContext } from 'react'
import { getRandomFoodSentence } from '../../../utils/helper'
import { globalContext } from '../../../utils/context'
import Message from '../message/Message'
import anime from 'animejs/lib/anime.es.js'
import Sushi from "../../../assets/sushi_2.svg"
import Brocoli from "../../../assets/brocoli.svg"
import Fries from "../../../assets/fries.svg"
import Ramen from "../../../assets/ramen.svg"
import Chinese from "../../../assets/chinese_food.svg"
import Vomit from "../../../assets/vomit.svg"
import pukeSound from "../../../assets/puke.mp3"
import "./foodBar.scss"

const vomitSound = new Audio(pukeSound)

export default function FoodBar() {
    const [foodBarAnimation, setfoodBarAnimation] = useState(anime)
    const [draggeableItemAnimation, setdraggeableItemAnimation] = useState(anime)
    const [draggeableItemAnimationReverse, setdraggeableItemAnimationReverse] = useState(anime)
    const [vomitAnimation, setvomitAnimation] = useState(anime)
    const [randomFoodSentence, setrandomFoodSentence] = useState("Yummy!")
    const [foodSelection, setfoodSelection] = useState(null)
    const [coordinates, setcoordinates] = useState([-50,-50])
    const [correctedCoordinates, setCorrectedCoordinates] = useState([-50,-50])
    const [displayMessage, setdisplayMessage] = useState(false)
    const [foodEadible, setfoodEadible] = useState(false)
    const [isVomiting, setisVomiting] = useState(false)
    const dragElement = useRef(null)
    const HtmlElement = useRef(null)
    const foodAreaElement = useRef(null)
    const vomitElement = useRef(null)
    const context = useContext(globalContext)
    
    useLayoutEffect(() => {
        setfoodBarAnimation(
            anime({
                targets: HtmlElement.current,
                translateX: "100vw",
                opacity: [1,0],
                direction: "reverse",
                duration: 1000,
                easing: "easeInSine",
                complete: () => context.dispatch({type:"animationDone"})
            }))

        setdraggeableItemAnimationReverse(
            anime({
                targets: dragElement.current,
                opacity: [1,0],
                duration: 200,
                easing: "easeInSine",
            }))

        setdraggeableItemAnimation(
            anime({
                targets: dragElement.current,
                opacity: [0,1],
                duration: 200,
                easing: "easeInSine",
            }))

        setvomitAnimation(
            anime({
                targets: vomitElement.current,
                translateY: [
                    {value: "0vw", duration: 500},
                    {value: "15vw", duration: 2500}
                ],
                opacity: [
                    {value: 1, duration: 2000},
                    {value: 0, duration: 1000}
                ],
                scale: [
                    {value: 0, duration: 0},
                    {value: 1, duration: 500}
                ],
                easing: "easeInOutSine",
                autoplay: false,
                begin: () => context.dispatch({type:"pauseClick"}),
                complete: () => { context.dispatch({type:"pauseClick"}); setisVomiting(false); setdisplayMessage(true) }
            }))
    }, [])

    useLayoutEffect(() => {
        const rect1 = dragElement.current.getBoundingClientRect()
        const rect2 = foodAreaElement.current.getBoundingClientRect()

        const overlap = !(rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom)
            
        if (dragElement) {
            const correctedX = coordinates[0] - dragElement.current.offsetWidth/2
            const correctedY = coordinates[1] - dragElement.current.offsetHeight/2
            setCorrectedCoordinates([correctedX,correctedY])
        }

        setfoodEadible(overlap)

    }, [coordinates])

    const touchStartPayload = (foodItem) => {
        setfoodSelection(foodItem) 
        draggeableItemAnimation.play() 
        setdisplayMessage(false)
        context.dispatch({type:"mouthSwitch"})
    }

    const touchMovePayload = (e) => {
        setcoordinates([e.targetTouches[0].pageX, e.targetTouches[0].pageY])
    }

    const touchEndPayload = (food) => {
        draggeableItemAnimationReverse.play() 
        context.dispatch({type:"mouthSwitch"})
        if (foodEadible) {
            if (food == "Brocoli") {
                setrandomFoodSentence("Eww! Brocoli!")
            } else {
                setrandomFoodSentence(getRandomFoodSentence)
            }
            
            if (context.state.hunger <= 0) {
                setrandomFoodSentence("I'm full master!")
                if (context.state.hunger <= -3) {
                    setisVomiting(true)
                    vomitAnimation.play()
                    context.dispatch({type:"Vomit"})
                    vomitSound.play()
                    setrandomFoodSentence("I'm sorry master")
                }
            }
            
            setdisplayMessage(!(context.state.hunger <= -3))
            context.dispatch({type:food})
            setcoordinates([-50,-50])
            setTimeout(() => {
                setdisplayMessage(false)
            }, randomFoodSentence.length*10) 
        } else {
            setdisplayMessage(false) 
        }
    }

    useLayoutEffect(() => {
        if (context.state.screenAnimationPlaying) {
            foodBarAnimation.reverse()
            foodBarAnimation.play()
        }
    }, [context.state.screenAnimationPlaying])

    return (
        <>
            <div className="foodBar-container" ref={HtmlElement} style={{ pointerEvents: context.state.clickeable ? "auto" : "none"}}>
                <img src={Sushi} alt={Sushi}  
                    onTouchStart={()=> touchStartPayload(Sushi)} 
                    onTouchMove={(e)=> touchMovePayload(e)}
                    onTouchEnd={()=> touchEndPayload("Sushi")}/>
                <img src={Ramen} alt={Ramen}                     
                    onTouchStart={()=> touchStartPayload(Ramen)} 
                    onTouchMove={(e)=> touchMovePayload(e)}
                    onTouchEnd={()=> touchEndPayload("Ramen")}/>
                <img src={Fries} alt={Fries} 
                    onTouchStart={()=> touchStartPayload(Fries)} 
                    onTouchMove={(e)=> touchMovePayload(e)}
                    onTouchEnd={()=> touchEndPayload("Fries")}/>
                <img src={Brocoli} alt={Brocoli}
                    onTouchStart={()=> touchStartPayload(Brocoli)} 
                    onTouchMove={(e)=> touchMovePayload(e)}
                    onTouchEnd={()=> touchEndPayload("Brocoli")}/>
                <img src={Chinese} alt={Chinese} 
                    onTouchStart={()=> touchStartPayload(Chinese)} 
                    onTouchMove={(e)=> touchMovePayload(e)}
                    onTouchEnd={()=> touchEndPayload("Chinese")}/>
            </div>
            <img className="draggeable-item" src={foodSelection} alt={foodSelection}  ref={dragElement} style={{ left: correctedCoordinates[0], top: correctedCoordinates[1], position: "absolute" }} />
            <Message display={displayMessage} sentence={randomFoodSentence} refresh={coordinates} />
            <div className="food-area" ref={foodAreaElement}></div>
            <div className="vomit-container" style={{display: isVomiting ? "flex" : "none"}} >
                <img src={Vomit} ref={vomitElement} />
            </div>
        </>
    )
}