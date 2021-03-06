import {
  AsyncSelect,
  chakraComponents,
  DropdownIndicatorProps,
  GroupBase,
  InputProps,
  MenuProps,
} from "chakra-react-select";
import { LatLng } from "leaflet";
import * as React from "react";
import { Location } from "../../firebase/database";
import { useState } from "react";
import { DEFAULT_CENTER } from "./MapView";

const MQ_PREDICTION_URI = "https://www.mapquestapi.com/search/v3/prediction";
const RESULT_LIMIT = 5;
const COLLECTION = "address,poi";

type Option = { label: string; value: string };
type LocationSuggestion = Option & Location;

const LocationSearch = (props: { setLatLng: (pos: LatLng) => void }) => {
  const [input, setInput] = useState<string>("");

  const getLocations = async (query: string): Promise<Location[]> => {
    if (query.length >= 2) {
      const res = await fetch(
        `${MQ_PREDICTION_URI}?key=${process.env.REACT_APP_MQ_KEY}` +
          `&q=${query}` +
          `&limit=${RESULT_LIMIT}` +
          `&collection=${COLLECTION}` +
          `&location=${DEFAULT_CENTER.lng},${DEFAULT_CENTER.lat}`
      );
      const json = await res.json();
      return json.results as Location[];
    } else {
      return [];
    }
  };

  // const getCurrentLocation = async () => {
  //   navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       const latlng = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       } as LatLng;
  //       props.setLatLng(latlng);
  //     },
  //     (error) => {
  //       alert("Failed to get user location");
  //       console.log(error);
  //     }
  //   );
  // }; // todo

  const customComponents = {
    Menu: ({
      children,
      ...props
    }: MenuProps<LocationSuggestion, false, GroupBase<LocationSuggestion>>) => {
      if (props.options.length === 0) {
        return null;
      } else {
        return (
          <chakraComponents.Menu {...props}>{children}</chakraComponents.Menu>
        );
      }
    },
    Input: ({
      children,
      ...props
    }: InputProps<
      LocationSuggestion,
      false,
      GroupBase<LocationSuggestion>
    >) => {
      return (
        <chakraComponents.Input {...{ "data-cy": "pickup-input", ...props }}>
          {children}
        </chakraComponents.Input>
      );
    },
    DropdownIndicator: ({
      children,
      ...props
    }: DropdownIndicatorProps<
      LocationSuggestion,
      false,
      GroupBase<LocationSuggestion>
    >) => {
      if (props.options.length === 0) {
        return null;
      } else {
        return (
          <chakraComponents.DropdownIndicator {...props}>
            {children}
          </chakraComponents.DropdownIndicator>
        );
      }
    },
  };

  return (
    <AsyncSelect<LocationSuggestion, false, GroupBase<LocationSuggestion>>
      isClearable
      isSearchable
      inputValue={input}
      onInputChange={(newInput, { action }) => {
        if (action === "set-value" || action === "input-change") {
          setInput(newInput);
        }
        return newInput;
      }}
      cacheOptions={true}
      name={"Location"}
      defaultOptions={true}
      placeholder={"The address"}
      onChange={(newValue) => {
        if (newValue !== null) {
          const [lng, lat] = newValue.place.geometry.coordinates;
          const latLng = new LatLng(lat, lng);
          props.setLatLng(latLng);
        } else {
          props.setLatLng(DEFAULT_CENTER);
        }
      }}
      loadOptions={(inputValue, callback) => {
        getLocations(inputValue).then((locs) => {
          const suggestions = locs.map((loc) => ({
            ...loc,
            label: loc.displayString,
            value: loc.name,
          }));
          callback(suggestions);
        });
      }}
      components={customComponents}
      chakraStyles={{
        menu: (provided) => ({ ...provided, zIndex: 10000 }), // leaflet sets their Z-index to something dumb
      }}
    />
  );
};

export default LocationSearch;
