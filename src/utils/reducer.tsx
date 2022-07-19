export const Reducer = (state, action, props?) => {
    switch (action.type) {
        case "Sushi":
            return {...state, hunger: state.hunger - 0.5, sleepTime: state.sleepTime - 9 }
        case "Ramen":
            return {...state, hunger: state.hunger - 0.8, sleepTime: state.sleepTime - 12 }
        case "Fries":
            return {...state, hunger: state.hunger - 0.3, sleepTime: state.sleepTime - 30 }
        case "Brocoli":
            return {...state, hunger: state.hunger - 0.15, sleepTime: state.sleepTime - 3 }
        case "Chinese":
            return {...state, hunger: state.hunger - 0.7, sleepTime: state.sleepTime - 20 }
        case "Vomit":
            return {...state, hunger: 4, sleepTime: state.sleepTime - 100 }
        case "playTime":
            return {...state, hunger: state.hunger + 1, sleepTime: state.sleepTime - 50 }
        case "pauseClick":
            return {...state, clickeable: !state.clickeable}
        case "sleepTimeCounter":
            return {...state, sleepTime: state.sleepTime + 1 }
        case "animationBegin":
            return {...state, screenAnimationPlaying: true }
        case "animationDone":
            return {...state, screenAnimationPlaying: false }
        case "changeScreen":
            return {...state, screen: action.screen }
        case "mouthSwitch":
            return {...state, mouthOpen: !state.mouthOpen }
        default:
            return state
    }
}