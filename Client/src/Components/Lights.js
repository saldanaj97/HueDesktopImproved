import React from "react";
import { IconButton } from "@chakra-ui/button";
import { BsLightbulb, BsLightbulbFill } from "react-icons/bs";
import { Box, Heading } from "@chakra-ui/layout";

export default function Lights() {
  let myLights = [
    { id: 1, name: 1 },
    { id: 2, name: 2 },
    { id: 3, name: 3 },
  ];

  return (
    <div className='lights-container'>
      <Heading className='lights-heading'>My Lights</Heading>
      <Box className='lights-list'>
        {myLights.map((light) => {
          return <IconButton placeholder={light.name} as={BsLightbulbFill} color='black' background='transparent' />;
        })}
      </Box>
    </div>
  );
}
