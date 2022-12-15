
const constants = ():Record<string, any> => {
	// for bcrypting the plain text passwords
	const saltRounds = 10;

	const ports = {
		cartManager : 770,
		customerDisplay : 771,
		deviceManager : 772,
		posLayer : 773,
		monitor : 774,
		gateService : 775,
		dataCollector : 777,
		edge : 778,
		media : 779,
		dataCenterUI : 780,
		dataCenterAPI : 781,
		calculationWeights : 782,
	};

	return {
		saltRounds,
		ports,
	};
};


export default constants();