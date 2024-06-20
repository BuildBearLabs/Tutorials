import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "./Features/UserCredentials"

export const store = configureStore({
    reducer: {
        userCredentials: UserReducer
    }
})