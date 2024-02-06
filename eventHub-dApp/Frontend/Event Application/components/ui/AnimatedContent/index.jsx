import { CldVideoPlayer } from "next-cloudinary"
import NavLink from "../NavLink";

const AnimatedContent = () => {
    return (
        <div className="m-auto mt-10 mb-10 text-white relative">
            <div className="w-[90%] h-[540px] bg-slate-700 p-4 m-auto">
                <div className="py-8 px-4 max-w-2xl mx-auto space-y-3 sm:text-center">
                    <h2 className="text-white text-xl font-extrabold sm:text-4xl pb-4">
                        What is the Benifit of Organizing Event?
                    </h2>
                    <p>
                        Event organizers have special benefits. If an event organizer's payment for their organized events reaches 10 ETH, they will be given a free pass to attend an event.
                    </p>
                    <div className="flex items-center justify-center gap-x-3 font-medium text-sm">
                        <NavLink
                            className="py-2.5 px-4 text-center rounded-xl duration-150 text-white text-bold text-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:ring ring-transparent ring-offset-2 transition mb-5 mt-5"
                            href="/events/create"
                        >
                            Create an event
                        </NavLink>
                    </div>
                    <CldVideoPlayer
                        id="db3mrysudcrwnqwtkl4w"
                        className="hover:scale-100 transition duration-300 ease-in-out rounded-md "
                        style={{ position: "absolute", bottom: "-100px", left: "24%", tranform: "translate(-50%, -24%)", width: "400px" }}
                        src="db3mrysudcrwnqwtkl4w"
                        colors={{
                            base: "rgb(51, 65, 85)",
                            text: "#000",
                            accent: "#fff"
                        }}
                        loop={true}
                        controls={true}
                        autoplayMode="on-scroll"
                    />
                </div>
            </div>
            <div className="sm:h-[140px]"></div>
        </div>
    )
}

export default AnimatedContent