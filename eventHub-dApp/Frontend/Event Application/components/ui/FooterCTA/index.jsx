import SectionWrapper from "../../SectionWrapper"
import NavLink from "../NavLink"

const FooterCTA = () => (
    <SectionWrapper>
        <div className="custom-screen">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                    Get started with EventHub today
                </h2>
                <p className="mt-3 text-gray-600">
                    Create, Browser and attend Events. Learn and grow and give shoutout to EventHub.😂
                </p>
                <NavLink
                    href="/events/view"
                    className="inline-block mt-4 font-medium text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-5 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:ring ring-transparent ring-offset-2 transition rounded-3xl text-bold text-base"
                    style={{borderRadius: "30px"}}
                >
                    Browse Events
                </NavLink>
            </div>
        </div>
    </SectionWrapper>
)

export default FooterCTA