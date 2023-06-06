import { Box, Container } from '@mui/material'
import React from 'react'
import MapGL, { Layer, Map, Source} from 'react-map-gl'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYmVuamE5OCIsImEiOiJjbGlpYzZuOHUxdHV6M2dwN2M5bXNsZTFrIn0.9aQuvhbH6EifAfRcMX-dug';

const UberMap = () => {
  return (
    <Box mx={0} my={0} >
        <MapGL
            initialViewState={{
            latitude: 40.71,
            longitude: -74,
            zoom: 12,
            }}
            style={{width: "100vw", height: "100vh"}}

            mapStyle="mapbox://styles/mapbox/dark-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            {/* {data && (
            <Source type="geojson" data={data}>
                <Layer {...heatmapLayer} />
            </Source>
            )} */}
        </MapGL>
        

        
    </Box>
  )
}

export default UberMap