import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useLocationStore } from "../stores/useLocationStore";
import { Loader, PenLine } from "lucide-react";
import LocationSelector from "./LocationSelector";
import { useUserStore } from "../stores/useUserStore";

const UserAddress = () => {
  const { user } = useAuthStore();
  const {
    editAddress: updateNewAddress,
    loading, 
    address,
    addAddress,
  } = useUserStore();
  const { selectedState, selectedCity, setSelectedState, setSelectedCity } =
    useLocationStore();
  const [toggleAction, setToggleAction] = useState(false);
  const [formData, setFormData] = useState({
    street: user?.address.street || "",
    city: user?.address.city || selectedCity,
    state: user?.address.state || selectedState,
    zipCode: user?.address.zipCode || "",
    country: "Nigeria", //  Nigeria should be default until we start reaching other countries
  });
  
  useEffect(() => {
    if (user?.address) {
      setSelectedState(user.address.state || "");
      setSelectedCity(user.address.city || "");
    }
  }, [user?.address, setSelectedState, setSelectedCity]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      city: selectedCity,
      state: selectedState,
    }));
  }, [selectedCity, selectedState]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      updateNewAddress(formData);
    } else {
      addAddress(formData);
    }
    setToggleAction(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Your Address</h2>
        {!address ? (
          <button
            onClick={() => setToggleAction(!toggleAction)}
            className="font-bold p-2"
          >
            add
          </button>
        ) : (
          <button
            onClick={() => setToggleAction(!toggleAction)}
            className="flex gap-2 items-center text-accent hover:bg-[#f872c573] p-2 transition rounded-full"
          >
            <PenLine />
          </button>
        )}
      </div>

      <p className="mb-4 text-zinc-500">
        The following address will be used on the checkout page by default
      </p>
      <form onSubmit={handleEdit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={!toggleAction ? "opacity-50" : ""}>
            <label className="text-gray-600 text-sm">Street</label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              readOnly={!toggleAction}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                toggleAction
                  ? "border-gray-400 focus:ring-2 focus:ring-accent"
                  : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            />
          </div>

          {!toggleAction && (
            <>
              <div className={!toggleAction ? "opacity-50" : ""}>
                <label className="text-gray-600 text-sm">City</label>
                <input
                  type="text"
                  value={selectedCity}
                  readOnly
                  className={`bg-gray-100 text-gray-600 cursor-not-allowed w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    toggleAction
                      ? "border-gray-400 "
                      : "bg-gray-100 text-gray-600"
                  }`}
                />
              </div>

              <div className={!toggleAction ? "opacity-50" : ""}>
                <label className="text-gray-600 text-sm">State</label>
                <input
                  type="text"
                  value={selectedState}
                  readOnly
                  className={`bg-gray-100 text-gray-600 cursor-not-allowed w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    toggleAction
                      ? "border-gray-400 "
                      : "bg-gray-100 text-gray-600"
                  }`}
                />
              </div>
            </>
          )}

          <div className={!toggleAction ? "opacity-50" : ""}>
            <label className="text-gray-600 text-sm">Country</label>
            <input
              type="text"
              value={formData.country}
              readOnly
              className="text-gray-600 cursor-not-allowed w-full px-4 py-2 border rounded-lg border-gray-400 bg-gray-100 outline-none opacity-40"
            />
          </div>

          {toggleAction && (
            <div className="md:col-span-2">
              <LocationSelector
                defaultState={formData.state}
                defaultCity={formData.city}
              />
            </div>
          )}

          <div
            className={
              !toggleAction ? "md:col-span-2 opacity-50" : "md:col-span-2"
            }
          >
            <label className="text-gray-600 text-sm">Zip Code</label>
            <input
              type="text"
              value={formData.zipCode}
              readOnly={!toggleAction}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                toggleAction
                  ? "border-gray-400 focus:ring-2 focus:ring-accent"
                  : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          {toggleAction && (
            <>
              <button
                type="button"
                className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 transition-all"
                onClick={() => setToggleAction(false)}
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="disabled:opacity-50 px-4 py-2 bg-accent text-textOnAccent rounded-lg hover:opacity-85 transition-all"
              >
                {loading ? (
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Loader
                      size={20}
                      className="animate-spin"
                      aria-hidden={true}
                    />
                    <span>Loading...</span>
                  </div>
                ) : (
                  <div className="flex flex-row justify-center items-center gap-2">
                    <PenLine size={20} />
                    <span>Save changes</span>
                  </div>
                )}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserAddress;
