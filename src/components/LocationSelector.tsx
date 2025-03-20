import { useEffect, useState } from "react";
import statesData from "../data/location.json";
import { useLocationStore } from "../stores/useLocationStore";

const LocationSelector = ({
  defaultState,
  defaultCity,
}: {
  defaultState: string;
  defaultCity: string;
}) => {
  const { selectedState, selectedCity, setSelectedState, setSelectedCity } =
    useLocationStore();
  const [searchState, setSearchState] = useState("");
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    if (defaultState) setSelectedState(defaultState);
    if (defaultCity) setSelectedCity(defaultCity);
  }, [defaultState, defaultCity, setSelectedState, setSelectedCity]);

  const filteredStates = Object.keys(statesData).filter((state) =>
    state.toLowerCase().includes(searchState.toLowerCase())
  );

  const filteredCities =
    selectedState && statesData[selectedState as keyof typeof statesData]
      ? statesData[selectedState as keyof typeof statesData].filter((city) =>
          city.toLowerCase().includes(searchCity.toLowerCase())
        )
      : [];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full">
        <select
          className="w-full p-2 border rounded-md mt-2"
          onChange={(e) => setSelectedState(e.target.value)}
          value={selectedState}
        >
          <option value="">Select State</option>
          {filteredStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {/* <input
          type="text"
          value={searchState}
          onChange={(e) => setSearchState(e.target.value)}
          placeholder="Search state..."
          className="w-full p-2 border rounded-md mt-2"
        /> */}
      </div>

      <div className="w-full">
        <select
          className="w-full p-2 border rounded-md mt-2"
          onChange={(e) => setSelectedCity(e.target.value)}
          value={selectedCity}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {filteredCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {/* <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Search city..."
          className="w-full p-2 border rounded-md mt-2"
          disabled={!selectedState}
        /> */}
      </div>
    </div>
  );
};

export default LocationSelector;
