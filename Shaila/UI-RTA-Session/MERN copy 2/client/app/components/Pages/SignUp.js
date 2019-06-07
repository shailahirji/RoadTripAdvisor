// import React, { Component } from "react";
// import "whatwg-fetch";
// import { Redirect, withRouter } from "react-router-dom";
// import { getFromStorage, setInStorage } from "../../utils/storage";
// import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
// import LoginForm from './loginForm';
// import SignupForm from './signupForm'



// class SignUp extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isLoading: true,
//       token: "",
//       signUpError: "",
//       signUpEmail: "",
//       signUpPassword: "",
//       firstName: "",
//       lastName: "",
//       redirect: false
//     };

//     this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(
//       this
//     );
//     this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
//       this
//     );
//     this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(
//       this
//     );
//     this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(
//       this
//     );
// 		this.onSignUp = this.onSignUp.bind(this);
// 		this.onSignin = this.onSignin.bind(this);
//   }

//   componentDidMount() {
//     const obj = getFromStorage("the_main_app");

//     if (obj && obj.token) {
//       const { token } = obj;
//       //verify the token
//       fetch("/api/account/verify?token=" + token)
//         .then(res => res.json())
//         .then(json => {
//           if (json.success) {
//             this.setState({
//               token: token,
//               isLoading: false
//             });
//           } else {
//             this.setState({
//               isLoading: false
//             });
//           }
//         });
//     } else {
//       //no token, not logged in
//       this.setState({ isLoading: false });
//     }
//   }

//   renderRedirect() {
//     if (this.state.redirect) {
//       return <Redirect to={{ pathname: "/" }} />; //allowing user to sign in
//     }
//   }

//   onTextboxChangeSignUpEmail(event) {
//     this.setState({
//       signUpEmail: event.target.value
//     });
//   }

//   onTextboxChangeSignUpPassword(event) {
//     this.setState({
//       signUpPassword: event.target.value
//     });
//   }

//   onTextboxChangeSignUpFirstName(event) {
//     this.setState({
//       firstName: event.target.value
//     });
//   }

//   onTextboxChangeSignUpLastName(event) {
//     this.setState({
//       lastName: event.target.value
//     });
// 	}
	

// 	onSignin(userData){
//     //grab state
// 		//post request to backend
// 		console.log("OUSMANE ",userData)
// 		const { email, password } = userData;
		
//     this.setState({ isLoading: true });

//     //post request to backend , creates API request to out end point
//     fetch("/api/account/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       }, 
//       body: JSON.stringify({
//         email,
//         password
//       })
//     })
//       .then(res => {
// 				  console.log("CAVA ",res)
// 					return res.json()
// 			})
//       .then(json => {
// 				console.log("LE JSON ",json)
//         if (json.success) {
// 					localStorage.setItem("token",json.token);
// 					this.props.history.push('/StartTrip')
// 					// setInStorage("the_main_app", { token: json.token });
				 
// 					// this.setState({
//           //   signInError: json.message,
//           //   isLoading: false,
//           //   signInEmail: "",
//           //   signInPassword: "",
//           //   token: json.token,
//           //   redirect: true
//           // });
//         } else {
// 					alert("Invalid email/password")
//           this.setState({
//             signInError: json.message,
//             isLoading: false
//           });
//         }
//       }).catch(error => console.log("ERREUR ",res));
//   }

//   onSignUp(userData){
//     //grab state
//     //post request to backend
//     const { signUpEmail, signUpPassword, firstName, lastName } = userData;
//     this.setState({ isLoading: true });

//     //post request to backend , creates API request to out end point
//     fetch("/api/account/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         email: signUpEmail,
//         password: signUpPassword,
//         firstName: firstName,
//         lastName: lastName
//       })
//     })
//       .then(res => res.json())
//       .then(json => {
//         if (json.success) {
//           console.log("IMI")
//           this.setState({
//             signUpError: json.message,
//             isLoading: false,
//             signUpEmail: "",
//             signUpPassword: "",
//             firstName: "",
//             lastName: "",
//             redirect: true
//           });
//         } else {
//           console.log("AMA")
//           this.setState({
//             signUpError: json.message,
//             isLoading: false
//           });
//         }
//       });
//   }

//   render() {
   
//     const {
//       isLoading,
//       token,
//       signUpEmail,
//       signUpPassword,
//       signUpError,
//       firstName,
//       lastName
//     } = this.state;

//     if (isLoading) {
//       return (
//         <div>
//           <p>Loading...</p>
//         </div>
//       );
//     }

//     return (
      
