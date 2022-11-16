import React, { useState, useEffect } from "react";
import { Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
import { getScenes, setNewScene } from "./APIcalls";
import { theme } from "../index";

export default function Scenes() {
  const [scenes, setScenes] = useState({ success: "", userScenes: [] });

  useEffect(() => {
    getUserScenes();
  }, []);

  // Function that will get and set the users scenes from the backend with API calls
  const getUserScenes = async () => {
    const data = await getScenes();
    setScenes(data);
    CreateUserSceneButtons();
  };

  // Function that will create the user scene buttons
  const CreateUserSceneButtons = () => {
    let sceneButtons = (
      <Box>
        <Text>No Scenes Found</Text>
      </Box>
    );

    if (scenes.userScenes.length != 0) {
      sceneButtons = scenes.userScenes.map((scene) => {
        return (
          <WrapItem>
            <Box width='100%'>
              <Button
                key={scene.id}
                width='100%'
                color='black'
                rounded={"15px"}
                background={theme.mainColors[600]}
                onClick={() => {
                  setNewScene(scene.id);
                }}
              >
                <Text color='white'>{scene.name}</Text>{" "}
              </Button>
            </Box>
          </WrapItem>
        );
      });
    }
    return sceneButtons;
  };

  return (
    <div className='scenes-container' paddingBottom='0px 5px'>
      <Heading className='scenes-heading' color={"white"} fontWeight='normal' size='lg'>
        Scenes
      </Heading>
      <Box>
        <Wrap className='scenes-list' spacing='20px' margin={"15px"} justify='center'>
          <CreateUserSceneButtons />
        </Wrap>
      </Box>
    </div>
  );
}
