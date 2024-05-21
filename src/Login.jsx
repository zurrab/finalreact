import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from './Footer';

import { Link } from 'react-router-dom';


function Login  () {

  const [email, setEmail]= useState ("");
  const [password, setPassword]= useState ("");

  const navigate = useNavigate ();
  const Login =(event)=>{
    event.preventDefault();

    axios.post("https://apitest.reachstar.io/signin",{
      email : email,
      password: password
    }).then(function(response){
      navigate("/Home");
    }).catch(function(error){
      window.alert("თქვენ ვერ გაიარეთ ავტორიზაცია")
    })
  }

    return (
      <React.Fragment>
        <div className="container mt-5 ">
          <div className="row d-flex justify-content-center align-items-center mt-5">
              <div className="col-6">

              <h2 className='d-flex justify-content-center '>გაიარეთ ავტორიზაცია</h2>
                <form method="POST" onSubmit={(event)=> Login (event)}>
                       <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                         <input className="form-control" type="email" id="email"placeholder="Email"onChange={(event) => setEmail(event.target.value)}/>
                       </div>
                       <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                         <input  className="form-control" type="password" id="password"placeholder="Password"onChange={(event) => setPassword(event.target.value)}/>
                       </div>
                       <div className="form-group d-grid mb-3 ">
                       <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label class="form-check-label" for="defaultCheck1">
                          Remember me
                        </label>
                      </div>
                       <input  className="btn btn-dark mt-3" type="submit" value="ავტორიზაცია" />

                       </div>
                       <p className="text-end me-2 mt-4">
                       Forgot:
                       <Link to="/Signup">Password?</Link>
                        <Link className="ms-2" to="/Signup">Sign up</Link>
                       </p>


                </form>
              </div>
          </div>

        </div>

      

      </React.Fragment>
    )
  };
  
  export default Login;