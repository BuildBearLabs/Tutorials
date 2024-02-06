import SectionWrapper from "../../SectionWrapper"
import Image from "next/image"
import wordpress from "../../../public/icons/wordpress.svg"
import nextjs from "../../../public/icons/nextjs.svg"
import tailwind from "../../../public/icons/tailwind.svg"
import nodejs from "../../../public/icons/nodejs.svg"
import vercel from "../../../public/icons/vercel.svg"
import etherium from "../../../public/icons/ethereum.svg"
import materialUi from "../../../public/icons/material_ui.svg"

const ToolKit = () => {

    const features = [
        {
            icon: etherium,
            title: "Ethereum",
            desc: "Ethereum is a popular blockchain platform that supports smart contracts."
        },
        {
            icon: nextjs,
            title: "Next.js",
            desc: "Next.js is a React framework that gives you building blocks to create web apps."
        },
        {
            icon: tailwind,
            title: "Tailwind CSS",
            desc: "Tailwind CSS is basically a utility-first CSS framework for rapidly building UIs."
        },
        {
            icon: nodejs,
            title: "Node, Express and MongoDB",
            desc: "Node.js: Backend runtime. Express: Framework for RESTful APIs. MongoDB: Database for storing data."
        },
        {
            icon: vercel,
            title: "Decentralized File Storage",
            desc: "A Distributed Protocol for Secure and Decentralized File Storage."
        },
        {
            icon: materialUi,
            title: "Material ui and Shadcn",
            desc: "Provide interactive component to interact with."
        },
    ]

    return (
        <SectionWrapper>
            <div id="toolkit" className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-2xl mx-auto space-y-3 sm:text-center">
                    <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                    Decentralized Event Web App Toolkit
                    </h2>
                    <p>
                    Discover Tools for Secure and Efficient Development.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="flex gap-x-4">
                                    <div className="flex-none w-12 h-12 gradient-border rounded-full flex items-center justify-center">
                                        <Image src={item.icon} alt={item.title} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg text-gray-800 font-semibold">
                                            {item.title}
                                        </h4>
                                        <p className="mt-3">
                                            {item.desc}
                                        </p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default ToolKit