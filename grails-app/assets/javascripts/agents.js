/**
 * Created by Ben Rhine on 12/21/16.
 */

// This console.log is to ensure that grails variable has been set to javascript variable.
// console.log(dataTest);
L.MakiMarkers.accessToken = 'pk.eyJ1IjoieHRoZXNoYWRvd2dvZCIsImEiOiJjaXd6OWFxNHcwMTgxMnRscWQ1eW1wbWt2In0.O51NMWQGq2MKb2Jgfp0oZw';
var x = -1;
var previouslyActive = 'show-all';
var maleMarkers   = new L.FeatureGroup();
var femaleMarkers = new L.FeatureGroup();
var ageMarkers    = new L.FeatureGroup();
var male   = [];
var female = [];
var age    = [];
var rocketIcon = L.MakiMarkers.icon({
    icon: "rocket",
    color: "#b0b",
    size: "m"
});
var cupIcon = L.MakiMarkers.icon({
    icon: "beer",
    color: "#12a",
    size: "m"
});
var warehouseIcon = L.MakiMarkers.icon({
    icon: "warehouse",
    color: "#0a0",
    size: "m"
});
var maxBounds = L.latLngBounds(
    L.latLng(0.0, -150.0), //Southwest
    L.latLng(65.0, -35.0)  //Northeast
);

var agentsMap = L.map('agentsMap', {
    'center': [0, 0],
    'zoom': 0,
    'layers': [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            'attribution': 'Map data &copy; OpenStreetMap contributors'
        })
    ],
    'maxBounds': maxBounds
}).fitBounds(maxBounds);

function addMaleAgents() {
    setActiveButton('add-male');
    agentsMap.addLayer(maleMarkers);
}

function removeMaleAgents() {
    setActiveButton('remove-male');
    agentsMap.removeLayer(maleMarkers);
}

function addFemaleAgents() {
    setActiveButton('add-female');
    agentsMap.addLayer(femaleMarkers);
}

function removeFemaleAgents() {
    setActiveButton('remove-female');
    agentsMap.removeLayer(femaleMarkers);
}

function setActiveButton(id) {
    document.getElementById(previouslyActive).className = '';
    document.getElementById(id).className = 'active';
    previouslyActive = id;
}

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
};

function showAll() {
    //setActiveButton('show-all');
    agentsMap.addLayer(maleMarkers);
    agentsMap.addLayer(femaleMarkers);
};

function removeAll() {
    setActiveButton('clear-all');
    agentsMap.removeLayer(maleMarkers);
    agentsMap.removeLayer(femaleMarkers);
    agentsMap.removeLayer(ageMarkers);
};

function showByAge() {
    agentsMap.removeLayer(maleMarkers);
    agentsMap.removeLayer(femaleMarkers);
    agentsMap.addLayer(ageMarkers);
};

function removeByAge() {
    agentsMap.removeLayer(ageMarkers);
}

function femaleAgents() {
    $.each(female, function( index, value) {
        femaleMarkers.addLayer(female[index]);
    });
};

function maleAgents() {
    $.each(male, function( index, value) {
        maleMarkers.addLayer(male[index]);
    });
};

function ageOfAgents() {
    $.each(age, function( index, value) {
        ageMarkers.addLayer(age[index]);
    });
    showByAge();
};

// var input = document.getElementById("agentAge");
// console.log(this.value === NaN || this.value === '');
// input.oninput = function() {
//     if(this.value === undefined || this.value === NaN) {
//
//     } else if (this.value === '') {
//         removeByAge();
//     } else {
//         x = this.value;
//
//         $.each(dataTest, function( index, value ) {
//             var jsonData = {};
//             jsonData["type"] = "Feature"
//             jsonData["properties"] = {
//                 "name": value.name,
//                 "sex": value.gender,
//                 "age": value.age,
//                 "amenity": "test",
//                 "popupContent": '<p>Name: ' + value.name + '<br>Age: ' + value.age + '<br>Gender: ' + value.gender + '</p>'}
//             jsonData["geometry"] = {"type": "Point", "coordinates": [value.latitude, value.longitude]}
//
//             age.push(L.geoJson(jsonData, {
//                 onEachFeature: onEachFeature,
//                 filter: function(feature) {
//                     //console.log(feature.properties.age + 'is less than ' + parseInt(x));
//                     //console.log(feature.properties.age < parseInt(x));
//                     return feature.properties.age < parseInt(x);
//                 },
//                 pointToLayer: function(feature) {
//                     switch (feature.properties.sex) {
//                         case 'Male': return L.marker(jsonData.geometry.coordinates, {icon: rocketIcon});
//                         case 'Female': return L.marker(jsonData.geometry.coordinates, {icon: cupIcon});
//                     }
//                 }
//             }));
//         });
//         ageOfAgents();
//     }
// };

$.each(dataTest, function( index, value ) {
    var jsonData = {};
    jsonData["type"] = "Feature"
    jsonData["properties"] = {
        "name": value.name,
        "sex": value.gender,
        "amenity": "test",
        "popupContent": '<p>Name: ' + value.name + '<br>Age: ' + value.age + '<br>Gender: ' + value.gender + '</p>'}
    jsonData["geometry"] = {"type": "Point", "coordinates": [value.latitude, value.longitude]}

    female.push(L.geoJson(jsonData, {
        onEachFeature: onEachFeature,
        filter: function(feature) {
            return feature.properties.sex === "Female";
        },
        pointToLayer: function(feature) {
            return L.marker(jsonData.geometry.coordinates, {icon: cupIcon});
        }
    }));

    male.push(L.geoJson(jsonData, {
        onEachFeature: onEachFeature,
        filter: function(feature) {
            return feature.properties.sex === "Male";
        },
        pointToLayer: function(feature) {
            return L.marker(jsonData.geometry.coordinates, {icon: rocketIcon});
        }
    }));
});
femaleAgents();
maleAgents();

showAll();
