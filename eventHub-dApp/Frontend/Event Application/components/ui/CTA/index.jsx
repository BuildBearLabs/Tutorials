import SectionWrapper from "../../SectionWrapper"
import NavLink from "../NavLink"
import ctaImage from "../../../public/cta-image.jpg"
import Image from "next/image"

const CTA = () => {
    return (
        <SectionWrapper id="cta" className="pb-0">
            <div className="custom-screen">
                <div className="items-center gap-x-12 lg:flex">
                    <div className="flex-1 sm:hidden lg:block">
                        <Image src={ctaImage} className="rounded-lg md:max-w-lg" alt="Create Successful Business Models with Our IT Solutions" />
                    </div>
                    <div className="max-w-xl mt-6 md:mt-0 lg:max-w-2xl">
                        <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Unlocking Opportunities: Experience Limitless Knowledge at Our Free Event Hub
                        </h2>
                        <p className="mt-3 text-gray-600">
                        Unleash the Power of Events with Our Interactive Platform! Join us as we revolutionize event creation and organization, empowering you to shape unforgettable experiences. Together, let's bring your vision to life and engage your audience like never before
                        </p>
                        <NavLink
                            href="/events/view"
                            className="inline-block mt-4 font-medium text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-5 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:ring ring-transparent ring-offset-2 transition rounded-3xl text-bold text-base"
                            style={{borderRadius: "30px"}}
                        >
                            Attend Ongoing Events
                        </NavLink>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default CTA