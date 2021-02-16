import {combineReducers} from 'redux'


const tripName = (state='', action) =>{
    switch(action.type){
        case"SET_NAME":
            return action.name
         default:
            return state
    }
}
const latitude = (state='', action) =>{
    switch(action.type){
        case"SET_LATITUDE":      
            return action.latitude  
        default:
            return state
    }   
}
const longitude = (state='', action) => {
    switch(action.type){
        case"SET_LONGITUDE":
            return action.longitude
        default:
            return state
    }
}

const start = (state='', action) => {
    switch(action.type){
        case "SET_START":
            return action.start
        default:
            return state
    }
}
const end = (state='', action) => {
    switch(action.type){
        case "SET_END":
            return action.end
        default:
            return state
    }
}
const selectedEvents = (state='', action) => {
    switch(action.type){
        case "SET_TRIP_ID":
            return [...state, action.tripEvents]
        default:
            return state
    }
}
const generatedEvents = (state=[], action) => {
    switch(action.type){
        case"SET_GENERATED_EVENTS":
            return action.events
        default:
            return state
    }
}
const generatedRestaurants = (state=[],action) => {
    switch(action.type){
        case"SET_GENERATED_RESTAURANTS":
            return action.food
        default:
            return state
    }
}
const generatedUserTrips = (state=[], action) => {
    switch(action.type){
        case"SET_GENERATED_TRIPS":
            return action.trips
        default:
            return state
    }
}
const currentUser = (state='', action) => {
    switch (action.type){
        case"SET_CURRENT_USER":
            return action.currentUser
        default:
            return state
    }
}
const currentUserID = (state='', action) => {
    switch (action.type){
        case"SET_CURRENT_ID":
            return action.currentID
        default:
            return state
    }
}
const currentIcon = (state='', action) => {
    switch(action.type){
        case"SET_ICON":
            return action.icon
        default:
            return state
    }
}
const tripDescription = (state='N/A', action) => {
    switch(action.type){
        case"SET_DESCRIPTION":
            return action.description
        default:
            return state
    }
}


export default combineReducers({ 
    latitude, 
    longitude,
    start,
    end,
    tripName,                  
    generatedEvents,
    generatedRestaurants,
    generatedUserTrips,
    selectedEvents,
    currentUser,
    currentUserID,
    tripDescription,
    currentIcon,

})
