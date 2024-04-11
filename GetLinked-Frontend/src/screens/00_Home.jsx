import React, { useEffect } from "react";
import {
	Header,
	HeroContent,
	IntroContent,
	RuleContent,
	AttributeContent,
	FAQsContent,
	TimelineContent,
	PrizeContent,
	SponsorsContent,
	PolicyContent,
	Footer,
} from "../components";
import { useWindowSize } from "react-hooks-window-size";

function Home() {
	const size = useWindowSize();
	const desktop = size.width > 968;

	useEffect(() => {
		document.title = "GetLinked - Welcome 🎉";
	});

	return (
		<>
			{desktop ? (
				<div className="app">
					<Header />
					<HeroContent />
					<IntroContent />
					<RuleContent />
					<AttributeContent />
					<FAQsContent />
					<TimelineContent />
					<PrizeContent />
					<SponsorsContent />
					<PolicyContent />
					<Footer />
				</div>
			) : (
				<div className="app">
					<Header />
					<HeroContent />
					<IntroContent />
					<RuleContent />
					<AttributeContent />
					<FAQsContent />
				</div>
			)}
		</>
	);
}

export default Home;
