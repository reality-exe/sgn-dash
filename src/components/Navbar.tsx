"use client";
import { Button, Container, Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  navbar_start?: React.ReactNode;
  navbar_center?: React.ReactNode;
  navbar_end?: React.ReactNode;
}

export default function Navbar(props: Props) {
  return (
    <Flex
      style={{ backgroundColor: "Background" }}
      width={{ initial: "100%" }}
      height={{ initial: "5rem" }}
      align={"center"}
      px={"6"}
      gap={"8"}
    >
      <Container flexGrow={"0"}>{props.navbar_start}</Container>
      <Flex flexGrow={"1"} align={"center"} justify={"center"}>
        {props.navbar_center}
      </Flex>
      <Container flexGrow={"0"}>{props.navbar_end}</Container>
    </Flex>
  );
}
