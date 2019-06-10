// import React, { Component } from "react";
// import { FormGroup, FormControl, FormLabel } from "react-bootstrap";


// //THIS IS FOR THE LOG IN BUTTON

// class LoginForm extends Component{
//     constructor(props) {
//         super(props)
//     this.state = {
//         email: "",
//         password: "",
      
//       }
//       this.signin = this.signin.bind(this)
//       this.handleChange = this.handleChange.bind(this)
//     }

// handleChange (e){
//     const {id, value} = e.target;
    
//     this.setState({[id]:value})
//     console.log("TEST ",this.state)
// }

// signin(){
//     this.props.onSignin(this.state);
// }

// render(){
//     var positionStyle = {
//         display: "flex",
//         flexDirection: "column",
//               alignItems: "center",
//               marginBottom: "200px"
//         // justifyContent: "center"
//       };
//       var positionStyle = {
//         display: "flex",
//         flexDirection: "column",
//               alignItems: "center",
//               marginBottom: "200px"
//         // justifyContent: "center"
//       };
//       var inputStyle = { opacity: 0.7 };
  
//         return(
//             <div style={positionStyle} className="text-center auth_form_login">
//             <div class="col-sm-offset-12">
//               {/* {signUpError ? <p>{signUpError}</p> : null} */}
//               <div class="col-sm-12">
// 							<h1 style={{color:"white"}}>Log In</h1>

//                 <FormGroup controlId="email" bsSize="large">
//                   <FormLabel>Email</FormLabel>
//                   <FormControl
//                     style={inputStyle}
//                     autoFocus
//                     type="email"
//                     value={this.state.email}
//                     onChange={e=>this.handleChange(e)}
//                   />
//                 </FormGroup>
//               </div>
//               <div class="col-sm-12">
//                 <FormGroup controlId="password" bsSize="large">
//                   <FormLabel>Password</FormLabel>
//                   <FormControl
//                     style={inputStyle}
//                     value={this.state.password}
//                     onChange={e=>this.handleChange(e)}
//                     type="password"
//                   />
//                 </FormGroup>
               
               
               
//                 <button
//                   class="btn pl-5 pr-5"
//                   style={{backgroundColor:"#fe3c52", color:"white"}}
//                   block
//                   onClick={this.signin}
//                   type="button"
//                 >
//                   {" "}
//                   Login
//                 </button>
//                 {/* {this.renderRedirect()} */}
//               </div>
//             </div>
//           </div>);
//     }
// }

// export default LoginForm;