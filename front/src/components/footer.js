import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './footer.js'
const FooterPage = () => {
  return (
    <MDBFooter  className="font-small pt-4 mt-4 " id="foot">
      <MDBContainer fluid className="text-center text-md-left" >
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title"></h5>
            <p>
              
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!"></a>
              </li>
              <li className="list-unstyled">
                <a href="#!"></a>
              </li>
              <li className="list-unstyled">
                <a href="#!"></a>
              </li>
              <li className="list-unstyled">
                <a href="#!"></a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid id='anarana'>
          &copy; {new Date().getFullYear()}  <a className="anarana"> RANAIVONIRINA Patrick </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;

