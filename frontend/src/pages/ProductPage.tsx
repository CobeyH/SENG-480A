import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Text,
  HStack,
  Image,
  Spacer,
  Center,
  VStack,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import * as React from "react";
import { HiMenu } from "react-icons/all";
import { useNavigate } from "react-router-dom";
import PriceSelector from "../components/Promotional/PriceSelector";
import { Testimonal as Testimonial } from "../components/Promotional/Testimonial";
import { NavConstants } from "../NavigationConstants";
import { styleColors } from "../theme/colours";

const ProductPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Box
      w="100vw"
      h="-webkit-fit-content"
      bgGradient={`linear(to-r, ${styleColors.mainBlue}, ${styleColors.lightBlue})`}
    >
      <Box
        w="100vw"
        h="-webkit-fit-content"
        bgGradient={`linear(transparent 30%, white)`}
      >
        <Flex
          as="nav"
          bg={styleColors.mainBlue}
          w="100vw"
          p={4}
          textAlign="center"
        >
          <Stack direction={{ base: "column", md: "row" }}>
            <HStack>
              <Image src={"/logo_white.svg"} objectFit="cover" maxW="70px" />
              <Text color="white" fontSize={30} p={1}>
                Tandem
              </Text>
              <Spacer />
              <Box
                display={{ base: "block", md: "none" }}
                onClick={handleToggle}
              >
                <HiMenu />
              </Box>
            </HStack>
            <Spacer />
            <HStack
              spacing={4}
              display={{ base: isOpen ? "block" : "none", md: "flex" }}
            >
              <Menu>
                <MenuButton color="white">
                  Features and Benefits
                  <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem>Friend Group</MenuItem>
                  <MenuItem>Small Organization</MenuItem>
                  <MenuItem>Large Organization</MenuItem>
                  <MenuItem>Enterprise</MenuItem>
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton color="white">
                  Company
                  <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem>Testimonials</MenuItem>
                  <MenuItem>Pricing</MenuItem>
                  <MenuItem>About Us</MenuItem>
                  <MenuItem>Contact Us</MenuItem>
                </MenuList>
              </Menu>

              <Text color="white" fontWeight={400}>
                Pricing
              </Text>

              <Menu>
                <MenuButton color="white">
                  Help
                  <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem>FAQ</MenuItem>
                  <MenuItem>Privacy Policy</MenuItem>
                  <MenuItem>Legal</MenuItem>
                  <MenuItem>Terms of Service</MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            <HStack
              spacing={4}
              pl={4}
              display={{ base: isOpen ? "block" : "none", md: "flex" }}
            >
              <Button
                variant="tandem-product"
                p={4}
                onClick={() => navigate(NavConstants.REGISTER)}
              >
                Register Now
              </Button>
              <Button
                variant="tandem-product"
                p={4}
                onClick={() => navigate(NavConstants.LOGIN)}
              >
                Login
              </Button>
            </HStack>
          </Stack>
        </Flex>
        <Center>
          <HStack pt={175} pb={125}>
            <VStack align="center">
              <VStack align="left">
                <Text
                  color={styleColors.deepBlue}
                  fontSize={30}
                  fontWeight={600}
                >
                  Carpooling made easy.
                </Text>
                <Text
                  color={styleColors.deepBlue}
                  fontSize={30}
                  fontWeight={600}
                >
                  Carpooling made social.
                </Text>
              </VStack>
              <Text color={styleColors.deepBlue} fontSize={18} align="center">
                Connect your circles and get where you need to go together.
              </Text>
              <Box p={35}>
                <Image
                  src={"/logo_white.svg"}
                  alt="white logo"
                  objectFit="cover"
                  maxW="200px"
                />
                <Text color="white" fontSize={30} align="center">
                  Ride Tandem.
                </Text>
              </Box>
            </VStack>
          </HStack>
        </Center>
        <Center>
          <Box w="90vw" pt={10} pb={200}>
            <Text
              bgGradient={`linear(to-r, ${styleColors.darkBlue}, ${styleColors.medBlue}, white)`}
              bgClip="text"
              fontWeight="extrabold"
              fontSize={50}
              align="center"
            >
              Testimonials
            </Text>
            <Grid
              w="90vw"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(5, 1fr)"
              gap={4}
            >
              <GridItem rowSpan={2} colSpan={1}>
                <Testimonial></Testimonial>
              </GridItem>
              <GridItem colSpan={2}>
                <Testimonial></Testimonial>
              </GridItem>
              <GridItem colSpan={2}>
                <Testimonial></Testimonial>
              </GridItem>
              <GridItem colSpan={4}>
                <Testimonial></Testimonial>
              </GridItem>
            </Grid>
          </Box>
        </Center>
        <VStack pb={25}>
          <Text
            bgGradient={`linear(to-r, ${styleColors.medBlue}, ${styleColors.mainBlue})`}
            bgClip="text"
            fontWeight="extrabold"
            fontSize={50}
            align="center"
          >
            Pricing
          </Text>
          <Box pb={50}>
            <PriceSelector />
          </Box>
        </VStack>
        <Spacer />
        <Box w="100vw" bgColor="white" textAlign="center">
          <HStack p={4}>
            <Image
              src={"/logo_darkBlue.svg"}
              alt="dark blue logo"
              objectFit="cover"
              maxW="50px"
            />
            <Text color={styleColors.darkBlue} fontSize="100%" p={1}>
              Tandem
            </Text>
            <Spacer />
            <VStack align="center" pr={100}>
              <b>
                <Text color={styleColors.deepBlue} fontSize="70%">
                  Company
                </Text>
              </b>
              <Text color={styleColors.deepBlue} fontSize="65%">
                About Us
              </Text>
              <Text color={styleColors.deepBlue} fontSize="65%">
                Contact Us
              </Text>
              <Text color={styleColors.deepBlue} fontSize="65%">
                Pricing
              </Text>
              <Text color={styleColors.deepBlue} fontSize="65%">
                Testimonials
              </Text>
            </VStack>
            <VStack pr={200}>
              <b>
                <Text color={styleColors.deepBlue} fontSize="70%">
                  Support
                </Text>
              </b>
              <Text color={styleColors.deepBlue} fontSize="65%">
                Help Center
              </Text>
              <Text color={styleColors.deepBlue} fontSize="65%">
                Privacy Policy
              </Text>
              <Text color={styleColors.deepBlue} fontSize="65%">
                Legal
              </Text>
              <Text color={styleColors.deepBlue} fontSize="65%">
                Terms of Service
              </Text>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
