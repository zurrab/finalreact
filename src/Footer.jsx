import React from "react";

function Footer() {
  return (
    <div>
        <nav className=" navbar navbar-expand-lg d-flex mt-4  d-none d-sm-block " >
      <div className="container-fluid ">

          <div className="container  d-flex flex-column   ">
          <h4 className="d-flex justify-content-center text-body-secondary">Typology</h4>
          <div className="d-flex text-grey  d-flex justify-content-center">
              <h5 className="text-body-secondary"> Created <span className="text-decoration-underline">By Zuka Amiridze</span> / </h5> 
              <h5 className="text-body-secondary"> Powered by React.js</h5>
            </div>
            <h6 className="d-flex justify-content-center">All rights reserved</h6>
       
        </div>
      </div>
    </nav>
    <nav className=" navbar navbar-expand-lg d-flex mt-4  d-block d-md-none " >
      <div className="container-fluid ">

          <div className="container  d-flex flex-column   ">
          <h6 className="d-flex justify-content-center text-body-secondary">Typology</h6>
          <div className="d-flex text-grey  d-flex justify-content-center">
              <h6 className="text-body-secondary"> Created <span className="text-decoration-underline">By Zuka Amiridze</span> / </h6> 
              <h6 className="text-body-secondary"> Powered by React.js</h6>
            </div>
            <h6 className="d-flex justify-content-center">All rights reserved</h6>
       
        </div>
      </div>
    </nav>

    </div>
    
    

    
  );
}

export default Footer;
