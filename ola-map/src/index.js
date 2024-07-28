
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { useState, useEffect } from "react";
import { Map as MapLibreMap, NavigationControl } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
/**
 * Central map component
 */
export const App: React.FC = () => {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapReady) return;

    const map = new MapLibreMap({
      container: "central-map",
      center: [0, 0],
      zoom: 0,
      style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      transformRequest: (url, resourceType) => {
        if(!url.includes('?'))
          url = url + '?api_key=YOUR_API_KEY';
        else{
          url = url+ '&api_key=YOUR_API_KEY';
        }
        //url = url + "?api_key={your_api_key}";
        return { url, resourceType };
      },
    });

    const nav = new NavigationControl({
      visualizePitch: true,
    });
    map.addControl(nav, "top-left");
  }, [mapReady]);

      return (
        <div
          style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
          ref={() => setMapReady(true)}
          id="central-map"
        />
      );
    };

    const rootElement = document.getElementById("root");
    const root = createRoot(rootElement);

    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
