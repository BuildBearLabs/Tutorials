import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import contractABI from "../../../artifacts/contractABI.json";
import { ethers } from "ethers";
import axios from "axios";
import dynamic from "next/dynamic";
import { FailedToast, SuccessToast } from "@/utils/toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const eventDetail = () => {
  const router = useRouter();
  const [eventId, setEventID] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [fetchData, setFetchData] = useState(true);
  const [event, setEvent] = useState({});
  const [loader, setLoader] = useState(true);
  // contract information
  const contractAddress = "0xA6C2C14a5b93f013b7c5A650966FF9c5536D5a57";

  useEffect(() => {
    if (router.isReady) {
      const urlPath = router.query.index;
      setEventID(urlPath);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (fetchData && eventId !== null) {
      const updateEthers = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        const signer = await provider.getSigner();
        setSigner(signer);

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(contract);
        await getEvent(contract);
      };

      const getEventImage = async (shortendString) => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/url/${shortendString}`,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );
          return res.data.data[0].actualString;
        } catch (err) {
          console.log(err);
          return "/eventsbackground.png"; // or handle the error condition as needed
        }
      };

      const getEvent = async (currentContract) => {
        try {
          const eventId = router.query.index;
          let data = await currentContract.allEvents(eventId);
          // Create a new object with the same properties as data[0]
          const FinalData = {
            date: data.date,
            time: data.time,
            title: data.title,
            description: data.description,
            meetUrl: data.meetUrl,
            ticketLimit: data.ticketLimit,
            eventCost: data.eventCost,
            eventOwner: data.eventOwner,
          };
          FinalData.eventImage = await getEventImage(data.eventImage);
          setEvent(FinalData);
          setLoader(false);
          setFetchData(false);
        } catch (err) {
          console.log(err);
        }
      };
      updateEthers();
    }
  }, [fetchData, eventId]);

  const registerForEvent = async () => {
    try {
      const eventId = router.query.index;
      const updatedCost = ethers.formatUnits(event.eventCost, 18);
      let tx = await contract.registerForEvent(
        event.eventOwner,
        event.eventCost,
        eventId,
        { value: ethers.parseEther(updatedCost) }
      );
      await tx.wait();
      SuccessToast("Registered Successfully");
      router.push("/");
    } catch (err) {
      FailedToast("The event organizer cannot register.");
    }
  };

  return (
    <div>
      {loader && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
          className="min-h-screen"
        >
          <CircularProgress />
        </Box>
      )}
      {!loader && (
        <>
          <div className="max-w-2xl mx-auto space-y-3 sm:text-center m-auto mb-5 mt-10">
            <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl text-center mx-3 underline underline-offset-8 mb-5">
              {event.title}
            </h2>
          </div>
          <div className="flex justify-center mt-10">
            <div
              onClick={() => {
                registerForEvent();
              }}
              className="py-2 px-4 text-center rounded-3xl duration-150 text-white text-bold text-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-5 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:ring ring-transparent ring-offset-2 transition flex justify-center w-[170px] cursor-pointer"
            >
              {" "}
              Join for {Number(event.eventCost) / 10 ** 18} eth
            </div>
          </div>
          <div className="flex justify-center m-auto mt-7 flex-wrap">
            <div className="mr-20 mt-4 md:max-w-[50%] flex flex-col justify-center items-center">
              <p className="font-serif text-xl">
                <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                  Date:{" "}
                </span>{" "}
                {event.date}
              </p>
              <p className="font-serif text-xl mt-3">
                <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mt-3">
                  Time:{" "}
                </span>{" "}
                {event.time}
              </p>
              <div style={{ textAlign: "justify" }} className="leading-8">
                <p className="mt-3">
                  <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mt-3">
                    Event Description:{" "}
                  </span>{" "}
                  <div
                    className="pb-7 ml-4"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                </p>
              </div>
            </div>
            <Image
              src={event.eventImage}
              width={400} // Adjust the width as needed
              height={300}
              className="max-w-[400px] w-[100%] h-auto mt-4 rounded-lg"
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(eventDetail), { ssr: false });
