import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { cars, drivers } from "../../../public/_data/cars";
import Button from "../Buttons";
import moment from "moment";
import { CurrentUserContext } from "../../../context/user";
import { useToast } from "@chakra-ui/react";

interface IProps {
  pageId?: string | string[] | undefined;
}
function CreateChecklistContent({ pageId }: IProps) {
  const [selectCar, setSelectCar] = useState("");
  const [driver, setDriver] = useState("");
  const [odometer, setOdometer] = useState("0");
  const [furtherComments, setFurtherComments] = useState("");
  const [imageOne, setImageOne] = useState<any>(null);
  const [imageTwo, setImageTwo] = useState<any>(null);
  const [imageThree, setImageThree] = useState<any>(null);
  const [imageFour, setImageFour] = useState<any>(null);
  const [carJasckIsEnabled, setCarJackIsEnabled] = useState(false);
  const userData = useContext(CurrentUserContext);
  const [spareWheelCheckIsEnabled, setSpareWheelCheckIsEnabled] =
    useState(false);
  const [triagleCheckIsEnabled, setTriangleCheckIsEnabled] = useState(false);
  const [waterCheckIsEnabled, setWaterCheckIsEnabled] = useState(false);
  const [oilCheckIsEnabled, setOilCheckIsEnabled] = useState(false);
  const [tirePressureCheckIsEnabled, setTirePressureCheckIsEnabled] =
    useState(false);

  const router = useRouter();
  // Chakra ui toast
  const toast = useToast();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const dateAdded = new Date();
    const dateAddedFormatted = moment(dateAdded).format("YYYY-MM-DD");
    const infoToPost = {
      pageId,
      selectCar,
      driver,
      odometer,
      furtherComments,
      userData,
      carJasckIsEnabled,
      spareWheelCheckIsEnabled,
      triagleCheckIsEnabled,
      oilCheckIsEnabled,
      waterCheckIsEnabled,
      tirePressureCheckIsEnabled,
      dateAddedFormatted,
    };
    // console.log("infoToPost", infoToPost);
    // console.log(infoToPost);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infoToPost),
    };

    // console.log(props.id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DTV}checklist/create}`,
        requestOptions
      );

      if (response.ok) {
        await response.json();
        toast({
          title: "Checklist added.",
          description: "",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Checklist failed.",
          description: "Checklist already exists.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("create checklist error", error);
    }
  };
  return (
    <form
      className="my-3"
      onSubmit={onSubmit}
      id="CreateChecklistModalContentForm"
    >
      <span>
        <label
          htmlFor="inHouseStatus"
          className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee] sr-only"
        >
          Select car
        </label>
        <select
          value={selectCar}
          onChange={(e) => setSelectCar(e.target.value)}
          id="selectCar"
          className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] cursor-pointer border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option disabled value="">
            Choose car
          </option>
          {cars.map((car) => (
            <option key={car.id} value={`${car.value}`}>
              {car.value}
            </option>
          ))}
        </select>
      </span>
      <span>
        <label
          htmlFor="inHouseStatus"
          className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee] sr-only"
        >
          Select driver
        </label>
        <select
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          id="driver"
          className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] cursor-pointer border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option disabled value="">
            Choose driver
          </option>
          {drivers.map((driver) => (
            <option key={driver.id} value={`${driver.value}`}>
              {driver.value}
            </option>
          ))}
        </select>
      </span>
      <span>
        <label
          htmlFor="odometer"
          className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
        >
          Odometer
        </label>
        <input
          type="number"
          name="odometer"
          id="odometer"
          value={odometer}
          onChange={(e) => setOdometer(e.target.value)}
          className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee]  border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </span>
      <span className="mb-2">
        <p>KMs till next service</p>
        <p>{15000 - parseInt(odometer)}</p>
        <p>
          {15000 - parseInt(odometer) <= 0 ? "Due" : 15000 - parseInt(odometer)}
        </p>
      </span>
      <span className="my-4">
        <h4>Vehicle condition</h4>
      </span>
      <span className="flex flex-col gap-3">
        <span className="flex flex-row-reverse items-center justify-between">
          <input
            type="checkbox"
            id="carJasckIsEnabled"
            name="carJasckIsEnabled"
            className="cursor-pointer accent-sky-700"
            checked={carJasckIsEnabled}
            onChange={() => setCarJackIsEnabled((state) => !state)}
            aria-required
            required
          />
          <label
            htmlFor="carJasckIsEnabled"
            className="cursor-pointer text-sm font-medium  text-gray-900"
          >
            Car jack check
          </label>
        </span>
        <span className="flex flex-row-reverse items-center justify-between">
          <input
            type="checkbox"
            id="spareWheelCheckIsEnabled"
            name="spareWheelCheckIsEnabled"
            className="cursor-pointer accent-sky-700"
            checked={spareWheelCheckIsEnabled}
            onChange={() => setSpareWheelCheckIsEnabled((state) => !state)}
            aria-required
            required
          />
          <label
            htmlFor="spareWheelCheckIsEnabled"
            className="cursor-pointer text-sm font-medium  text-gray-900"
          >
            Spare wheel check
          </label>
        </span>
        <span className="flex flex-row-reverse items-center justify-between">
          <input
            type="checkbox"
            id="triagleCheckIsEnabled"
            name="triagleCheckIsEnabled"
            className="cursor-pointer accent-sky-700"
            checked={triagleCheckIsEnabled}
            onChange={() => setTriangleCheckIsEnabled((state) => !state)}
            aria-required
            required
          />
          <label
            htmlFor="triagleCheckIsEnabled"
            className="cursor-pointer text-sm font-medium  text-gray-900"
          >
            Triangle check
          </label>
        </span>
        <span className="flex flex-row-reverse items-center justify-between">
          <input
            type="checkbox"
            id="waterCheckIsEnabled"
            name="waterCheckIsEnabled"
            className="cursor-pointer accent-sky-700"
            checked={waterCheckIsEnabled}
            onChange={() => setWaterCheckIsEnabled((state) => !state)}
            aria-required
            required
          />
          <label
            htmlFor="waterCheckIsEnabled"
            className="cursor-pointer text-sm font-medium text-gray-900"
          >
            Water check
          </label>
        </span>
        <span className="flex flex-row-reverse items-center justify-between">
          <input
            type="checkbox"
            id="oilCheckIsEnabled"
            name="oilCheckIsEnabled"
            className="cursor-pointer accent-sky-700"
            checked={oilCheckIsEnabled}
            onChange={() => setOilCheckIsEnabled((state) => !state)}
            aria-required
            required
          />
          <label
            htmlFor="oilCheckIsEnabled"
            className="cursor-pointer text-sm font-medium text-gray-900"
          >
            Oil check
          </label>
        </span>
        <span className="flex flex-row-reverse items-center justify-between">
          <input
            type="checkbox"
            id="tirePressureCheckIsEnabled"
            name="tirePressureCheckIsEnabled"
            className="cursor-pointer accent-sky-700"
            checked={tirePressureCheckIsEnabled}
            onChange={() => setTirePressureCheckIsEnabled((state) => !state)}
            aria-required
            required
          />
          <label
            htmlFor="tirePressureCheckIsEnabled"
            className="cursor-pointer text-sm font-medium text-gray-900"
          >
            Tire pressure check
          </label>
        </span>
        <span>
          <label
            htmlFor="furtherComments"
            className="block mb-2 text-sm font-medium  text-gray-900"
          >
            Further comments
          </label>
          <textarea
            name="furtherComments"
            id="furtherComments"
            className="mb-2 bg-white border resize-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full outline-0 p-2.5 "
            value={furtherComments}
            onChange={(event) => setFurtherComments(event.target.value)}
          ></textarea>
        </span>
      </span>

      <div className="flex g-3 justify-between items-center">
        <Button
          type="submit"
          text="Submit"
          className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus: text-white font-semibold  rounded py-3 px-2 my-2 w-full"
        />
        {/* <button
            type="submit"
            className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus: text-white font-semibold  rounded py-3 px-2 my-2 w-full"
          >
            Add
          </button> */}
      </div>
    </form>
  );
}

export default CreateChecklistContent;
