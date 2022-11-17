import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { theme } from "../index";

export default function MessageOfTheDay() {
  return (
    <Box className='motd' margin='20px 0px 0px 0px'>
      <Text fontSize={36} color={theme.mainColors[600]} fontWeight='normal'>
        Good Evening
      </Text>
    </Box>
  );
}
