import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';
import { Badge } from 'reactstrap';
import { Calendar } from 'react-date-range';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import {sendLocation} from './../actions'
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import MapContainer from './MapContainer.js';


class Home extends Component {

    state = {
        from :'',
        to:'',
        redirect: false
    }

    handleLocations = (location)=>{
        if(location.target.id=='from'){
            this.setState({from:location.target.value})
        }
        else{
            this.setState({to:location.target.value})
        }
       // console.log('HEYY ',location.target.id)
    }

    handleLocationSubmit = ()=>{
        this.props.dispatch(sendLocation(this.state));
        this.setState({redirect:true})
        console.log("The Locations are ",this.state);
    }



      renderRedirect = () => {
        if (this.state.redirect) {
           return <Redirect to='/Map' />
        }
      }


    render() {

        return (
            <div class="bg">
                <div className="text-center">

                    <div className="landingpage-style">
                        <h1>Road Trip Advisor</h1>
                        <p> Share Road Trip Advisor with your friends!</p>
                    </div>
                    <div class="container my-1">
                        <div class="row text-center pb-1">

                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card acik-renk-form">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="form-group ">
                                                    <input type="Location" onChange={(event)=>this.handleLocations(event)} class="form-control" id="from" placeholder="Starting From" />
                                                </div>
                                            </div>


                                            <div class="col-md-3">
                                                <div class="form-group ">
                                                    <input type="Destination" onChange={(event)=>this.handleLocations(event)} class="form-control" id="to" placeholder="Destination" />

                                                </div>
                                            </div>

                                            <div class="col-md-3 ">
                                                <div class="form-group ">

                                                    <DateRangePicker onApply={this.handleApply}
                                                        isInvalidDate={this.checkInvalidDates}
                                                        opens='left'
                                                        containerStyles={{ display: 'block' }}>
                                                        <input ref={this.dateRef} id='dates' type='text' className='form-control'></input>
                                                    </DateRangePicker>

                                                </div>
                                            </div>

                                            <div class="col-md-3 ">
                                                <div class="form-group ">

                                                    <input type="time" placeholder="Return" className="form-control" />

                                                </div>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-md-9">
                                                <div class="form-group ">
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                            {this.renderRedirect()}
                                                <button
                                                    onClick={this.handleLocationSubmit}
                                                    type="button"
                                                    class="btn btn-warning  pl-5 pr-5"> Search </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>



        );
    }
}



export default connect()(Home);