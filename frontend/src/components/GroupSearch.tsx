import * as React from "react";
import {
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { GiMagnifyingGlass } from "react-icons/gi";
import { Group } from "../pages/CreateGroup";

const GroupSearch = (props: { groups: Group[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <InputGroup mt={4} size={"sm"}>
        <Input
          textAlign={"center"}
          color="white"
          _placeholder={{ color: "white" }}
          placeholder="Search Groups"
        />
        <InputLeftElement color={"white"}>
          <GiMagnifyingGlass />
        </InputLeftElement>
        <Button onClick={onOpen}>Submit</Button>
      </InputGroup>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Found Public Groups</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              {props.groups
                .filter((group: Group) => !group.isPrivate)
                .map((publicGroup: Group, i: number) => {
                  return (
                    <HStack key={i}>
                      <Heading> {publicGroup.name} </Heading>;
                      <Button> Join </Button>
                    </HStack>
                  );
                })}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupSearch;
