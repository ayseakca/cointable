import React from "react";
import { Row, Col } from "react-bootstrap";

function ContainerLayout(props) {
  return (
    <Row style={{ justifyContent: "space-around" }}>
      <Col xs={12} md={8} className={"componentContainer"}>
        {props.children}
      </Col>
    </Row>
  );
}

export default ContainerLayout;