//        /* <div class="here otherBack">
//           <div className="text-center">
//             <div className="landingpage-style">
//               <h1 className="roadTripAdvisor">Road Trip Advisor</h1>
//               <p className="roadTripAdvisor">
//                 {" "}
//                 Sign Up for Road Trip Advisor. Your Adventure Awaits!
//               </p>
//             </div>
//           </div>

//           <div style={positionStyle} class="text-center">
//             <div class="col-sm-offset-12">
//               {signUpError ? <p>{signUpError}</p> : null}
//               <div class="col-sm-12">
//                 <FormGroup controlId="email" bsSize="large">
//                   <FormLabel>Email</FormLabel>
//                   <FormControl
//                     style={inputStyle}
//                     autoFocus
//                     type="email"
//                     value={signUpEmail}
//                     onChange={this.onTextboxChangeSignUpEmail}
//                   />
//                 </FormGroup>
//               </div>
//               <div class="col-sm-12">
//                 <FormGroup controlId="password" bsSize="large">
//                   <FormLabel>Password</FormLabel>
//                   <FormControl
//                     style={inputStyle}
//                     value={signUpPassword}
//                     onChange={this.onTextboxChangeSignUpPassword}
//                     type="password"
//                   />
//                 </FormGroup>
//                 <FormGroup controlId="FirstName" bsSize="large">
//                   <FormLabel>First Name</FormLabel>
//                   <FormControl
//                     style={inputStyle}
//                     value={firstName}
//                     onChange={this.onTextboxChangeSignUpFirstName}
//                     type="text"
//                   />
//                 </FormGroup>
//                 <FormGroup controlId="lastName" bsSize="large">
//                   <FormLabel>Last Name</FormLabel>
//                   <FormControl
//                     style={inputStyle}
//                     value={lastName}
//                     onChange={this.onTextboxChangeSignUpLastName}
//                     type="text"
//                   />
//                 </FormGroup>
//                 <button
//                   class="btn btn-warning pl-5 pr-5"
//                   block
//                   onClick={this.onSignUp}
//                   type="button"
//                 >
//                   {" "}
//                   Submit Account Information
//                 </button>
//                 {this.renderRedirect()}
//               </div>
//             </div>
//           </div>
//         </div> */
//         <div class="super_container">
	
// 	{/* <!-- Header --> */}

// 	<header class="header">
// 		<div class="container">
// 			<div class="row">
// 				<div class="col">
// 					<div class="header_container d-flex flex-row align-items-center justify-content-start">

// 						{/* <!-- Logo --> */}
// 						<div class="logo_container">
// 							<div class="logo">
// 								<div>Excursion</div>
// 								<div>Road Trip Planner</div>
// 								<div class="logo_image"><img src="images/logo.png" alt=""/></div>
// 							</div>
// 						</div>

// 						{/* <!-- Main Navigation --> */}
// 						<nav class="main_nav ml-auto">
// 							<ul class="main_nav_list">
// 								<li class="main_nav_item"><a href="login">Home</a></li>
// 								<li class="main_nav_item active"><a href="signup">About us</a></li>
// 								<li class="main_nav_item"><a href="accomodations">Accomodations</a></li>
// 								<li class="main_nav_item"><a href="contactUs">Contact</a></li>
// 							</ul>
// 						</nav>

// 						{/* <!-- Search --> */}
// 						<div class="search">
// 							<form action="#" class="search_form">
// 								<input type="search" name="search_input" class="search_input ctrl_class" required="required" placeholder="Keyword"/>
// 								<button type="submit" class="search_button ml-auto ctrl_class"><img src="images/search.png" alt=""/></button>
// 							</form>
// 						</div>

// 						{/* <!-- Hamburger --> */}
// 						<div class="hamburger ml-auto"><i class="fa fa-bars" aria-hidden="true"></i></div>

// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</header>

// 	{/* <!-- Menu --> */}

// 	<div class="menu_container menu_mm">

// 		{/* <!-- Menu Close Button --> */}
// 		<div class="menu_close_container">
// 			<div class="menu_close"></div>
// 		</div>

// 		{/* <!-- Menu Items --> */}
// 		<div class="menu_inner menu_mm">
// 			<div class="menu menu_mm">
// 				<div class="menu_search_form_container">
// 					<form action="#" id="menu_search_form">
// 						<input type="search" class="menu_search_input menu_mm"/>
// 						<button id="menu_search_submit" class="menu_search_submit" type="submit"><img src="images/search_2.png" alt=""/></button>
// 					</form>
// 				</div>
// 				<ul class="menu_list menu_mm">
// 					<li class="menu_item menu_mm"><a href="login">Home</a></li>
// 					<li class="menu_item menu_mm"><a href="#">Login</a></li>
// 					<li class="menu_item menu_mm"><a href="accomodations">Accomodations</a></li>
// 					<li class="menu_item menu_mm"><a href="contactus">Contact</a></li>
// 				</ul>

