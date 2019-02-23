
export const sendLocation = (locations)=>{
     console.log("WE RECEIVED THE LOCATIONS ",locations)
    return function(dispatch){
        dispatch( {
            type: "MAP_LOCATION",
            payload:locations
        })
    }
    
}

export const loadMainPage = ()=>{
    return function(dispatch){
        dispatch( {
            type: "START_PAGE",
        })
    }
}