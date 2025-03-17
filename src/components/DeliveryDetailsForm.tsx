import { FormEvent } from "react";
import LocationSelector from "../components/LocationSelector";
import { Address } from "../types/userTypes";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  location: Address;
  phoneNumber: string;
  additionalNote: string;
}

interface DeliveryDetailsFormProps {
  formData: FormData;
  setFormData: (FormData: FormData) => void;
  shipToDifferentAddress: boolean;
  handleCheckboxChange: () => void;
  isPhoneNumberValid: boolean;
  handleSubmit: (e: FormEvent) => void;
}

const DeliveryDetailsForm = ({
  formData,
  setFormData,
  shipToDifferentAddress,
  handleCheckboxChange,
  isPhoneNumberValid,
  handleSubmit,
}: DeliveryDetailsFormProps) => {
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="text"
          value={formData.email}
          required
          readOnly
          placeholder="johndoe@gmail.com"
          className="bg-zinc-200 w-full outline-none p-2 rounded-md cursor-not-allowed opacity-40"
        />
      </div>

      <div className="flex item-center gap-2">
        <input
          id="change-address"
          type="checkbox"
          checked={shipToDifferentAddress}
          onChange={handleCheckboxChange}
          className="p-2 w-4"
        />
        <label htmlFor="change-address">Ship to a different address?</label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="firstName">Firstname *</label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
            placeholder="John"
            className="bg-zinc-200 w-full outline-none p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastname">Lastname *</label>
          <input
            id="lastname"
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
            placeholder="Doe"
            className="bg-zinc-200 w-full outline-none p-2 rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col opacity-40">
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          required
          readOnly
          value={formData.location.country}
          placeholder="Nigeria"
          className="bg-zinc-200 w-full outline-none p-2 rounded-md cursor-not-allowed"
        />
      </div>
      <div className="md:col-span-2">
        <LocationSelector
          defaultState={formData.location.state}
          defaultCity={formData.location.city}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="street">House Number And Street Name*</label>
        <div className="relative">
          <input
            id="street"
            type="text"
            value={formData.location.street}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location, street: e.target.value },
              })
            }
            required
            placeholder="123 street"
            className="bg-zinc-200 w-full outline-none p-2 rounded-md"
          />
          <input
            id="apartment-suite"
            type="text"
            value={formData.location.buildingType}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: {
                  ...formData.location,
                  buildingType: e.target.value,
                },
              })
            }
            placeholder="Apartment, Suite, Unit ETC (Optional)"
            className="bg-zinc-200 w-full outline-none p-2 rounded-md mt-4"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="zip-code">Zip code *</label>
        <input
          id="zip-code"
          type="text"
          value={formData.location.zipCode}
          onChange={(e) =>
            setFormData({
              ...formData,
              location: { ...formData.location, zipCode: e.target.value },
            })
          }
          required
          placeholder="1000"
          className="bg-zinc-200 w-full outline-none p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="phone">Phone number *</label>
        <input
          id="phone"
          type="text"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
          required
          placeholder="08123456789"
          className={"bg-zinc-200 w-full outline-none p-2 rounded-md"}
        />
        {formData.phoneNumber.length < 1 ||
          (!isPhoneNumberValid && (
            <span className="text-sm mt-1 text-red-500">Invalid Number</span>
          ))}
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="additional-note">Additional Notes</label>
        <textarea
          id="additional-note"
          value={formData.additionalNote}
          onChange={(e) =>
            setFormData({ ...formData, additionalNote: e.target.value })
          }
          placeholder="Leave at the door..."
          className="bg-zinc-200 h-28 w-full outline-none py-2 px-4 rounded-md"
        />
      </div>
      <div>Click enter to Proceed</div>
    </form>
  );
};

export default DeliveryDetailsForm;