// 				{/* <!-- Menu Social --> */}
				
// 				<div class="menu_social_container menu_mm">
// 					<ul class="menu_social menu_mm">
// 						<li class="menu_social_item menu_mm"><a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a></li>
// 						<li class="menu_social_item menu_mm"><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
// 						<li class="menu_social_item menu_mm"><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
// 						<li class="menu_social_item menu_mm"><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
// 						<li class="menu_social_item menu_mm"><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
// 					</ul>
// 				</div>

// 				<div class="menu_copyright menu_mm">Colorlib All rights reserved</div>
// 			</div>

// 		</div>

// 	</div>

	
	
// 	{/* <!-- Home --> */}

// 	<div class="home_about_us">
// 		{/* <!-- Image by https://unsplash.com/@peecho --> */}
// 		<img src='images/about_background.jpg' />
//     {/* <div class="home_background parallax-window" data-parallax="scroll" data-image-src="images/about_background.jpg" data-speed="0.8"></div> */}
// 		<div class="container">
// 			<div class="row">
// 				<div class="col">
// 					<div class="home_content">
// 						<div class="home_content_inner">
// 							<div class="home_title">About us</div>
// 							<div class="home_breadcrumbs">
// 								<ul class="home_breadcrumbs_list">
// 									<li class="home_breadcrumb"><a href="index.html">Home</a></li>
// 									<li class="home_breadcrumb">About us</li>
// 								</ul>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>		
// 	</div>

// {/* 
// 	{/* SIGNUP FORM STARTS HERE */}
// 	<div className="container">
// 	<div className="row">
// 	{/* Col starts here */}
// 	<div className="col-md-6" >
// 	<LoginForm onSignin={this.onSignin}/>
// 	</div>

//    {/* Col ends here */}
// 	{/* Col starts here */}

// 	<div className="col-md-6 " >
		
// 	</div>
//    {/* Col ends here */}

// 	</div>

// 	</div>
	
	

// 	 {/* SIGNUP ENDS HERE */}
//  */}

	 

// 	{/* <!-- Find Form --> */}

// 	<div class="find">
// 		{/* <!-- Image by https://unsplash.com/@garciasaldana_ --> */}
// 		<div class="find_background_container prlx_parent">
// 			<div class="find_background prlx"  style={{"backgroundImage":"url(images/find.jpg)"}}></div>

     
// 		</div>
// 		 <div class="find_background parallax-window" data-parallax="scroll" data-image-src="images/find.jpg" data-speed="0.8"></div> 
// 		<div class="container">
// 			<div class="row">
// 				<div class="col-12">
// 					<div class="find_title text-center">Find the Adventure of a lifetime</div>
// 				</div>
// 				<div class="col-12">
// 					<div class="find_form_container">
// 						<form action="#" id="find_form" class="find_form d-flex flex-md-row flex-column align-items-md-center align-items-start justify-content-md-between justify-content-start flex-wrap">
// 							<div class="find_item">
// 								<div>Destination:</div>
// 								<input type="text" class="destination find_input" required="required" placeholder="Keyword here"/>
// 							</div>
// 							<div class="find_item">
// 								<div>Adventure type:</div>
// 								<select name="adventure" id="adventure" class="dropdown_item_select find_input">
// 									<option>Categories</option>
// 									<option>Categories</option>
// 									<option>Categories</option>
// 								</select>
// 							</div>
// 							<div class="find_item">
// 								<div>Min price</div>
// 								<select name="min_price" id="min_price" class="dropdown_item_select find_input">
// 									<option>&nbsp;</option>
// 									<option>Price</option>
// 									<option>Price</option>
// 								</select>
// 							</div>
// 							<div class="find_item">
// 								<div>Max price</div>
// 								<select name="max_price" id="max_price" class="dropdown_item_select find_input">
// 									<option>&nbsp;</option>
// 									<option>Price</option>
// 									<option>Price</option>
// 								</select>
// 							</div>
// 							<button class="button find_button">Find</button>
// 						</form>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>

// 	{/* <!-- About --> */}

