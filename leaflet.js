let map = L.map("map").setView([35.227085, -80.843124], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibXNlbGxlcnM4NDcyIiwiYSI6ImNsMG1pb2Q3djBsMzkzanRrd3Y1dGk0NGoifQ.2q2IO3Y6_Ykxmt3NJ10YnA'
}).addTo(map);
//L.tileLayer("http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", {
//    maxZoom: 18,
//    attribution:
//        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//}).addTo(map);


d3.json("NCCharlotte1935.geojson").then(function(dataset){
    console.log(dataset);
    L.geoJson(dataset,{style:styleRedlineFunction}).addTo(map);
})

d3.json("nc_charlotte_north_carolina_zip_codes_geo.min.geojson").then(function(dataset){
    console.log(dataset);
    L.geoJson(dataset,{
        style:styleZipFunction}).addTo(map);
})

function styleRedlineFunction(feature){
    // console.log(feature.hasOwnProperty('holc_grade'));
    let color = getColor(feature.properties.holc_grade);

    if (feature.properties.holc_grade == "A") {
        color = "Green";
    } else if (feature.properties.holc_grade == "B") {
        color = "Blue";
    } else if (feature.properties.holc_grade == "C") {
        color = "Yellow";
    } else if (feature.properties.holc_grade == "D") {
        color = "Red"
    } else if (feature.properties.holc_grade == undefined) {
        color = null;
    }
    console.log(color)

    console.log("To the return!");
    return{
        weight: 0.5,
        outlineColor: "black",
        fillColor: color,
        fillOpacity: 0.4
    }
}

function styleZipFunction(feature){
    // console.log(feature.hasOwnProperty('holc_grade'));
    let zipOpacity = 0;

    if (feature.properties.ZCTA5CE10 == "28202") {
        zipOpacity = 0.8;
    } else if (feature.properties.ZCTA5CE10 == "28203") {
        zipOpacity = 0.4;
    } else if (feature.properties.ZCTA5CE10 == "28204") {
        zipOpacity = 0.60;
    } else if (feature.properties.ZCTA5CE10 == "28205") {
        zipOpacity = 0.2;
    } else if (feature.properties.ZCTA5CE10 == "28206") {
        zipOpacity = 0.60;
    } else if (feature.properties.ZCTA5CE10 == "28207") {
        zipOpacity = 0.05;
    } else if (feature.properties.ZCTA5CE10 == "28208") {
        zipOpacity = 0.4;
    } else if (feature.properties.ZCTA5CE10 == "28209") {
        zipOpacity = 0.2;
    } else if (feature.properties.ZCTA5CE10 == "28216") {
        zipOpacity = 0.4;
    }
    console.log(zipOpacity);

    return{
        weight: 0.5,
        outlineColor: "black",
        fillColor: "orange",
        fillOpacity: zipOpacity
    }
}
function onEachFeatureRedline(feature, layer) {
    if (feature.properties && feature.properties.area_description_data) {
        layer.bindPopup(feature.properties.area_description_data)
    }
}





function getColor(d) {
    // var colors = ['#f2f0f7','#dadaeb','#bcbddc','#9e9ac8','#807dba','#6a51a3','#4a1486'];
    // colors = colors.reverse();
    // var colors = ['#f6eff7','#d0d1e6','#a6bddb','#67a9cf','#3690c0','#02818a','#016450'];
    var colors = [
        "#ffffb2",
        "#fed976",
        "#feb24c",
        "#fd8d3c",
        "#fc4e2a",
        "#e31a1c",
        "#b10026",
    ];
    // colors = colors.reverse();
    return d < 20
        ? colors[0]
        : d < 23
            ? colors[1]
            : d < 26
                ? colors[2]
                : d < 29
                    ? colors[3]
                    : d < 32
                        ? colors[4]
                        : d < 36
                            ? colors[5]
                            : colors[6];
}


