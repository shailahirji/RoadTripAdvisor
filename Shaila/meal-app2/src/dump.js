// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Select from 'react-select';
// import Filter from "./filter.js";


// class App extends React.Component{
  
//     constructor(props){
//       super(props);

//       // this.handleChange=this.handleChange.bind(this);
//       // this.handleSubmit=this.handleSubmit.bind(this);
//       this.handleOnSelect=this.handleOnSelect.bind(this);
//       this.state={
//         // view: false,
//         // value:'',
//         selected:[],
//         count:0
//       };
//     }

//     handleOnSelect(selection){
//       console.log(this.state.selected)
//       console.log(this.state.count)
//       // if(!selection){
//       //   alert('enter valild input')
//       // }else if(this.state.selected.indexOf(selection)>-1){
//       //   alert('removing')

//       // }
//       this.setState((prevState)=>{
    
//         return{
//           selected:selection,
//           count:prevState.count+1    
//         };
//       })
    
//     }

//     // handleChange(e){
//     //   this.setState({value: e.target.value});
//     // }

//     // handleSubmit(e){
//     //   alert(this.state.value);
//     //   e.preventDefault();
//     // }
//     render(){
//         const options=[
//           {value: 'chocolate',label:'Chocolate'},
//           {value:'vanilla',label:'Vanilla'},
//           {value:'banana',label:'Banana'}

//         ]
//         return(
//             <div>
//                 <h1>Meal Preferences Application</h1>
//                 <h1>Count={this.state.selected.length}</h1>
//                 {/* <button onClick={this.viewOption}>Select Options</button>
//             <form onSubmit={this.handleSubmit}>
//               <label>
//                 Meal Pref:
//                 <input type="text" value={this.state.value} onChange={this.handleChange}/>
//               </label> */}
//               {/* <input type="submit" value="Submit" /> */}
//             {/* </form> */}
//             <Select options={options} defaultValue={""}isMulti onChange={this.handleOnSelect}/>
//             {
//               this.state.selected.map(select=> {
//                 return(
//                   <div key={select.value}>
//                   <h3>{select.label}</h3>
//                   <br/>
//                   </div>
//                 )
//               })
//             }

//             <Filter name='cusine' ></Filter>
//             </div>
//         );
//     }
// }

// export default App;

// class App extends React.Component{

//   constructor(props){
//     super(props);

//     this.state={
//       selected:[],
//       count:0,
//       price_range:'any',//any price range
//       distance:'any',
//       ratings:'any'
//     };
//     //this.childHandler=this.childHandler.bind(this)
//     this.selection_Handler=this.selection_Handler.bind(this)
//     this.PriceRange_Handler=this.PriceRange_Handler.bind(this)
//     this.distance_Handler=this.distance_Handler.bind(this)
//     this.ratings_Handler=this.ratings_Handler.bind(this)
//   }

//   // childHandler(datafromchild){
//   //   this.setState({
//   //     data:datafromchild
//   //   })
//   // }
  
//   //to get data back from Child 
//   selection_Handler(selection){
//     this.setState({
//       selected:selection
//     })
//   }

//   PriceRange_Handler(price){
//     this.setState({
//       price_range:price
//     })
//   }

//   distance_Handler(dist){
//     this.setState({
//       distance:dist
//     })
//   }

//   ratings_Handler(ratings){
//     this.setState({
//       ratings:ratings
//     })
//   }

//   render(){
//     const money_label={0:'$',50:'$$',100:'$$$'}
//     const distance_label={0:'Near',50:'Far',100:'Furthest'}
//     const dinning_options=[ 
//       {value: '1',label:'All Food & Drinks'},{value:'2',label:'Bars & Drinks'},
//       {value:'3',label:'Burgers & BBQ'},{value: '4',label:'Delis & Bakeries'},
//       {value:'5',label:'Coffee & Tea'}, {value:'6',label:'Diners & Breakfast'},
//       {value: '7',label:'Ice cream & Desserts'},{value:'8',label:'Vegeterian & Healthy Food'},
//       {value:'9',label:'Kosher'},{value: '10',label:'Halal'},{value:'11',label:'Wineries & Distelliers'},{value:'12',label:'Resturants'},  
//       ]
//       return(
//           <div>
//           {/* <Child action={this.childHandler}/>
//           <p>{this.state.data}</p> */}

//           <h1>Meal Preferences Application</h1>

//           <div className="filter">
//           <Filter name='meal_type' placeholder= 'Meal Type' action={this.selection_Handler} choices= {dinning_options}></Filter>   
              
//             {
//             this.state.selected.map(select=> {
//               return(
//                 <div key={select.value}>
//                 <p>{select.label}</p>
//                 </div>
//               )
//             })
//           }
//           </div>
//           <div className="money">
//         <p>Price range: {this.state.price_range}</p>
//         <RangeSlider name='money_range' action={this.PriceRange_Handler} label={money_label}/>
//         <br/>
//           </div>
//        <div className="distance">
//         <p>Distance to travel from Location: {this.state.distance} miles</p>
//         <RangeSlider name='distance_range' action={this.distance_Handler} label={distance_label}/>
//         <br/>
//           </div>
//         <div className="ratings">
//         <p>Reviews: {this.state.ratings}</p>
//         <StarRating action={this.ratings_Handler}/>
//         </div>

//         </div>

       
        
//       );
//   }
// }

//more dump from App.js

//<div>
{/* <div className="filter">
<Filter name='meal_type' placeholder= 'Meal Type' action={this.selection_Handler} choices= {dinning_options}></Filter>   
  
  {
  this.state.selected.map(select=> {
    return(
      <div key={select.value}>
      <p>{select.label}</p>
      </div>
    )
  })
}
</div>

<div className="money">
<p>Price range: {this.state.price_range}</p>
<RangeSlider name='money_range' action={this.PriceRange_Handler} label={money_label}/>
<br/>
</div>

<div className="distance">
<p>Distance to travel from Location: {this.state.distance} miles</p>
<RangeSlider name='distance_range' action={this.distance_Handler} label={distance_label}/>
<br/>
</div>

<div className="ratings">
<p>Reviews: {this.state.ratings}</p>
<StarRating action={this.ratings_Handler}/>
</div>
<div>
<Card color="#FF6663"></Card>
</div> */}