// 	<div class="about">
// 		<div class="container">
// 			<div class="row">
// 				<div class="col">
// 					<div class="section_title text-center">
// 						<h2>We are an award winning Agency</h2>
// 						<div>take a look at our story</div>
// 					</div>
// 				</div>
// 			</div>
// 			<div class="row about_row">
// 				<div class="col-lg-6 about_col order-lg-1 order-2">
// 					<div class="about_content">
// 						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla lectus nec diam auctor, ut fringilla diam sagittis. Quisque vel est id justo faucibus dapibus id a nibh. Aenean suscipit consequat lacus, sit amet mollis nulla. Morbi sagittis orci id lacus convallis tempus eget sit amet metus. Sed finibus, magna at euismod aliquet, enim justo vulputate lorem, sit amet elementum dolor eros sollicitudin dui. Sed ac magna mauris. Nullam lectus odio, viverra vel mi id, interdum imperdiet nulla. </p>
// 						<div class="button about_button"><a href="#">Read More</a></div>
// 					</div>
// 				</div>
// 				<div class="col-lg-6 about_col order-lg-2 order-1">
// 					<div class="about_image">
// 						<img src="images/about.jpg" alt="https://unsplash.com/@sanfrancisco"/>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>

// 	{/* <!-- Milestones --> */}

// 	<div class="milestones">
// 		<div class="milestones_background parallax-window" data-parallax="scroll" data-image-src="images/fact_background.jpg" data-speed="0.8"></div>
// 		<div class="container">
		
		
// 			<div class="row milestones_container">

// 				{/* <!-- Milestone --> */}
// 				<div class="col-lg-3 milestone_col">
// 					<div class="milestone text-center">
// 						<div class="milestone_icon"><img src="images/milestone_1.svg" alt=""/></div>
// 						<div class="milestone_counter" data-end-value="17">0</div>
// 						<div class="milestone_text">Mountains Climbed</div>
// 					</div>
// 				</div>

// 				{/* <!-- Milestone --> */}
// 				<div class="col-lg-3 milestone_col">
// 					<div class="milestone text-center">
// 						<div class="milestone_icon"><img src="images/milestone_2.svg" alt=""/></div>
// 						<div class="milestone_counter" data-end-value="213">0</div>
// 						<div class="milestone_text">Islands Visited</div>
// 					</div>
// 				</div>

// 				{/* <!-- Milestone --> */}
// 				<div class="col-lg-3 milestone_col">
// 					<div class="milestone text-center">
// 						<div class="milestone_icon"><img src="images/milestone_3.svg" alt=""/></div>
// 						<div class="milestone_counter" data-end-value="11923">0</div>
// 						<div class="milestone_text">Photos Taken</div>
// 					</div>
// 				</div>

// 				{/* <!-- Milestone --> */}
// 				<div class="col-lg-3 milestone_col">
// 					<div class="milestone text-center">
// 						<div class="milestone_icon"><img src="images/milestone_4.svg" alt=""/></div>
// 						<div class="milestone_counter" data-end-value="15">0</div>
// 						<div class="milestone_text">Cruises Organized</div>
// 					</div>
// 				</div>

// 			</div>
// 		</div>
// 	</div>

// 	{/* <!-- Services --> */}

// 	<div class="services">
// 		<div class="container">
// 			<div class="row">
// 				<div class="col">
// 					<div class="section_title text-center">
// 						<h2>Popular services that we offer</h2>
// 						<div>take a look at these offers</div>
// 					</div>
// 				</div>
// 			</div>
// 			<div class="row icon_box_container">

// 				{/* <!-- Icon Box --> */}
// 				<div class="col-lg-4 icon_box_col">
// 					<div class="icon_box">
// 						<div class="icon_box_image"><img src="images/service_1.svg" class="svg" alt="https://www.flaticon.com/authors/monkik"/></div>
// 						<div class="icon_box_title">Weekend trips</div>
// 						<p class="icon_box_text">Lorem ipsum dolor sit amet, consectetur adip iscing elit. Fusce fringilla lectus nec diam auctor, ut fringilla diam sagittis.</p>
// 						<a href="#" class="icon_box_more">Read More</a>
// 					</div>
// 				</div>

// 				{/* <!-- Icon Box --> */}
// 				<div class="col-lg-4 icon_box_col">
// 					<div class="icon_box">
// 						<div class="icon_box_image"><img src="images/service_2.svg" class="svg" alt="https://www.flaticon.com/authors/monkik"/></div>
// 						<div class="icon_box_title">Fun leisure trips</div>
// 						<p class="icon_box_text">Lorem ipsum dolor sit amet, consectetur adip iscing elit. Fusce fringilla lectus nec diam auctor, ut fringilla diam sagittis.</p>
// 						<a href="#" class="icon_box_more">Read More</a>
// 					</div>
// 				</div>

