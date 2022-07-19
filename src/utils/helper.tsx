export const getRandomColor = (previousColor: string) => {
    const colorList = ["#ff9aa2","#ffb7b2","#ffdac1","#e2f0cb","#b5ead7","#c7ceea"]
    let randomColor

    do {
        randomColor = colorList[(Math.floor(Math.random()*colorList.length))]
    } while (randomColor === previousColor) 

    return randomColor
}

export const getRandomSentence = (previousSentence: string) => {
    const sentenceList = [
        "Thanks for petting me master!",
        "That was really poggers!",
        "Thank you master",
        "That was fantastic",
        "You're the best master",
        "Thanks for playing with me!"
    ]
    let randomSentence

    do {
        randomSentence = sentenceList[(Math.floor(Math.random()*sentenceList.length))]
    } while (randomSentence === previousSentence)  

    return randomSentence
}

export const getRandomFoodSentence = (previousSentence: string) => {
    const sentenceList = [
        "Yummy!",
        "Delicious",
        "Tasty!",
        "Oh Sweet!",
    ]
    let randomSentence

    do {
        randomSentence = sentenceList[(Math.floor(Math.random()*sentenceList.length))]
    } while (randomSentence === previousSentence)  

    return randomSentence
}