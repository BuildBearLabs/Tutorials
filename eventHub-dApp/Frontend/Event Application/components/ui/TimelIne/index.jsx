import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "../../../artifacts/contractABI.json";
import axios from "axios";
import { useRouter } from "next/router"
import { FailedToast } from "@/utils/toast";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const TimeLine = () => {
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [fetchData, setFetchData] = useState(true);
  const [loader, setLoader] = useState(false);
  // contract information
  const Navigate = useRouter();
  const contractAddress = "0xB67B982508fBA0DcD296256c90de7173956F4db1";

  useEffect(() => {
    if (fetchData) {
      setLoader(true);
      const updateEthers = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
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
          setLoader(false)
        } else {
          FailedToast("Need to install MetaMask")
          Navigate.push('/login')
        }
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
          let data = await currentContract.getAllEvents();
          const currentDate = new Date();
          const FinalData = await Promise.all(
            data.map(async (Item, idx) => {
              return {
                id: idx,
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
          const filteredData = FinalData.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= currentDate; // Keep events with dates on or after the current date
          });
          filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
          setAllEvents(filteredData);
          setFetchData(false);
        } catch (err) {
          console.log(err);
        }
      };
      updateEthers();
    }
  }, [fetchData]);

  return (
    <div>
      <div className="main">
        <h3 className="head">Upcomming Events</h3>
          {
            loader &&
            <Box sx={{ display: 'flex', justify: "center", alignItem: "center" }}>
              <CircularProgress />
            </Box>
          }
        <div className="container">
          {
            !loader && <ul>
              {allEvents?.map((item, _idx) => (
                <li key={_idx} className="relative">
                  <span className="date">{item.date}</span>
                  <span className="circle"></span>
                  <div key={_idx + 100} className="list-item-box my-4">
                    <span className="bg-blue-500 rouded-md px-3 py-1 text-white rounded-3xl">
                      {item.time}
                    </span>
                    <div className="flex my-2">
                      <span className="circle"></span>
                      <img
                        className="hidden sm:block w-[170px] mr-2"
                        src={item.eventImage}
                        alt=""
                      />
                      <div className="ml-2  mt-1 pb-10">
                        <h3 className="heading font-bold text-xl">
                          {item.title}
                        </h3>
                        <a
                          href={`/events/view/${item.id}`}
                          className="py-2 px-4 text-center rounded-3xl duration-150 text-white text-bold text-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-5 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:ring ring-transparent ring-offset-2 transition mr-2 absolute bottom-3 right-2"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
