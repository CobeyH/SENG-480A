import React, { useState } from "react";
import {
  Button,
  Flex,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { MdEmail } from "react-icons/all";
import { User } from "firebase/auth";
import ChooseCar from "../Rides/ChooseCar";
import CarStatsSlider from "./CarStatsSlider";
import VerifiedStep from "../VerifiedStep";
import {
  setUserVehicle,
  Vehicle,
  useUserVehicles,
} from "../../firebase/database";

const cars: Vehicle[] = [
  { type: "Two-seater", fuelUsage: 10, numSeats: 2 },
  { type: "Subcompact", fuelUsage: 8, numSeats: 5 },
  { type: "Compact", fuelUsage: 8.2, numSeats: 5 },
  { type: "Mid-size", fuelUsage: 8.5, numSeats: 5 },
  { type: "Station-Wagon", fuelUsage: 10, numSeats: 5 },
  { type: "Electric", fuelUsage: 5, numSeats: 5 },
];

const ManageCars = (props: { user: User }) => {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Vehicle>();
  const [car, setCar] = useState<Vehicle>(cars[0]);
  const user = props.user;
  const toast = useToast();
  const [displayName, setDisplayName] = useState("");

  const submitCar = () => {
    modifyCar(props.user, {
      ...car,
      displayName,
    }).then(() => {
      toast({
        title: "Car created",
        description: `We've created a car with ${car.numSeats} seats.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    });
  };

  const modifyCar = async (user: User, car: Vehicle) => {
    if (!user || !car.displayName) {
      return;
    }
    car.carId = car.displayName?.replace(/\s+/g, "-").toLowerCase();
    //TODO: User feedback on error states
    await setUserVehicle(user.uid, car);
  };

  console.log(useUserVehicles(user.uid)[0]?.[2]);

  return (
    <MenuItem onClick={() => setUserModalOpen(true)}>
      Manage Cars
      <Modal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        isCentered={true}
      >
        <ModalContent h={"container.xs"} padding={"4"} w={"95%"}>
          <ModalCloseButton />
          <ModalHeader>Manage Cars</ModalHeader>
          <ModalBody>
            <ChooseCar
              carUpdate={(car) => {
                setSelectedCar(car);
              }}
            />
            {selectedCar ? (
              <CarStatsSlider
                car={selectedCar}
                updateCar={setSelectedCar}
                isDisabled={false}
              />
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button>Save</Button>
            <Button>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MenuItem>
  );
};

export default ManageCars;
