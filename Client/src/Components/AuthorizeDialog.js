import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

export default function AuthorizeDialog(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { generateAuthUrl } = props;
  const cancelRef = React.useRef();
  let authUrl = "";

  const redirectToAuthUrl = async () => {
    let response = await generateAuthUrl().then((response) => {
      window.open(response.redirectUrl);
      onClose();
    });
  };

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>
        Authorize
      </Button>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Authorize Light Control Center to access Hue
            </AlertDialogHeader>
            <AlertDialogBody>You need to authorize access with Philips Hue Remote API in order to use this application. </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={(e) => {
                  redirectToAuthUrl();
                }}
                ml={3}
              >
                Go
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
