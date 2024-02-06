import Image from 'next/image'
import ethereum from '../../../public/icons/ethereum.webp'
import polygon from '../../../public/icons/polygon.webp'
import techcrunch from '../../../public/icons/techcrunch.webp'
import techinasia from '../../../public/icons/techinasia.webp'
import alchemy from '../../../public/icons/alchemy.webp'
import metaschool from '../../../public/logos/metaschool.png'

const logos = [
    {
        src: ethereum,
        alt: "ethereum"
    },
    {
        src: polygon,
        alt: "polygon"
    },
    {
        src: techcrunch,
        alt: "techcrunch"
    },
    {
        src: techinasia,
        alt: "techinasia"
    },
    {
        src: alchemy,
        alt: "alchemy"
    },
]


const LogoGrid = () => (
    <div className='mb-10'>
        <div className="custom-screen mb-3">
            <h2 className="font-semibold text-sm text-gray-600 text-center">
                TRUSTED BY TEAMS FROM AROUND THE WORLD
            </h2>
            <div className="mt-6">
                <ul className="flex gap-x-10 gap-y-6 flex-wrap items-center justify-center md:gap-x-16">
                    <li>
                        <Image src={metaschool} alt="Metaschool Logo" />
                    </li>
                </ul>
            </div>
        </div>
        <div className="custom-screen mt-10" >
            <h2 className="font-semibold text-sm text-gray-600 text-center">
                MENTIONED WITH ❤️
            </h2>
            <div className="mt-6">
                <ul className="flex gap-x-10 gap-y-6 flex-wrap items-center justify-center md:gap-x-16">
                    {
                        logos.map((item, idx) => (
                            <li key={idx}>
                                <Image className='h-[auto] w-[150px]' src={item.src} alt={item.alt} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>
)

export default LogoGrid