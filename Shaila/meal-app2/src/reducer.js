function mealPref(state,action){
if(state=== undefined){
    return{
        selected:[],
        price:"any",
        radius:"any",
        reviews:"any",
        results:[]
    }
}

var selected=state.selected;
var price=state.price;
var radius=state.radius;
var reviews=state.reviews;
var results=state.results;

switch(action){
    case "UpdateSelection":
    return Object.assign(state,{selected:action.payload});
    case "UpdatePrice":
    return Object.assign(state,{price:action.payload});
    case "UpdateRadius":
    return Object.assign(state,{radius:action.payload});
    case "UpdateReviews":
    return Object.assign(state,{reviews:action.payload});
    case "UpdateResults":
    return Object.assign(state,{results:action.payload});
    default:
    return state;
}

}
export default mealPref;