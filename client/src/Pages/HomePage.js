import React from "react";
import { Jumbotron } from "reactstrap";
import styled from "styled-components";
import hero from "../images/1.jpg";
import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <HomeWrapper>
      <Jumbotron className="jumbos">
        <div className="hs-item">
          <div className="hs-text">
            <div className="container">
              <div className="row">
                <div className="col-sm-9">
                  <div className="hs-subtitle">CODE TO LEARN</div>
                  <h2 className="hs-title">
                    An investment in knowledge pays the best interest.
                  </h2>
                  <p className="hs-des">
                    Education is not just about going to school and getting a
                    degree. It's about widening your
                    <br />
                    knowledge and absorbing the truth about life. Knowledge is
                    power.
                  </p>
                  <Link to="/courses">
                    <div className="site-btn">Get Started</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Jumbotron>
    </HomeWrapper>
  );
}
const HomeWrapper = styled.div`
  .jumbos {
    background-image: url(${hero});
    background-size: cover;
    background-position: center;
    height: 100vh;
  }
  .hs-subtitle {
    color: var(--hoverColor);
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 2px;
    margin-bottom: 30px;
    position: relative;
  }
  .hs-title {
    color: #fff;
    font-size: 48px;
    margin-bottom: 25px;
    position: relative;
    text-transform: uppercase;
  }
  .hs-item .hs-des {
    color: #fff;
    font-size: 16px;
    line-height: 2;
    position: relative;
  }
  .hs-item .site-btn {
    margin-top: 30px;
  }
`;
