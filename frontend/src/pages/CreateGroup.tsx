import React, { useState } from "react";
import {
  Button,
  Heading,
  Input,
  InputGroup,
  Text,
  Stack,
  HStack,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { db, DBConstants } from "../firebase/database";
import { useNavigate } from "react-router-dom";
import { get, query, ref, set } from "firebase/database";
import slugify from "slugify";
import Header from "../components/Header";
import DropZone, { storage } from "../firebase/storage";
import { uploadBytes } from "firebase/storage";
import { ref as storRef } from "firebase/storage";

type ValidatableFiled<T> = {
  field: T;
  invalid: boolean;
};

export type Group = {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  rides: { [key: string]: boolean };
  members: { [key: string]: boolean };
  owner: string;
  banner?: string;
};

const createGroup = async (groupData: Omit<Group, "id">, userId: string) => {
  const group = {
    ...groupData,
    id: slugify(groupData.name, DBConstants.KEY_SLUG_OPTS),
  };
  if (
    (await get(query(ref(db, `${DBConstants.GROUPS}/${group.id}`)))).exists()
  ) {
    /* TODO: increment id */
    throw new Error("Group ID already exists");
  }
  group.members[userId] = true;
  await set(ref(db, `${DBConstants.GROUPS}/${group.id}`), group);
  return group;
};

const CreateGroup = () => {
  // TODO: Fix type
  const [banner, setBanner] = useState<Blob | MediaSource>();

  const handleCallback = (childBanner: Blob | MediaSource) => {
    setBanner(childBanner);
  };

  const [user] = useAuthState(auth);
  const [{ field: name, invalid: invalidName }, setName] = useState<
    ValidatableFiled<string>
  >({
    field: user ? user.displayName + "'s Group" : "",
    invalid: false,
  });
  const [description, setDescription] = useState("");
  const [isPrivate, setPrivate] = useState<boolean>(true);

  const isInvalidName = (name: string) => name.length === 0;
  const navigate = useNavigate();

  const uploadBanner = async (groupId: string) => {
    if (!banner) {
      return;
    }
    const blobUrl = URL.createObjectURL(banner);
    const blob = await fetch(blobUrl).then((r) => r.blob());
    const imageRef = storRef(storage, `banners/${groupId}`);
    await uploadBytes(imageRef, blob);
    return imageRef;
  };

  return (
    <>
      <Header pages={[{ label: "Group List", url: "/" }]} />
      <InputGroup paddingInline={5}>
        <Stack>
          <Heading textAlign={"center"}>Create Group</Heading>
          <HStack>
            <Text mb={"8px"}>Name</Text>
            <Input
              value={name}
              placeholder={"name"}
              onInput={(e) =>
                setName({
                  field: e.currentTarget.value,
                  invalid: isInvalidName(e.currentTarget.value),
                })
              }
              isInvalid={invalidName}
            />
          </HStack>
          <HStack>
            <Text mb={"8px"}>Description</Text>
            <Textarea
              value={description}
              placeholder={"Description"}
              onInput={(e) => setDescription(e.currentTarget.value)}
              isInvalid={invalidName}
            />
          </HStack>
          <HStack>
            <Text mb={"8px"}>Private Group:</Text>
            <Checkbox
              isChecked={isPrivate}
              onChange={(e) => setPrivate(e.target.checked)}
            />
          </HStack>
          <DropZone parentCallback={handleCallback} />
          <Button
            onClick={() => {
              if (user?.uid !== undefined) {
                createGroup(
                  {
                    description,
                    isPrivate,
                    name,
                    rides: {},
                    members: {},
                    owner: user?.uid,
                  },
                  user.uid
                ).then((group) => {
                  navigate(`/group/${group.id}`);
                  uploadBanner(group.id).then((url) => {
                    const groupRef = ref(db, `groups/${group.id}`);
                    set(groupRef, { ...group, banner: url?.fullPath });
                  });
                });
              }
            }}
          >
            Create
          </Button>
        </Stack>
      </InputGroup>
    </>
  );
};

export default CreateGroup;
