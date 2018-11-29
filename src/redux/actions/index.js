export const LOGGEN_IN = 'LOGGEN_IN'
export const SIGN_OUT = 'SIGN_OUT'

export const setUser = payload => {
    return {
        type: LOGGEN_IN,
        payload
    }
}

export const clearUser = () => {
    return{
        type: SIGN_OUT
    }
}

export const onpenInputText = payload => {
    return {
        type: 'OPEN_TEXT',
        payload
    }
}

export const closeInputText = () => {
    return {
        type: 'CLOSE_TEXT'
    }
}

export const userNameToReply = payload => {
    return {
        type: 'USERNAME_TO_REPLY',
        payload
    }
}

export const clearUserNameToReply = () => {
    return{
        type: 'CLEAR_USERNAME_TO_REPLY'
    }
}

export const addMessages = payload => {
    return {
        type: 'ADD_MESSAGES',
        payload
    }
} 

export const userRetweetFavorite = () => {
    return {
        type: 'RETWEET_FAVORITE'
    }
}

export const addRetweets = payload => {
    return {
        type: 'ADD_RETWEETS',
        payload
    }
}
export const addFavorites = payload => {
    return {
        type: 'ADD_FAVORITES',
        payload
    }
}

export const addMessagesRetweets = payload => {
    return {
        type: 'ADD_MESSAGES_RETWEETS',
        payload
    }
} 
export const addMessagesFavorites = payload => {
    return {
        type: 'ADD_MESSAGES_FAVORITES',
        payload
    }
} 