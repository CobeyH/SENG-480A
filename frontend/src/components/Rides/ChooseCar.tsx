import { Button, Flex, Select, Spinner, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUserVehicles, Vehicle } from "../../firebase/database";
import { auth } from "../../firebase/firebase";
import { AddCarModal } from "../Profiles/AddCar";

const ChooseCar = (props: {
  carUpdate: (car: Vehicle | undefined) => void;
  carId?: string;
}) => {
  const [user] = useAuthState(auth);
  const [cars, loadingCars] = useUserVehicles(user?.uid);
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!user) return null;

  useEffect(() => {
    if (cars && cars.length > 0 && !props.carId) {
      props.carUpdate(cars[0]);
    }
  }, [loadingCars, cars]);

  return loadingCars ? (
    <Spinner />
  ) : !cars || cars.length == 0 ? (
    <Flex alignContent={"flex-start"}>
      <Button onClick={onOpen}>Add a Car</Button>
      <AddCarModal user={user} modalProps={{ isOpen, onClose }} />
    </Flex>
  ) : (
    <Select
      value={props.carId}
      onChange={(e) => {
        if (!e.target.value) {
          return;
        }
        props.carUpdate(cars.find((v: Vehicle) => v.carId === e.target.value));
      }}
      data-cy="choose-car"
    >
      {cars?.map((v: Vehicle) => (
        <option key={v.carId} value={v.carId}>
          {v.displayName}
        </option>
      ))}
    </Select>
  );
};

export default ChooseCar;
