import React from 'react'
import { Check } from 'lucide-react';

const Benefits = () => {
  const totalBenefit = [
    "Decentralized Event Management", "Smart Contract Integration", "Blockchain Technology", "Immutable Event History" ,"Access to resources", "Streamline event's", "Community Support", "Free Event Hub", "Networking Opportunities", "Knowledge and Skill Enhancement", "Brand Exposure and Visibility", "Open Source and Community-Driven Development"
  ]
    return (
    <div className="flex flex-col justify-center items-center mt-8">
        <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Get these DAPP features
        </h2>
        <p className="mt-3 text-gray-600">
          Listen to what the experts around the world are saying about our event applications.
        </p>

        <div className="flex max-w-full mt-7 md:max-w-[600px] flex-wrap">
  {
    totalBenefit.map((Items, _idx)=> (
      <div className="w-full md:w-1/2 flex items-center" key={_idx}>
        <svg style={{backgroundColor: "rgba(100, 0, 0, 0.3)", padding: "10px", borderRadius: "50%", width: "40px", margin: "10px"}} viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z" fill="currentColor"></path>
        </svg>
        <p style={{margin: "10px"}}>{Items}</p>
      </div>
    ))
  }
</div>
    </div>
  )
}

export default Benefits
