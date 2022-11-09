import React, { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/button";
import { /* BsLightbulb, */ BsLightbulbFill } from "react-icons/bs";
import { Box, Heading } from "@chakra-ui/layout";
import { getLights } from "./APIcalls";

export default function Lights() {
  const [lights, setLights] = useState({ success: "", userLights: [] });

  useEffect(() => {
    getUsersLights();
  }, []);

  const getUsersLights = async () => {
    const data = await getLights();
    setLights(data);
    CreateUserLightButtons();
  };

  const CreateUserLightButtons = () => {
    let userLightButtons = lights.userLights.map((light) => {
      return <IconButton key={light.id} placeholder={light.name} as={BsLightbulbFill} color='black' background='transparent' />;
    });
    return userLightButtons;
  };

  return (
    <div className='lights-container'>
      <Heading className='lights-heading'>My Lights</Heading>
      <Box className='lights-list'>
        <CreateUserLightButtons />
      </Box>
    </div>
  );
}
