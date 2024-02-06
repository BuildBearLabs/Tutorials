import NavLink from "../NavLink"

const Hero = () => (
    <section>
        <div className="custom-screen py-28 text-gray-600">
            <div className="space-y-5 max-w-4xl mx-auto text-center">
                <h3 className="text-center text-2xl text-gray-500">EventHub For Experience</h3>
                <h1 className="text-4xl text-gray-800 font-extrabold mx-auto sm:text-6xl leading-10">
                Discover, Manage, and Attend Events <span className="lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 font-black"> Effortlessly 🚀</span>
                </h1>
                <p className="max-w-xl mx-auto">
                EventHub making it simple for you for Seamless Event Experiences
                </p>
                <div className="flex items-center justify-center gap-x-3 font-medium text-sm">
                    <NavLink
                        href="/events/view"
                        className="py-2.5 px-4 text-center rounded-3xl duration-150 text-white text-bold text-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-5 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:ring ring-transparent ring-offset-2 transition"
                        style={{borderRadius: "30px"}}
                    >
                        View Events
                    </NavLink>
                    <NavLink
                        href="/events/create"
                        className="py-2.5 px-4 text-center rounded-3xl duration-150 text-white text-bold text-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-5 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:ring ring-transparent ring-offset-2 transition"
                        scroll={false}
                        style={{borderRadius: "30px"}}
                    >
                        Organize Events
                    </NavLink>
                </div>
            </div>
        </div>
    </section>
)

export default Hero
