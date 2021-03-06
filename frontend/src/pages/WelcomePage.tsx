import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import GroupList from "../components/Groups/GroupSelector";
import { Group } from "../firebase/database";
import {
  Box,
  Center,
  Heading,
  HStack,
  VStack,
  Text,
  Image,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import Tutorial from "../components/Tutorial";
import { FaQuestionCircle } from "react-icons/fa";

export default function WelcomePage() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [groups, setGroups] = useState<Group[]>();

  const navigate = useNavigate();

  const toast = useToast();

  useEffect(() => {
    if (groups && groups.length > 0) {
      navigate(`/group/${groups[0].id}`);
    }
  }, [groups]);

  const tutorialSteps = [
    {
      target: "#get-started",
      content:
        "Welcome to Tandem! An app designed to foster community by bringing people together.",
      disableBeacon: true,
    },
    {
      target: "#tutorial",
      content: (
        <>
          <Text mb={3}>
            If you ever need help, click on the question mark icon.
          </Text>
          <Center>
            <FaQuestionCircle />
          </Center>
        </>
      ),
    },
  ];

  const extraSteps = isMobile
    ? [
        {
          target: "#selector-open",
          content:
            "You can click here to create a group or search for existing groups.",
          spotlightClicks: true,
        },
      ]
    : [
        {
          target: "#new-group",
          content: "You can get started by creating a group of your own.",
        },
        {
          target: "#search-group",
          content: "Or you can search for an established group.",
        },
      ];

  return (
    <>
      <Header tutorialSteps={[...tutorialSteps, ...extraSteps]} />
      <HStack alignItems="flex-start">
        <GroupList updateGroups={setGroups} />
        <Box flexGrow={1}>
          <Center>
            <VStack spacing={"5%"}>
              <Heading
                mt={"20%"}
                id="get-started"
                fontSize={{ base: "2xl", md: "4xl" }}
              >
                Welcome to Tandem!
              </Heading>
              <VStack spacing={1}>
                <Text
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight={"medium"}
                  textColor={"gray.500"}
                >
                  Excuse the occasional flat tire!
                </Text>
                <Image
                  align="center"
                  src={"/FlatTire.png"}
                  alt="flat tire gif"
                  objectFit="cover"
                  maxW="300px"
                />
                <Text
                  fontWeight={"medium"}
                  textColor={"gray.500"}
                  px="20%"
                  textAlign={"center"}
                >
                  Our app is still in <b>beta</b>. We are working to patch
                  things up. Contact our{" "}
                  <Link
                    onClick={() => {
                      navigator.clipboard
                        .writeText("CobeyHollier@gmail.com")
                        .then(() => {
                          toast({
                            title: "Copied Email to Clipboard",
                            status: "success",
                            isClosable: true,
                          });
                        });
                    }}
                    color={"gray.500"}
                    to={""}
                  >
                    <b>
                      <u>support team</u>
                    </b>
                  </Link>{" "}
                  and let us know how we can make your experience better.
                </Text>
              </VStack>
              <Tutorial
                steps={[...tutorialSteps, ...extraSteps]}
                buttonText="Get Started"
              />
              abd2fba (CH: Fixing mobile welcome tutorial)
            </VStack>
          </Center>
        </Box>
      </HStack>
    </>
  );
}
