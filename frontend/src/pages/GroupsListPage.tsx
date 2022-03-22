import * as React from "react";
import { useEffect } from "react";
import {
  Avatar,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Header from "../components/Header";
import { groupLogos } from "../theme/colours";
import { NavConstants } from "../NavigationConstants";
import GroupSearch from "../components/Groups/GroupSearch";
import { Group, useGroups } from "../firebase/database";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { storage } from "../firebase/storage";
import * as icons from "react-icons/gi";
import { IconType } from "react-icons";
import GroupList from "../components/Groups/GroupSelector";

export default function GroupsListPage() {
  const [user, loading] = useAuthState(auth);
  const [groups, loadingGroups, error] = useGroups();

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [user, loading]);

  return (
    <>
      <Header />
      <GroupList />
    </>
  );
}

const GroupListElement = (props: { group: Group; index: number }) => {
  const navigate = useNavigate();
  const photoName = props.group.profilePic;
  const profileRef =
    photoName && photoName.startsWith("profilePics/")
      ? ref(storage, `${photoName}`)
      : undefined;
  const [profilePic, profilePicLoading] = useDownloadURL(profileRef);

  return (
    <>
      <Button
        mt={4}
        textAlign="left"
        onClick={() => navigate(NavConstants.groupWithId(props.group.id))}
      >
        {profilePicLoading ? null : profilePic ? (
          <Avatar
            bg={groupLogos[props.index % groupLogos.length]}
            src={profilePic}
            size="xs"
            name={photoName ? undefined : props.group.name}
            mr={4}
          />
        ) : photoName ? (
          <Avatar
            bg={groupLogos[props.index % groupLogos.length]}
            as={(icons as { [k: string]: IconType })[photoName]}
            size="xs"
            mr={4}
          />
        ) : null}
        {props.group.name}
      </Button>
    </>
  );
};
