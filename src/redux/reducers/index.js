import {LOGGEN_IN, SIGN_OUT} from '../actions'
import { combineReducers } from 'redux';

const user = (state=null,action) => {
    switch (action.type) {
        case LOGGEN_IN:
            return action.payload
        case SIGN_OUT:
            return null
        case 'RETWEET_FAVORITE':
            return Object.assign({}, state, {retweets:[],favorites:[]})
        case 'ADD_RETWEETS':
            return action.payload
        case 'ADD_FAVORITES':
            return action.payload
        default:
            return state
    }
}

const OpenText = (state=false, action) => {
    switch (action.type) {
        case 'OPEN_TEXT':
            return action.payload
        case 'CLOSE_TEXT':
            return false
        default:
            return state
    }
}

const usernameToReply = (state="", action) => {
    switch (action.type) {
        case 'USERNAME_TO_REPLY':
            return action.payload 
        case 'CLEAR_USERNAME_TO_REPLY':
            return ""       
        default:
            return state
    }
}

const messagesReducer = (state=[],action) => {
    switch (action.type) {
        case 'ADD_MESSAGES':
            return state.concat(action.payload)
        case 'ADD_MESSAGES_RETWEETS':
            return action.payload
        case 'ADD_MESSAGES_FAVORITES':
            return action.payload
        default:
            return state;
    }
}
 
export const rootReducers = combineReducers({
    user,
    OpenText,
    usernameToReply,
    messages: messagesReducer
})