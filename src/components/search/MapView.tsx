"use client";

// Why react-leaflet + CartoDB Dark Matter?
// - react-leaflet uses OpenStreetMap data with no API key or billing required.
// - CartoDB Dark Matter is a free tile layer (attribution-only, no token) that
//   renders a near-perfect dark map matching the site's bg-dark-bg (#121212) theme.
// - Leaflet is browser-only, so this component must be loaded via next/dynamic
//   with { ssr: false } from the parent page.

import "leaflet/dist/leaflet.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip, CircleMarker, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect } from "react";
import type { Restaurant } from "@/lib/constants";

// Sydney CBD fallback if geolocation is denied or unavailable
const SYDNEY_CBD: [number, number] = [-33.8688, 151.2093];

// Custom SVG pin icons — avoids having to copy Leaflet's default marker images
// into /public. Featured restaurants get the primary green (#11d483) pin.
function createPinIcon(color: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24C24 5.373 18.627 0 12 0z"
        fill="${color}" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>
      <circle cx="12" cy="12" r="5" fill="rgba(255,255,255,0.9)"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });
}

const goldPin = createPinIcon("#caa968");
const greenPin = createPinIcon("#11d483");

// Custom cluster icon — gold bubble matching the site's dark/gold theme
function createClusterIcon(cluster: L.MarkerCluster) {
  const count = cluster.getChildCount();
  const size = count < 10 ? 36 : count < 100 ? 42 : 48;
  return L.divIcon({
    html: `<div class="map-cluster-icon" style="width:${size}px;height:${size}px">${count}</div>`,
    className: "",
    iconSize: L.point(size, size),
  });
}

// Re-centres programmatically — only used when there is no location-based query
// (i.e. user searched "lebanese food" and we want to follow their live position)
function UserPositionCenterer({ userPosition }: { userPosition: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (userPosition) map.setView([userPosition.lat, userPosition.lng], 13);
  }, [map, userPosition]);
  return null;
}

type Props = {
  restaurants: Restaurant[];
  userPosition: { lat: number; lng: number } | null;
  searchQuery: string;
  onSelectRestaurant: (r: Restaurant) => void;
};

export default function MapView({ restaurants, userPosition, searchQuery, onSelectRestaurant }: Props) {
  const pinned = restaurants.filter(
    (r) => r.latitude !== null && r.longitude !== null,
  );

  // A "location search" is one where the query matches restaurants by their suburb/location field.
  // In that case we centre on the pin centroid (overrides live position) so "greenacre" → Greenacre.
  // A food-type search ("lebanese food") won't match location fields, so we follow the user instead.
  const q = searchQuery.toLowerCase().trim();
  const isLocationSearch =
    q.length > 0 &&
    pinned.some((r) => r.location?.toLowerCase().includes(q));

  const centroid: [number, number] | null =
    pinned.length > 0
      ? [
          pinned.reduce((s, r) => s + r.latitude!, 0) / pinned.length,
          pinned.reduce((s, r) => s + r.longitude!, 0) / pinned.length,
        ]
      : null;

  // Centre priority:
  //   location query  → centroid of matching pins (overrides live position)
  //   no location     → user's live position
  //   fallback        → Sydney CBD
  const centre: [number, number] = isLocationSearch && centroid
    ? centroid
    : userPosition
      ? [userPosition.lat, userPosition.lng]
      : centroid ?? SYDNEY_CBD;

  return (
    <MapContainer
      center={centre}
      zoom={13}
      className="w-full h-full rounded-xl"
      style={{ background: "#121212" }}
    >
      {/* CartoDB Dark Matter — free, no API token, attribution-only */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
      />

      {/* Only follow live position when the search is NOT location-based */}
      {!isLocationSearch && <UserPositionCenterer userPosition={userPosition} />}

      {userPosition && (
        <>
          {/* Accuracy halo */}
          <CircleMarker
            center={[userPosition.lat, userPosition.lng]}
            radius={18}
            pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.15, weight: 0 }}
          />
          {/* Blue dot */}
          <CircleMarker
            center={[userPosition.lat, userPosition.lng]}
            radius={8}
            pathOptions={{ color: "#fff", fillColor: "#3b82f6", fillOpacity: 1, weight: 2.5 }}
          />
        </>
      )}

      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={60}
        disableClusteringAtZoom={16}
        spiderfyOnMaxZoom={true}
        showCoverageOnHover={false}
        iconCreateFunction={createClusterIcon}
      >
        {pinned.map((r) => (
          <Marker
            key={r.id}
            position={[r.latitude!, r.longitude!]}
            icon={r.featured ? greenPin : goldPin}
            eventHandlers={{ click: () => onSelectRestaurant(r) }}
          >
            {/* Permanent label shown next to the pin, like Google Maps */}
            <Tooltip
              permanent
              direction="right"
              offset={[10, -18]}
              className="map-pin-label"
            >
              <span className="font-bold">{r.name}</span>
              {r.cuisine && (
                <span className="map-pin-cuisine"> · {r.cuisine}</span>
              )}
            </Tooltip>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
