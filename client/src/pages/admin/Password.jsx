import React from "react";
import { SectionTitle } from "../../components";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { ManagePassword } from "../../components";

export const Password = () => {
  return (
    <Container>
      <SectionTitle title="Seguridad" />
      <ManagePassword />
    </Container>
  );
};
