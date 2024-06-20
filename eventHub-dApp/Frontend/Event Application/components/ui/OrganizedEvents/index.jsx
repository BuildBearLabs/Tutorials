import React from "react";
import Image from "next/image";
import NavLink from "../NavLink";
import sameplepic from "../../../public/sample-picture.jpg";

const OrganizedEvents = ({ image, title }) => {
  return (
                <li className="bg-white border px-4 py-2 rounded-xl">
                    <figure>
                        <div className="flex items-center gap-x-4">
                            <img src={image} className="min-w-[200px] sm:min-w-[250px] w-[100%]" alt="Organized events" />
                        </div>
                        <blockquote>
                            <p className="mt-6 text-gray-700 text-center font-semibold text-lg">
                            {title}
                            </p>
                        </blockquote>
                    </figure>
                </li>
  );
};

export default OrganizedEvents;
