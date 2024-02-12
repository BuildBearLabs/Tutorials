import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../Input";
import { Button } from "@/components/ui/button";
import Tiptap from "./Tiptap";
import { X, MoveRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import contractABI from "../../../artifacts/contractABI.json";
import { ethers } from "ethers";
import dynamic from "next/dynamic";
import { FailedToast, SuccessToast } from "@/utils/toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CreateEvent = () => {
  const [address, setAddress] = useState(
    useSelector((state) => state.userCredentials)
  );
  const [eventImage, setEventImage] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [eventCost, setEventCost] = useState(null);
  const [meetUrl, setMeetUrl] = useState(null);
  const [ticketLimit, setTicketLimit] = useState(null);
  const Navigate = useRouter();
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!address.address) {
      Navigate.push("/login");
    }
    updateEthers();
  }, []);

  // contract information
  const contractAddress = "0xA6C2C14a5b93f013b7c5A650966FF9c5536D5a57";

  const updateEthers = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

    const signer = await provider.getSigner();
    setSigner(signer);

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contract);
  };

  const submitEvent = async () => {
    setLoader(true);
    try {
      let convertedCost = (parseFloat(eventCost) * (1 * 10 ** 18)).toString();
      const data = {
        title,
        description,
        eventImage,
        date,
        time,
        convertedCost,
        meetUrl,
        ticketLimit,
      };
      console.log(data);

      axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/url`,
          {
            image: eventImage,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          data.eventImage = res.data.data.shortenedString; //Here it is updating the image string just a sequence of string witj 10 characters in it... like 1as82jjdj8
          data.eventCost *= 1;
          data.ticketLimit *= 1;
          // Ensure the wallet is connected
          if (!address) {
            FailedToast("Wallet not connected");
            setLoader(false);
            return;
          }
          const tx = await contract.createEvent(
            data.title,
            data.description,
            data.eventImage,
            data.date,
            data.time,
            data.convertedCost,
            data.meetUrl,
            data.ticketLimit
          );

          await tx.wait();
          SuccessToast("Event Created Successfully");
          Navigate.push("/events/view");
          setLoader(false);
        })
        .catch((err) => {
          FailedToast(err.message);
          setLoader(false);
        });
    } catch (err) {
      FailedToast(err.message);
      setLoader(false);
    }
  };

  const ImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const maxWidth = 300; // Set your desired maximum width
          const maxHeight = 150; // Set your desired maximum height

          let width = img.width;
          let height = img.height;

          // Resize the image if necessary
          if (width > maxWidth || height > maxHeight) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }

            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          // Get the compressed image as a base64 string
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.3); // Adjust the quality as needed

          setEventImage(compressedBase64);
        };

        img.src = reader.result;
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="max-w-screen min-h-screen py-10 overflow-hidden"
      style={{ backgroundColor: "#f4f5f6" }}
    >
      <div className="max-w-2xl mx-auto space-y-3 sm:text-center m-auto mb-5">
        <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl text-center mx-3">
          Create Extraordinary Events
        </h2>
        <p className="text-center mx-3">
          Empowering You to Craft Unforgettable Events, Every Step of the Way
        </p>
      </div>
      {loader && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <div className="rounded-lg shadow-md min-h-[600px] max-w-[800px] m-auto p-5 flex flex-row flex-wrap justify-center md:justify-between bg-white">
        <div className="max-w-[400px] w-[100%] mr-3 mb-5">
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "30px",
              maxWidth: "250px",
              textAlign: "center",
              padding: "8px",
              margin: "20px auto",
            }}
          >
            <span className="font-bold mr-2">Address: </span>{" "}
            {address?.address?.substring(0, 8)}......
            {address?.address?.substring(address?.address?.length - 4)}
          </div>
          <Input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="font-bold text-lg"
            style={{ border: "1px solid #ccc" }}
            placeholder="Event Name"
            type="text"
          />
          <div className="flex justify-center items-center mt-7">
            <label className="mr-2 "> Event Date: </label>
            <input
              onChange={(e) => {
                setDate(e.target.value);
              }}
              style={{ border: "1px solid #ccc" }}
              className="w-[100%] p-2 flex-1"
              type="date"
              placeholder="Pick Event Date"
            />
          </div>
          <div className="flex justify-center items-center mt-7">
            <label className="mr-2 "> Event Time: </label>
            <input
              onChange={(e) => {
                setTime(e.target.value);
              }}
              style={{ border: "1px solid #ccc" }}
              className="w-[100%] p-2 flex-1"
              type="time"
              placeholder="Pick Event Time"
            />
          </div>
          <Tiptap description={description} setDescription={setDescription} />
        </div>
        <div className="max-w-[300px] w-[auto] h-[100%] min-h-[600px] relative flex justify-center items-center">
          <div className="">
            {!eventImage ? (
              <>
                <img
                  src="/eventsbackground.png"
                  className="rounded-lg max-w[100%] max-w-[100%] w-[auto] sm:max-w-[300px]"
                  alt="events-background"
                  style={{ height: "auto", margin: "0 10px" }}
                  // height={100} // Set the height property for the default image
                  // width={400} // Set the width property for the default image
                />
                <div className="m-auto grid w-full max-w-sm items-center gap-1.5 pt-2">
                  <label
                    className="font-bold text-lg font-sans mt-2"
                    htmlFor="picture"
                  >
                    Upload Event Thumbnail
                  </label>

                  <Input
                    onChange={ImageUpload}
                    id="picture"
                    type="file"
                    accept="image/*"
                  />
                </div>
              </>
            ) : (
              <div className="relative">
                <img
                  width={400}
                  height={500} // Set the height property for the uploaded image
                  className="rounded-lg"
                  src={eventImage}
                  alt="events-background"
                />
                <X
                  onClick={() => {
                    setEventImage(null);
                  }}
                  style={{
                    backgroundColor: "rgba(100, 0, 0,0.5)",
                    color: "#ffffff",
                    borderRadius: "50%",
                    padding: "4px",
                    top: "-14px",
                    right: "-14px",
                    cursor: "pointer",
                  }}
                  className="absolute"
                />
              </div>
            )}
            <div className="flex justify-center items-center mt-5">
              <label className="mr-2 "> Ticket Fee: </label>
              <input
                onChange={(e) => {
                  setEventCost(e.target.value);
                }}
                style={{ border: "1px solid #ccc" }}
                className="w-[100%] p-2 flex-1"
                type="number"
                placeholder="cost (eth)"
              />
            </div>
            <div className="flex justify-center items-center mt-5">
              <label className="mr-2 "> Total Seats: </label>
              <input
                onChange={(e) => {
                  setTicketLimit(e.target.value);
                }}
                style={{ border: "1px solid #ccc" }}
                className="w-[100%] p-2 flex-1"
                type="text"
                placeholder="seats"
              />
            </div>
            <div className="flex justify-center items-center mt-5">
              <label className="mr-2 "> Meet Link: </label>
              <input
                onChange={(e) => {
                  setMeetUrl(e.target.value);
                }}
                style={{ border: "1px solid #ccc" }}
                className="w-[100%] p-2 flex-1"
                type="text"
                placeholder="Meeting url"
              />
            </div>
            <Button
              disabled={
                !eventImage ||
                !title ||
                !description ||
                !date ||
                !title ||
                !eventCost ||
                !ticketLimit
              }
              onClick={submitEvent}
              style={{
                backgroundColor: `${
                  !eventImage ||
                  !title ||
                  !description ||
                  !date ||
                  !title ||
                  !eventCost ||
                  !ticketLimit
                    ? "rgba(51, 53, 55, 0.6)"
                    : "rgb(51, 53, 55)"
                }`,
                width: "100%",
                borderRadius: "10px",
                color: "#ffffff",
                padding: "10px 0",
                margin: "20px 0",
                bottom: "0",
              }}
              className=""
            >
              Create Event <MoveRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default dynamic(() => Promise.resolve(CreateEvent), { ssr: false });
