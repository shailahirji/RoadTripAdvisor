



export const mapReducer  = (state = [], action) => {
    console.log("Called mapReducer ",action)
switch(action.type) {
    case "MAP_LOCATION":
      console.log("WE WERE ABLE TO INTERCEPT THE DATA ",action.payload)
       return {
            ...state, data:action.payload
       }
      
    default:
      return state;
}
}