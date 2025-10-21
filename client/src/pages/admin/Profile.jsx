import React from "react";
import { SectionTitle } from "../../components";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { PersonalInfo } from "../../components/admin/PersonalInfo/PersonalInfo";

export const Profile = () => {
  return (
    <Container>
      <SectionTitle title="Información Personal" />
      <PersonalInfo />
    </Container>
  );
};
