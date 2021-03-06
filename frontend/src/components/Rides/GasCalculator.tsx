import * as React from "react";
import {
  Heading,
  HStack,
  IconButton,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useRidePassengers } from "../../firebase/database";
import { FaGasPump, FaRoad, FaDollarSign, FaInfoCircle } from "react-icons/fa";
const GasCalculator = (props: {
  fuelUsage: number | undefined;
  distance: number | undefined;
  rideId: string;
}) => {
  const gasPrice = 1.95; //TODO: Get real value
  const [passVals, passLoading, passError] = useRidePassengers(props.rideId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!props.fuelUsage || !props.distance) {
    return null;
  }
  const tripCost = ((props.distance * props.fuelUsage) / 100) * gasPrice;

  return (
    <HStack mt={2} p={3} id={`${props.rideId}-gas`}>
      <Heading size="sm" marginRight={10}>
        Fuel Cost: {"$" + tripCost.toFixed(2)}
      </Heading>
      <Spacer />
      <Heading size="sm">
        Cost Per Person:
        {passLoading || passError || !passVals
          ? null
          : " $" + (tripCost / passVals?.length).toFixed(2)}
      </Heading>
      <Spacer />
      <Tooltip
        hasArrow
        label="How was this calculated?"
        bg="gray.300"
        color="black"
      >
        <IconButton
          aria-label="Gas Calculation"
          icon={<FaInfoCircle />}
          onClick={onOpen}
          variant="ghost"
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Gas Calculation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <FaRoad />
              <Text>{props.distance.toFixed(2)} Km</Text>
            </HStack>
            <HStack>
              <FaGasPump />
              <Text>{props.fuelUsage} L/Km</Text>
            </HStack>
            <HStack>
              <FaDollarSign />
              <Text>{gasPrice}/L</Text>
            </HStack>
            <Text>
              We calculate the gas based on factors such as current distance,
              gas price and fuel efficiency of your vehicle.
            </Text>
            <Text>Total Cost = (Distance x Fuel Usage) / 100 x Gas Price</Text>
            <Text>
              ${tripCost.toFixed(2)} = ({props.distance.toFixed(2)} Km x{" "}
              {props.fuelUsage} L/Km) / 100 x ${gasPrice}
            </Text>
            <Text>
              Please be aware that the actual cost of gas can be different due
              to factors such as local gas price, terrain and your driving
              style.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default GasCalculator;
