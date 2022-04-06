import { Link } from "react-router-dom";

import { Box, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

const LoggedInNav = () => {
  const deleteToken = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  return (
    <Box textAlign="right">
      <Menu maxW="150px">
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link to="/">Home</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/create">Add training</Link>
          </MenuItem>
          <MenuItem>
            <Link onClick={deleteToken} to="/login">
              Log out
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LoggedInNav;
