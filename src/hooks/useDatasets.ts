import { useEffect, useState } from "react";
import { CustomFeatureCollection, GeojsonFiles } from "../utils/type";

// type Props = {}
const jsonFiles = import.meta.glob('../data/*.json', { eager: true });

const useDatasets = () => {
  const [datasets, setDatasets] = useState<GeojsonFiles>([]);

  useEffect(() => {
    // Process the imported JSON files
    const loadJsonFiles = () => {
      const loadedData = Object.keys(jsonFiles).map((filePath) => {
        const fileName = filePath.split('/').pop(); // Extract the file name
        return { fileName, geojson: jsonFiles[filePath] as CustomFeatureCollection }; // Add content to the list
      });
      setDatasets(loadedData);
    };

    loadJsonFiles();
  }, [])

  return {
    datasets
  }
}

export { useDatasets };

