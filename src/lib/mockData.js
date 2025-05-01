
export const mockBins = [
  {
    id: "001",
    fillLevel: 95,
    battery: 62,
    lastEmptied: "2 days ago",
    location: {
      x: 25,
      y: 35,
      address: "Main St & 5th Ave"
    },
    hasAlert: true,
    alertMessage: "Needs immediate collection"
  },
  {
    id: "002",
    fillLevel: 82,
    battery: 45,
    lastEmptied: "3 days ago",
    location: {
      x: 65,
      y: 25,
      address: "Lincoln Rd & Washington Blvd"
    },
    hasAlert: false
  },
  {
    id: "003",
    fillLevel: 75,
    battery: 80,
    lastEmptied: "2 days ago",
    location: {
      x: 75,
      y: 75,
      address: "Park Ave & 12th St"
    },
    hasAlert: false
  },
  {
    id: "004",
    fillLevel: 25,
    battery: 90,
    lastEmptied: "1 day ago",
    location: {
      x: 40,
      y: 60,
      address: "Maple St & Oak Rd"
    },
    hasAlert: false
  },
  {
    id: "005",
    fillLevel: 15,
    battery: 75,
    lastEmptied: "Today",
    location: {
      x: 85,
      y: 45,
      address: "Cedar Ln & Pine Ave"
    },
    hasAlert: false
  },
  {
    id: "006",
    fillLevel: 50,
    battery: 60,
    lastEmptied: "1 day ago",
    location: {
      x: 15,
      y: 80,
      address: "Elm St & Willow Dr"
    },
    hasAlert: false
  },
  {
    id: "007",
    fillLevel: 88,
    battery: 15,
    lastEmptied: "4 days ago",
    location: {
      x: 55,
      y: 15,
      address: "Ocean Blvd & Bay St"
    },
    hasAlert: true,
    alertMessage: "Battery low"
  },
  {
    id: "008",
    fillLevel: 35,
    battery: 85,
    lastEmptied: "1 day ago",
    location: {
      x: 30,
      y: 50,
      address: "Mountain View & Valley Rd"
    },
    hasAlert: false
  }
];

export const getOverallStats = () => {
  const total = mockBins.length;
  const needCollection = mockBins.filter(bin => bin.fillLevel >= 80).length;
  const criticalBins = mockBins.filter(bin => bin.fillLevel >= 90 || bin.hasAlert).length;
  const averageFillLevel = Math.round(
    mockBins.reduce((total, bin) => total + bin.fillLevel, 0) / mockBins.length
  );
  
  return {
    total,
    needCollection,
    criticalBins,
    averageFillLevel
  };
};
