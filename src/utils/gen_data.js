// import { randomPoint } from '@turf/random';

// // Function to generate a GeoJSON feature collection with random points
// function generateGeoJSON(name, itemCount, propertiesGenerator) {
//   const bangkokBounds = [100.30, 13.60, 100.95, 13.95]; // Rough bounding box of Bangkok
//   const points = randomPoint(itemCount, { bbox: bangkokBounds });

//   return {
//     type: 'FeatureCollection',
//     name: name,
//     features: points.features.map((point, index) => {
//       point.properties = propertiesGenerator(index + 1); // Customize properties for each point
//       return point;
//     }),
//   };
// }

// // Generate properties for different POI types
// const generateLandValueProperties = (index) => ({
//   name: `Plot ${index}`,
//   value_per_sqm: Math.floor(Math.random() * 50000) + 30000,
// });

// const generateShoppingMallProperties = (index) => ({
//   name: `Mall ${index}`,
//   shops: Math.floor(Math.random() * 100) + 100,
// });

// const generateHospitalProperties = (index) => ({
//   name: `Hospital ${index}`,
//   beds: Math.floor(Math.random() * 200) + 300,
// });

// const generateParkProperties = (index) => ({
//   name: `Park ${index}`,
//   area_sqm: Math.floor(Math.random() * 5000) + 5000,
// });

// const generateSchoolProperties = (index) => ({
//   name: `School ${index}`,
//   students: Math.floor(Math.random() * 400) + 400,
// });

// const generateHotelProperties = (index) => ({
//   name: `Hotel ${index}`,
//   rooms: Math.floor(Math.random() * 200) + 200,
// });

// const generateRestaurantProperties = (index) => ({
//   name: `Restaurant ${index}`,
//   cuisine: ['Thai', 'Japanese', 'Chinese', 'Western'][Math.floor(Math.random() * 4)],
// });

// // Generate all the layers
// const landValueLayer = generateGeoJSON('LandValue', 12, generateLandValueProperties);
// const shoppingMallLayer = generateGeoJSON('ShoppingMall', 12, generateShoppingMallProperties);
// const hospitalLayer = generateGeoJSON('Hospital', 12, generateHospitalProperties);
// const parkLayer = generateGeoJSON('Park', 12, generateParkProperties);
// const schoolLayer = generateGeoJSON('School', 12, generateSchoolProperties);
// const hotelLayer = generateGeoJSON('Hotel', 12, generateHotelProperties);
// const restaurantLayer = generateGeoJSON('Restaurant', 12, generateRestaurantProperties);

// // Print the generated GeoJSON data (you can also save to a file)
// console.log(JSON.stringify(landValueLayer, null, 2));
// console.log(JSON.stringify(shoppingMallLayer, null, 2));
// console.log(JSON.stringify(hospitalLayer, null, 2));
// console.log(JSON.stringify(parkLayer, null, 2));
// console.log(JSON.stringify(schoolLayer, null, 2));
// console.log(JSON.stringify(hotelLayer, null, 2));
// console.log(JSON.stringify(restaurantLayer, null, 2));


import { randomPoint } from '@turf/random';
import fs from 'fs';

// Function to generate a GeoJSON feature collection with random points
function generateGeoJSON(name, itemCount, propertiesGenerator) {
  const bangkokBounds = [100.30, 13.60, 100.95, 13.95]; // Rough bounding box of Bangkok
  const points = randomPoint(itemCount, { bbox: bangkokBounds });

  return {
    type: 'FeatureCollection',
    name: name,
    features: points.features.map((point, index) => {
      point.properties = propertiesGenerator(index + 1); // Customize properties for each point
      return point;
    }),
  };
}

// Generate properties for different POI types
const generateLandValueProperties = (index) => ({
  name: `Plot ${index}`,
  value_per_sqm: Math.floor(Math.random() * 50000) + 30000,
});

const generateShoppingMallProperties = (index) => ({
  name: `Mall ${index}`,
  shops: Math.floor(Math.random() * 100) + 100,
});

const generateHospitalProperties = (index) => ({
  name: `Hospital ${index}`,
  beds: Math.floor(Math.random() * 200) + 300,
});

const generateParkProperties = (index) => ({
  name: `Park ${index}`,
  area_sqm: Math.floor(Math.random() * 5000) + 5000,
});

const generateSchoolProperties = (index) => ({
  name: `School ${index}`,
  students: Math.floor(Math.random() * 400) + 400,
});

const generateHotelProperties = (index) => ({
  name: `Hotel ${index}`,
  rooms: Math.floor(Math.random() * 200) + 200,
});

const generateRestaurantProperties = (index) => ({
  name: `Restaurant ${index}`,
  cuisine: ['Thai', 'Japanese', 'Chinese', 'Western'][Math.floor(Math.random() * 4)],
});

// Generate all the layers
const layers = {
  landValueLayer: generateGeoJSON('LandValue', 12, generateLandValueProperties),
  shoppingMallLayer: generateGeoJSON('ShoppingMall', 12, generateShoppingMallProperties),
  hospitalLayer: generateGeoJSON('Hospital', 12, generateHospitalProperties),
  parkLayer: generateGeoJSON('Park', 12, generateParkProperties),
  schoolLayer: generateGeoJSON('School', 12, generateSchoolProperties),
  hotelLayer: generateGeoJSON('Hotel', 12, generateHotelProperties),
  restaurantLayer: generateGeoJSON('Restaurant', 12, generateRestaurantProperties),
};

// Write each layer to a separate JSON file
for (const [layerName, layerData] of Object.entries(layers)) {
  const fileName = `${layerName}.json`;
  fs.writeFileSync('src/data/' + fileName, JSON.stringify(layerData, null, 2));
  console.log(`${fileName} has been generated.`);
}
