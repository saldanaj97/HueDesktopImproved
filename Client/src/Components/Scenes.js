import React, { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
import { getScenes } from "./APIcalls";

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
          <Button key={scene.id} color='black' background='red'>
            <Text>{scene.name}</Text>{" "}
          </Button>
        );
      });
    }
    return sceneButtons;
  };

  return (
    <div className='scenes-container'>
      <Heading className='scenes-heading'>My Scenes</Heading>
      <Box className='scenes-list'>
        <CreateUserSceneButtons />
      </Box>
    </div>
  );
}
