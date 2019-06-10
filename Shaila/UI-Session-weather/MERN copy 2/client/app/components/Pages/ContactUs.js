import React, { Component } from "react";
import "whatwg-fetch";

class ContactUs extends Component{
    render(){
        return(
            <div class="super_container">
                
                {/* <!-- Header --> */}
            
                <header class="header">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="header_container d-flex flex-row align-items-center justify-content-start">
            
                                    {/* <!-- Logo --> */}
                                    <div class="logo_container">
                                        <div class="logo">
                                            <div>Excursion</div>
								            <div>Road Trip Planner</div>
                                            <div class="logo_image"><img src="images/logo.png" alt=""/></div>
                                        </div>
                                    </div>
            
                                    {/* <!-- Main Navigation --> */}
                                    <nav class="main_nav ml-auto">
                                        <ul class="main_nav_list">
                                        <li class="main_nav_item"><a href="/starttrip">Home</a></li>
								            <li class="main_nav_item"><a href="accomodations">Accomodations</a></li>
                                            <li class="main_nav_item active"><a href="contactus">Contact</a></li>
											<li className="main_nav_item"><a href="aboutus">About us</a></li>

                                        </ul>
                                    </nav>
            
                                  
            
                                    {/* <!-- Hamburger --> */}
                                    <div class="hamburger ml-auto"><i class="fa fa-bars" aria-hidden="true"></i></div>
            
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            
            
	{/* <!-- Menu --> */}

<div class="menu_container menu_mm">

    {/* <!-- Menu Close Button --> */}
    <div class="menu_close_container">
        <div class="menu_close"></div>
    </div>

    {/* <!-- Menu Items --> */}
    <div class="menu_inner menu_mm">
        <div class="menu menu_mm">
            <div class="menu_search_form_container">
                <form action="#" id="menu_search_form">
                    <input type="search" class="menu_search_input menu_mm"/>
                    <button id="menu_search_submit" class="menu_search_submit" type="submit"><img src="images/search_2.png" alt=""/></button>
                </form>
            </div>
            <ul class="menu_list menu_mm">
                <li class="menu_item menu_mm"><a href="/starttrip">Home</a></li>
                <li class="menu_item menu_mm"><a href="accomodations">Accomodations</a></li>
                <li class="menu_item menu_mm"><a href="#">Contact</a></li>
				<li class="menu_item menu_mm"><a href="aboutus">About us</a></li>

            </ul>

          

            <div class="menu_copyright menu_mm">Colorlib All rights reserved</div>
        </div>

    </div>

</div>
{/* <!-- Home --> */}

	<div class="home">
		{/* <!-- Image by https://unsplash.com/@peecho --> */}
		<div class="home_background parallax-window" data-parallax="scroll" data-image-src="images/news.jpg" data-speed="0.8"></div>
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="home_content">
						<div class="home_content_inner">
							<div class="home_title">Contact</div>
							<div class="home_breadcrumbs">
								<ul class="home_breadcrumbs_list">
									<li class="home_breadcrumb"><a href="index.html">Home</a></li>
									<li class="home_breadcrumb">Contact</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>		
	</div>


	{/* <!-- Contact --> */}

	<div class="contact">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="contact_title">Get in touch</div>
					<div class="contact_subtitle">say hello</div>
				</div>
			</div>
			<div class="row contact_content">
				<div class="col-lg-5">
					<div class="contact_text">
									
					</div>
					<div class="contact_info">
						<div class="contact_info_box">i</div>
						<div class="contact_info_container">
							<div class="contact_info_content">
								<ul>
									<li>Address: 3000 Landerholm Cir SE, Bellevue, WA 98007</li>
									<li>Phone: +1 123 456 7890</li>
									<li>Email: excursion@gmail.com</li>
								</ul>
							</div>
							
						</div>
					</div>
				</div>
				<div class="col-lg-7">
					<div class="contact_form_container">
						<form action="#" id="contact_form" class="clearfix">
							<input id="contact_input_name" class="contact_input contact_input_name" type="text" placeholder="Name" required="required" data-error="Name is required."/>
							<input id="contact_input_email" class="contact_input contact_input_email" type="text" placeholder="E-mail" required="required" data-error="E-mail is required."/>
							<input id="contact_input_subject" class="contact_input contact_input_subject" type="text" placeholder="Subject"/>
							<textarea id="contact_input_message" class="contact_message_input contact_input_message" name="message" placeholder="Message" required="required" data-error="Please, write us a message."></textarea>
							<button id="contact_send_btn" type="submit" class="contact_send_btn trans_200" value="Submit">Send</button>
						</form>
					</div>
				</div>
			</div>
            </div>
            </div>
         
            







    

    {/* <!-- Footer --> */}

	<footer class="footer">
		<div class="container">
			<div class="row">

				{/* <!-- Footer Column --> */}
				<div class="col-lg-4 footer_col">
					<div class="footer_about">
						{/* <!-- Logo --> */}
						<div class="logo_container">
							<div class="logo">
								<div>Excursion</div>
								<div>Road Trip Planner</div>
								<div class="logo_image"><img src="images/logo.png" alt=""/></div>
							</div>
						</div>
						<div class="footer_about_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar sed mauris eget tincidunt. Sed lectus nulla, tempor vel eleifend quis, tempus rut rum metus. Pellentesque ultricies enim eu quam fermentum hendrerit.</div>
						<div class="copyright">
                        {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
</div>
					</div>
				</div>

			

				

			</div>
		</div>
	</footer>

            </div>
            );
    }
}

export default ContactUs;