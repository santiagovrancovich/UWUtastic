import React from "react"
import ReactDOM from "react-dom"
import App from "./app/app"
import GlobalContextProvider from './utils/context'
import "normalize.css"

ReactDOM.render(<React.StrictMode><GlobalContextProvider><App/></GlobalContextProvider></React.StrictMode>, document.getElementById("root"))