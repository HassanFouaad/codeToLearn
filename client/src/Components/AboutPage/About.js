import React from "react";
import "./style.css";
export default function About() {
  return (
    <section className="about-section spad pt-0">
      <div className="container">
        <div className="section-title text-center">
          <h3>WELCOME TO EZUCA</h3>
          <p>Let children creative and make a different</p>
        </div>
        <div className="row">
          <div className="col-lg-6 about-text">
            <h5>About us</h5>
            <p>
              Lorem ipsum dolor sitdoni amet, consectetur dont adipis elite.
              Vivamus interdum ultrices augue. Aenean dos cursus lania. Duis et
              fringilla leonardo. Mauris mattis phare sem, debut curus risus
              viverra sed.
            </p>
            <h5 className="pt-4">Our history</h5>
            <p>
              Led at felis arcu. Integer lorem lorem, tincidunt eu congue et,
              mattis ut ante. Nami suscipit, lectus id efficitur ornare, leo
              libero convalis nulla, vitae dignissim .
            </p>
            <ul className="about-list">
              <li>
                <i className="fa fa-check-square-o"></i> University Faculties
                organise teaching and research into individual subjects.
              </li>
              <li>
                <i className="fa fa-check-square-o"></i> The University is rich
                in history - its famous buildings attract visitors.
              </li>
              <li>
                <i className="fa fa-check-square-o"></i> 50 years of people, and
                achievements that continue to transform.
              </li>
              <li>
                <i className="fa fa-check-square-o"></i> The University's core
                values are as follows:freedom of thought.
              </li>
            </ul>
          </div>
          <div className="col-lg-6 pt-5 pt-lg-0">
            <img src="img/about.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
