import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { BsLightbulbFill } from "react-icons/bs";
import { Box, Heading, Wrap, WrapItem } from "@chakra-ui/layout";
import { getLights, setNewLight } from "./APIcalls";
import { theme } from "../index";

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
          <WrapItem className='single-light-container'>
            <Box width='85px'>
              <IconButton
                key={light.id}
                placeholder={light.name}
                as={BsLightbulbFill}
                color={"white"}
                background={theme.mainColors[600]}
                size='lg'
                padding='7px'
                rounded={"15px"}
                onClick={() => {
                  handlePowerClick(light);
                }}
              />
              <Text className='light-name' fontSize='md' color={"white"}>
                {light.name}
              </Text>
            </Box>
          </WrapItem>
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
    <Box className='lights-container' paddingTop='15px'>
      <Heading className='lights-heading' color={"white"}>
        My Lights
      </Heading>
      <Wrap className='lights-list' justify='center' spacing='50px' margin={"15px"}>
        <CreateUserLightButtons />
      </Wrap>
    </Box>
  );
}
