import React from "react";
import { Container } from "react-bootstrap";

function DefaultLayout(props) {
  // const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return (
    <>
      <Container
        fluid
        className="main-content-container  pb-4"
        style={{
          height: screenHeight,
          backgroundColor: "#eeeaff",
          padding: "2%",
        }}
      >
        {props.children}
      </Container>
    </>
  );
}

export default DefaultLayout;
