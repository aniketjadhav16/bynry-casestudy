import React, { useEffect, useRef } from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapComponent = ({ latitude, longitude, markerLabel }) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: 'https://demotiles.maplibre.org/style.json',
            center: [longitude, latitude],
            zoom: 13
        });

        const marker = new maplibregl.Marker({ color: '#3498db' })
            .setLngLat([longitude, latitude])
            .setPopup(new maplibregl.Popup().setHTML(`<h4>${markerLabel}</h4>`))
            .addTo(map);

        map.on('load', () => {
            map.resize();
        });

        return () => map.remove();
    }, [latitude, longitude, markerLabel]);

    return <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />;
};

export default MapComponent;

