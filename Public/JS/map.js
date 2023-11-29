const platform = new H.service.Platform({
    'apikey': apikey,
});

const defaultLayers = platform.createDefaultLayers();

const map = new H.Map(
    document.getElementById("map"),
    defaultLayers.vector.normal.map, {
        zoom: 16,
        center: {
            lat: coordinates[0],
            lng: coordinates[1]
        }
    });


window.addEventListener('resize', () => map.getViewPort().resize());

// Create the default UI:

const ui = H.ui.UI.createDefault(map, defaultLayers,`en-US` );
const control = ui.getControl('controlName');
const mapSettingsControl = ui.getControl('mapsettings');
mapSettingsControl.setAlignment('top-left');

var icon = new H.map.Icon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="IconChangeColor" height="300" width="290"><path d="M18,4.48a8.45,8.45,0,0,0-12,12l5.27,5.28a1,1,0,0,0,1.42,0L18,16.43A8.45,8.45,0,0,0,18,4.48ZM16.57,15,12,19.59,7.43,15a6.46,6.46,0,1,1,9.14,0ZM9,7.41a4.32,4.32,0,0,0,0,6.1,4.31,4.31,0,0,0,7.36-3,4.24,4.24,0,0,0-1.26-3.05A4.3,4.3,0,0,0,9,7.41Zm4.69,4.68a2.33,2.33,0,1,1,.67-1.63A2.33,2.33,0,0,1,13.64,12.09Z" id="mainIconPathAttribute" fill="#ff006a" filter="url(#shadow)" stroke-width="0" stroke="#000000"></path><filter id="shadow"><feDropShadow id="shadowValue" stdDeviation="0.3" dx="1.5" dy="1.5" flood-color="black"></feDropShadow></filter><filter id="shadow"><feDropShadow id="shadowValue" stdDeviation=".5" dx="0" dy="0" flood-color="black"></feDropShadow></filter><filter id="shadow"><feDropShadow id="shadowValue" stdDeviation=".5" dx="0" dy="0" flood-color="black"></feDropShadow></filter></svg>', { size: { w: 32, h: 40 } });

var marker = new H.map.Marker({lat: coordinates[0], lng:coordinates[1] }, { icon: icon }); // Same coordinates as the map center

var bubble = new H.ui.InfoBubble({ lat:coordinates[0], lng:coordinates[1] }, {
         content: 'You will be here!'
});
    
// Add the marker to the map
map.addObject(marker);

    
// Add the popup to the marker
map.addObject(bubble);
    
