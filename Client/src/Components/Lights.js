import React, { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/button";
import { /* BsLightbulb, */ BsLightbulbFill } from "react-icons/bs";
import { Box, Heading } from "@chakra-ui/layout";
import { getLights } from "./APIcalls";

export default function Lights() {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    getUsersLights();
  });

  const getUsersLights = async () => {
    const data = await getLights();
  };

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
          return <IconButton key={light.id} placeholder={light.name} as={BsLightbulbFill} color='black' background='transparent' />;
        })}
      </Box>
    </div>
  );
}
