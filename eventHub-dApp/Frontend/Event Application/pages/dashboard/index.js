import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import OrganizedEvents from "components/ui/OrganizedEvents";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import contractABI from "../../artifacts/contractABI.json";
import dynamic from "next/dynamic";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Dashboard = () => {
  const [address, setAddress] = useState(
    useSelector((state) => state.userCredentials)
  );
  const Navigate = useRouter();
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [fetchData, setFetchData] = useState(true);
  const [loader, setLoader] = useState(true);
  // contract information
  const contractAddress = "0xB67B982508fBA0DcD296256c90de7173956F4db1";

  useEffect(() => {
    if (fetchData) {
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
        await getAllEvents(contract);
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

      const getAllEvents = async (currentContract) => {
        try {
          const data = await currentContract.getAllEvents();
          const FinalData = await Promise.all(
            data.map(async (Item, idx) => {
              return {
                eventOwner: Item.eventOwner,
                date: Item.date,
                time: Item.time,
                title: Item.title,
                description: Item.description,
                eventImage: await getEventImage(Item.eventImage),
                meetUrl: Item.meetUrl,
                ticketLimit: Item.ticketLimit,
                convertedCost: Item.convertedCost,
              };
            })
          );
          setAllEvents(FinalData);
          setFetchData(false);
          setLoader(false);
        } catch (err) {
          console.log(err);
        }
      };
      updateEthers();
    }
  }, [fetchData]);

  useEffect(() => {
    if (!address.address) {
      Navigate.push("/login");
    }
  }, []);
  return (
    <>
      <div className="space-y-3 sm:text-center mt-20 mb-2 mx-2 flex justify-center flex-col">
        <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl text-center mx-2">
          Unleash Extraordinary Events
        </h2>
        <p className="text-center mx-3 leading-8">
          Empowering You to Craft Unforgettable Events, Every Step of the Way
        </p>
      </div>
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
      <div className="max-w-2xl mx-auto space-y-3 sm:text-center mt-20 mb-5">
        <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl text-center">
          Organized Events
        </h2>
        <hr style={{ width: "200px", margin: "10px auto", padding: "2px" }} />
      </div>
      {
      loader &&
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: "auto" }}>
          <CircularProgress />
        </Box>
      }
      <div className="max-w-[1000px] m-auto flex justify-center items-center flex-wrap">
       <div className="mt-12">
       <ul style={{display: "flex"}} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center items-center m-auto flex">
        {allEvents
          .filter(
            (items) => items.eventOwner.toLowerCase() === address?.address
          )
          .map((filteredItem, _idx) => (
            <OrganizedEvents
              image={filteredItem.eventImage}
              title={filteredItem.title}
              key={_idx}
            />
          ))}
              </ul>
</div>
      </div>{" "}
    </>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
