import { Component, OnInit } from '@angular/core';
import GPX from 'gpx-for-runners';
import { timer } from 'rxjs';
import {} from 'googlemaps';
import { AgmCoreModule, MapsAPILoader } from "@agm/core";


//import * as fs from "tns-core-modules/file-system";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  gpsContent: string;
  location = {};
  timer;
  lat: number;
  lng: number;
  lat1: number;
  lng1: number;
  public origin: any;
public destination: any;

  //file = fs.File.fromPath("C:\\Users\\hmoslah\\Desktop\\HamzaMoslah\\mapstogpx20190204_095926.gpx");
//   gpxContent: string;
  

// gpx = new GPX( `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
// <gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" creator="mapstogpx.com" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">
//   <metadata>
//     <link href="http://www.mapstogpx.com">
//       <text>Sverrir Sigmundarson</text>
//     </link>
//     <!--desc>Map data ©2019 Google</desc-->
//     <!--copyright author="Google Inc">
//     	<year>2019</year>
//     	<license>https://developers.google.com/maps/terms</license>
//     </copyright-->
//     <!--url>https://www.google.co.uk/maps/dir/Arboretum de l'INAT/36.8352289,10.2089276/@36.8429228,10.1961829,15z/data=!4m8!4m7!1m5!1m1!1s0x12fd34c782b59419:0xb31db8f7edd8de39!2m2!1d10.1934394!2d36.8460893!1m0?hl=en</url-->
//     <time>2019-02-04T10:59:26Z</time>
//   </metadata>
//   <wpt lat="36.8460893" lon="10.1934394">
//     <name>Arboretum de l'INAT</name>
//     <desc>Arboretum de l'INAT, Avenue Hedi Karray, Tunis, Tunisia</desc>
//   </wpt>
//   <wpt lat="36.8352289" lon="10.2089276">
//     <name>Tunis</name>
//     <desc>72 Rue 8603, Tunis, Tunisia</desc>
//   </wpt>
// <trk>
//   <name>Arboretum de l'INAT to Tunis</name>
//   <number>1</number>
//   <trkseg>
//   <trkpt lat="36.8470454" lon="10.192795">
//     <name>TP001</name>
//   </trkpt>
//   <trkpt lat="36.84705" lon="10.19281">
//     <name>TP002</name>
//   </trkpt>
//   <trkpt lat="36.8349713" lon="10.2088002">
//     <name>TP247</name>
//   </trkpt>
//   </trkseg>
// </trk>
// </gpx>` );

// distance = this.gpx.distance();

  constructor() { }

  ngOnInit() {
    this.gpxRead(``);
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        console.log(position.coords); 
      });
   }
   this.getDirection();
  }

  calculateDistance() {
    const pt1 = new google.maps.LatLng(this.lat, this.lng);
    const pt2 = new google.maps.LatLng(this.lat1, this.lng1);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(pt1, pt2);
    console.log("distance using geometry API: "+distance);
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [pt1],
        destinations: [pt2],
        travelMode: google.maps.TravelMode.BICYCLING,
        avoidHighways: false,
        avoidTolls: false,
      }, callback);

    function callback(response, status) {
      // See Parsing the Results for
      // the basics of a callback function.
      console.log(response, status);
    }
  }

  getDirection() {
    this.origin = { lat: this.lat, lng: this.lng };
    this.destination = { lat: this.lat1, lng: this.lng1 };
    this.calculateDistance();
  }

  gpxRead(content: string): void {
    //const gpx1 = new gpx(content);
    this.gpsContent = `<?xml version="1.0" encoding="UTF-8"?>
    <gpx version="1.1" creator="Garmin Connect"
      xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd"
      xmlns="http://www.topografix.com/GPX/1/1"
      xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"
      xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <metadata>
        <link href="connect.garmin.com">
          <text>Garmin Connect</text>
        </link>
        <time>2019-02-04T10:59:26Z</time>
      </metadata>
      <trk>
        <name>Arboretum de l'INAT to Tunis</name>
        <trkseg>
          <trkpt lon="10.192795" lat="36.8470454">
            <ele>73.0</ele>
            <time>2019-02-04T10:59:54.000Z</time>
          </trkpt>
          <trkpt lon="10.1676506" lat="36.8283339">
            <ele>73.0</ele>
            <time>2019-02-06T11:07:55.000Z</time>
          </trkpt>
        </trkseg>
      </trk>
    </gpx>`;
    let gpx = new GPX(this.gpsContent);
    console.log('distance '+ gpx.distance());
    this.lat = gpx.trackpoints[0].lat;
    this.lng = gpx.trackpoints[0].lon;
    console.log("latitude "+this.lat);
    console.log("longitude "+this.lng);
    this.lat1 = gpx.trackpoints[1].lat;
    this.lng1 = gpx.trackpoints[1].lon;
    console.log("latitude 1 "+this.lat1);
    console.log("longitude 1 "+this.lng1);
    console.log('duration '+ gpx.duration().total);
    console.log('pace '+ gpx.pace().minutes+":"+gpx.pace().seconds);
    // this.getDistances();
  }
}