// 				{/* <!-- Icon Box --> */}
// 				<div class="col-lg-4 icon_box_col">
// 					<div class="icon_box">
// 						<div class="icon_box_image"><img src="images/service_3.svg" class="svg" alt="https://www.flaticon.com/authors/monkik"/></div>
// 						<div class="icon_box_title">Plane tickets</div>
// 						<p class="icon_box_text">Lorem ipsum dolor sit amet, consectetur adip iscing elit. Fusce fringilla lectus nec diam auctor, ut fringilla diam sagittis.</p>
// 						<a href="#" class="icon_box_more">Read More</a>
// 					</div>
// 				</div>

// 			</div>
// 		</div>
// 	</div>

// 	{/* <!-- Newsletter --> */}

// 	<div class="newsletter">
// 		{/* <!-- Image by https://unsplash.com/@garciasaldana_ --> */}
// 		<div class="newsletter_background" style={{"backgroundImage":"url(images/newsletter.jpg)"}}></div>


// 		<div class="container">
// 			<div class="row">
// 				<div class="col-lg-10 offset-lg-1">
// 					<div class="newsletter_content">
// 						<div class="newsletter_title text-center">Subscribe to our Newsletter</div>
// 						<div class="newsletter_form_container">
// 							<form action="#" id="newsletter_form" class="newsletter_form">
// 								<div class="d-flex flex-md-row flex-column align-content-center justify-content-between">
// 									<input type="email" id="newsletter_input" class="newsletter_input" placeholder="Your E-mail Address"/>
// 									<button type="submit" id="newsletter_button" class="newsletter_button">Subscribe</button>
// 								</div>
// 							</form>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>

// 	{/* <!-- Footer --> */}

// 	<footer class="footer">
// 		<div class="container">
// 			<div class="row">

// 				{/* <!-- Footer Column --> */}
// 				<div class="col-lg-4 footer_col">
// 					<div class="footer_about">
// 						{/* <!-- Logo --> */}
// 						<div class="logo_container">
// 							<div class="logo">
// 								<div>destino</div>
// 								<div>travel agency</div>
// 								<div class="logo_image"><img src="images/logo.png" alt=""/></div>
// 							</div>
// 						</div>
// 						<div class="footer_about_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar sed mauris eget tincidunt. Sed lectus nulla, tempor vel eleifend quis, tempus rut rum metus. Pellentesque ultricies enim eu quam fermentum hendrerit.</div>
// 						{/* <div class="copyright"><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
// Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
// {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></div> */}
// 					</div>
// 				</div>

// 				{/* <!-- Footer Column --> */}
// 				<div class="col-lg-4 footer_col">
// 					<div class="footer_latest">
// 						<div class="footer_title">Latest News</div>
// 						<div class="footer_latest_content">

// 							{/* <!-- Footer Latest Post --> */}
// 							<div class="footer_latest_item">
// 								<div class="footer_latest_image"><img src="images/latest_1.jpg" alt="https://unsplash.com/@peecho"/></div>
// 								<div class="footer_latest_item_content">
// 									<div class="footer_latest_item_title"><a href="news.html">Brazil Summer</a></div>
// 									<div class="footer_latest_item_date">Jan 09, 2018</div>
// 								</div>
// 							</div>

// 							{/* <!-- Footer Latest Post --> */}
// 							<div class="footer_latest_item">
// 								<div class="footer_latest_image"><img src="images/latest_2.jpg" alt="https://unsplash.com/@sanfrancisco"/></div>
// 								<div class="footer_latest_item_content">
// 									<div class="footer_latest_item_title"><a href="news.html">A perfect vacation</a></div>
// 									<div class="footer_latest_item_date">Jan 09, 2018</div>
// 								</div>
// 							</div>

// 						</div>
// 					</div>
// 				</div>

// 				{/* <!-- Footer Column --> */}
// 				<div class="col-lg-4 footer_col">
// 					<div class="tags footer_tags">
// 						<div class="footer_title">Tags</div>
// 						<ul class="tags_content d-flex flex-row flex-wrap align-items-start justify-content-start">
// 							<li class="tag"><a href="#">travel</a></li>
// 							<li class="tag"><a href="#">summer</a></li>
// 							<li class="tag"><a href="#">cruise</a></li>
// 							<li class="tag"><a href="#">beach</a></li>
// 							<li class="tag"><a href="#">offer</a></li>
// 							<li class="tag"><a href="#">vacation</a></li>
// 							<li class="tag"><a href="#">trip</a></li>
// 							<li class="tag"><a href="#">city break</a></li>
// 							<li class="tag"><a href="#">adventure</a></li>
// 						</ul>
// 					</div>
// 				</div>

// 			</div>
// 		</div>
// 	</footer>
// </div>

//   );
//   }
// }

// export default withRouter(SignUp);
