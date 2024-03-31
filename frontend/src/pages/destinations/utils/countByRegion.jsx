 const countByRegion = (destinations) => {
    return destinations.reduce((acc, destination) => {
      const region = destination.location.region;
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {});
  };
  
  export default countByRegion;