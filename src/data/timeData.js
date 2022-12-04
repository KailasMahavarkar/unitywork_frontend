
export const timeArray = [
    "12 hours",
	"1 day",
	"3 days",
    "5 days",
    "7 days",
    "10 days",
    "14 days",
    "21 days",
    "30 days",
    "45 days",
    "60 days",
    "90 days",
];

export const timeMap = {
	// minute
	"1 minute": 60 * 1000,
	"5 minutes": 60 * 5 * 1000,
	"15 minutes": 60 * 15 * 1000,
	"30 minutes": 60 * 30 * 1000,
	"45 minutes": 60 * 45 * 1000,

	// hour
	"1 hour": 60 * 60 * 1000,
	"2 hours": 60 * 60 * 2 * 1000,
	"4 hours": 60 * 60 * 4 * 1000,
	"8 hours": 60 * 60 * 8 * 1000,
	"12 hours": 60 * 60 * 12 * 1000,

	// days
	"1 day": 60 * 60 * 24 * 1000,
	"3 days": 60 * 60 * 24 * 3 * 1000,

	// weeks
	"1 week": 60 * 60 * 24 * 7 * 1000,
	"2 weeks": 60 * 60 * 24 * 14 * 1000,
	"3 weeks": 60 * 60 * 24 * 14 * 1000,

	// months
	"1 month": 60 * 60 * 24 * 30 * 1000,
	"3 months": 60 * 60 * 24 * 30 * 3 * 1000,
	"6 months": 60 * 60 * 24 * 30 * 6 * 1000,

	// years
	"1 year": 60 * 60 * 24 * 365 * 1000,
	"3 years": 60 * 60 * 24 * 365 * 3 * 1000,
	"5 years": 60 * 60 * 24 * 365 * 5 * 1000,
	"10 years": 60 * 60 * 24 * 365 * 10 * 1000,
};
export const timeAt = (timing) => {
	return timeMap[timing] + Date.now();
};
