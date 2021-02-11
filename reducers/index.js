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
const selectedEventsName = (state='', action) => {
    switch(action.type){
        case "SET_EVENT_NAME":
            return [...state, action.eventName]
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

export default combineReducers({ //will combine state if i add more then events,
    latitude, 
    longitude,
    start,
    end,                  // events(state): events(reduceer up top), gives STATE of events 
    generatedEvents,
    tripName,
    selectedEvents,
    selectedEventsName

})
