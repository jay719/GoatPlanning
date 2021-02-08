import {combineReducers} from 'redux'

const location = (state='', action) =>{
    switch(action.type){
        case"SET_LATITUDE":      
            return action.latitude  
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
    switch (action.type){
        case "SET_END":
            return action.end
        default:
            return state
    }
}

export default combineReducers({ //will combine state if i add more then events,
    location,   
    start,
    end                  // events(state): events(reduceer up top), gives STATE of events 
})
