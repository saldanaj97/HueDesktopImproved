import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { /* BsLightbulb, */ BsLightbulbFill } from "react-icons/bs";
import { Box, Heading } from "@chakra-ui/layout";
import { getLights, setNewLight } from "./APIcalls";

export default function Lights() {
  const [lights, setLights] = useState({ success: "", userLights: [] });

  useEffect(() => {
    getUsersLights();
  }, []);

  // Function that will handle getting and setting the users light data
  const getUsersLights = async () => {
    const data = await getLights();
    setLights(data);
    CreateUserLightButtons();
  };

  // Function that will be responsible for creating the light buttons for every light the user has connected to a bridge
  const CreateUserLightButtons = () => {
    let lightButtons = (
      <Box>
        <Text>No Scenes Found</Text>
      </Box>
    );

    if (lights.userLights.length !== 0) {
      let userLightButtons = lights.userLights.map((light) => {
        return (
          <IconButton
            key={light.id}
            placeholder={light.name}
            as={BsLightbulbFill}
            color='black'
            background='transparent'
            onClick={() => {
              setNewLight(light.id, light.lightState);
              getUsersLights();
            }}
          />
        );
      });
      return userLightButtons;
    }
    return lightButtons;
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
