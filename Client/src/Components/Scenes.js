import React, { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
import { getScenes } from "./APIcalls";

export default function Scenes() {
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    getUserScenes();
  });

  const getUserScenes = async () => {
    const data = await getScenes();
  };

  let myScenes = [
    { id: 1, name: "Scene 1" },
    { id: 2, name: "Scene 2" },
    { id: 3, name: "Scene 3" },
    { id: 4, name: "Scene 4" },
    { id: 5, name: "Scene 5" },
  ];

  return (
    <div className='scenes-container'>
      <Heading className='scenes-heading'>My Scenes</Heading>
      <Box className='scenes-list'>
        {myScenes.map((scene) => {
          return (
            <Button key={scene.id} color='black' background='red'>
              <Text>{scene.name}</Text>{" "}
            </Button>
          );
        })}
      </Box>
    </div>
  );
}
