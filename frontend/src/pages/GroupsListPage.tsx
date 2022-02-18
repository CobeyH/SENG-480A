import * as React from "react";
import { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { ref } from "firebase/database";
import { useListVals } from "react-firebase-hooks/database";
import { Group } from "./CreateGroup";
import Header from "../components/Header";
import { groupLogos } from "../theme/colours";
import { GiMagnifyingGlass } from "react-icons/all";
import { NavConstants } from "../NavigationConstants";

export default function GroupsListPage() {
  const [user, loading] = useAuthState(auth);
  const [groups, loadingGroups, error] = useListVals<Group>(ref(db, "groups"));

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [user, loading]);

  return (
    <>
      <Header />
      <Container>
        <Center>
          <Heading size={"md"}>My Groups</Heading>
        </Center>
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
        </InputGroup>
        <VStack>
          {groups
            ?.filter(({ members }) => {
              if (
                user !== null &&
                user !== undefined &&
                typeof (user ?? null) === "object" // we love javascript.
              ) {
                return members[user.uid] ?? false;
              } else {
                console.log("null users should be kicked back to login.");
                return false;
              }
            })
            ?.map((group, i) => (
              <Box
                mt={4}
                color={""}
                key={i}
                px={"20%"}
                py={4}
                borderRadius={"4px"}
                backgroundColor={"whiteAlpha.800"}
              >
                <HStack>
                  <Avatar
                    bg={groupLogos[i % groupLogos.length]}
                    size="xs"
                    textAlign="center"
                    name={group.name}
                    onClick={() => navigate(NavConstants.groupWithId(group.id))}
                  />
                  <Link
                    href={NavConstants.groupWithId(group.id)}
                    margin={"2rem"}
                  >
                    {group.name}
                  </Link>
                </HStack>
              </Box>
            ))}
        </VStack>
        {loadingGroups ? <Spinner /> : null}
        {error ? <Text>{JSON.stringify(error)}</Text> : null}
        <Center pt={4}>
          <Button onClick={() => navigate("group/new")}>Create a Group</Button>
        </Center>
      </Container>
    </>
  );
}
