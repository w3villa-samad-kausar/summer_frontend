import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const width = Dimensions.get('screen').width;

const MapView = ({ latitude, longitude }) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Leaflet Map</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
      <style>
        #map { 
          height: 100vh; 
          width: 100vw; 
          border-radius: 20px; 
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
          overflow: hidden;
        }
        body {
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
          font-family: Arial, sans-serif;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
      <script>
        var map = L.map('map').setView([${latitude}, ${longitude}], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);
      </script>
    </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html }}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 30, 
    height: 400,
    margin: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default MapView;
