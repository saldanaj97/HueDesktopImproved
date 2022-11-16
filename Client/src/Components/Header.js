import React from "react";
import { Box, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { IoMdSettings } from "react-icons/io";
import { theme } from "../index";

export default function Header() {
  const settingsList = ["Bridge Connection"];

  // Function to return the settings list rendered as menu items
  const RenderSettingsMenuOptions = () => {
    return settingsList.map((option) => {
      return (
        <MenuItem _hover={{ bg: "rgb(128, 163, 136, 0.3)" }}>
          <Text color={"black"}>{option}</Text>
        </MenuItem>
      );
    });
  };

  return (
    <Box className='header-container'>
      <Flex justify='space-between'>
        <Flex className='spacer' flexGrow={1} width='33%' />
        <Heading margin={"5px 0px 0px 5px"} color='white' width='33%' fontWeight='bold' size='lg'>
          Light Control Center
        </Heading>
        <Flex className='settings-button-container' width='33%' justify='flex-end'>
          <Menu className='settings-menu'>
            <MenuButton
              as={IconButton}
              icon={<IoMdSettings size='30px' />}
              _hover={{
                color: theme.mainColors[600],
              }}
              color={"white"}
              background={"transparent"}
              padding='3px'
              rounded={"15px"}
              margin={"5px 5px 0px 5px"}
            />
            <MenuList>
              <RenderSettingsMenuOptions />
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
