import React from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { IoMdSettings } from "react-icons/io";
import { theme } from "../index";

export default function Header() {
  return (
    <Box className='header-container'>
      <Box className='settings-button-container'>
        <Flex justify='flex-end'>
          <IconButton
            as={IoMdSettings}
            _hover={{
              color: theme.mainColors[600],
            }}
            color={"white"}
            background={"transparent"}
            size='md'
            padding='3px'
            rounded={"15px"}
            margin={"5px 5px 0px 0px"}
          />
        </Flex>
      </Box>
    </Box>
  );
}
