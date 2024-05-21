import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import Carousel from './Carousel';
import Footer from './Footer';




function Home () {

    const [data,setData]=useState([]);
    useEffect(function (){
        axios.get("https://apitest.reachstar.io/blog/list")
        .then(function(response){
            setData(response.data);
        }).catch(function(error){
            console.log(error)
        });

    })




  return (
   <React.Fragment>
    <Navbar></Navbar>
    <Carousel></Carousel>
   
    <div className='container mt-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded  '>
     <div className='row justify-content-center'>
        <h5 className='d-flex justify-content-center color-prymery mt-3'>LATEST STORIES</h5>
        <div className=' col-12 mt-5'>
            {
                data.map((item, index)=> <div className='card mb-5'>
                    <div className='card-header'>
                        
                        <h3 className='card-title'>{item.title} </h3>  
                     </div>
                    <div className='card-body'>
                    <p dangerouslySetInnerHTML={{__html: item.description}}></p>

                    </div>    
                    <div className='card-footer'>
                    <Link className=" btn btn-success ms-2 rounded-0" to={"/Detail/"+ item.id}>დეტალურად ნახვა</Link>
                     
                    

                    </div>  




                </div>)
            }

        </div>

     </div>

    </div>

    <Footer></Footer>
   </React.Fragment>
    
  );
};

export default Home;
