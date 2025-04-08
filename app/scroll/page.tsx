"use client";

import React from "react";
import { Link, Element } from "react-scroll";

const ReactScrollNavigation = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="section1" smooth={true} duration={500} offset={-50}>
              Go to Section 1
            </Link>
          </li>
          <li>
            <Link to="section2" smooth={true} duration={500} offset={-50}>
              Go to Section 2
            </Link>
          </li>
          <li>
            <Link to="section3" smooth={true} duration={500} offset={-50}>
              Go to Section 3
            </Link>
          </li>
        </ul>
      </nav>

      <Element
        name="section1"
        style={{
          height: "500px",
          backgroundColor: "lightblue",
          marginBottom: "20px",
        }}
      >
        <h2>Section 1</h2>
        {/* Content of Section 1 */}
      </Element>

      <Element
        name="section2"
        style={{
          height: "500px",
          backgroundColor: "lightgreen",
          marginBottom: "20px",
        }}
      >
        <h2>Section 2</h2>
        {/* Content of Section 2 */}
      </Element>

      <Element
        name="section3"
        style={{ height: "500px", backgroundColor: "lightcoral" }}
      >
        <h2>Section 3</h2>
        {/* Content of Section 3 */}
      </Element>
    </div>
  );
};

export default ReactScrollNavigation;
