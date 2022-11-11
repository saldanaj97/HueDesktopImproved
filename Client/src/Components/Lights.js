import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { BsLightbulbFill } from "react-icons/bs";
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

  // Function that will be responsible for turning a light on and off on click
  const handlePowerClick = async (light) => {
    // Send the req to change the power for a specific light
    const stateUpdated = await setNewLight(light.id, light.lightState).then((response) => response);

    // Update the local copy of the light state in our lights arr
    light.lightState.on = !light.lightState.on;

    // Return the new state of the lights power
    return light.lightState.on;
  };

  // Function that will be responsible for creating the light buttons for every light the user has connected to a bridge
  const CreateUserLightButtons = () => {
    if (lights.userLights.length !== 0) {
      let userLightButtons = lights.userLights.map((light) => {
        return (
          <Flex className='single-light-container' flexDirection='column' justifyContent='center' alignContent='center' width='10%' height='50%'>
            <Flex direction='row' justifyContent='center'>
              <IconButton
                key={light.id}
                placeholder={light.name}
                as={BsLightbulbFill}
                color='black'
                background='transparent'
                onClick={() => {
                  handlePowerClick(light);
                }}
              />
            </Flex>
            <Text className='light-name' fontSize='md'>
              {light.name}
            </Text>
          </Flex>
        );
      });
      return userLightButtons;
    } else {
      return (
        <Box>
          <Text>No Lights Found</Text>
        </Box>
      );
    }
  };

  return (
    <div className='lights-container'>
      <Heading className='lights-heading'>My Lights</Heading>
      <Box className='lights-list' display='flex' justifyContent='center' margin={"15px"} flexWrap='wrap'>
        <CreateUserLightButtons />
      </Box>
    </div>
  );
}
