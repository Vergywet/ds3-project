import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

// Remove: declare var tf: any; (not used directly)
declare var cocoSsd: any;
declare var google: any;

@Component({
  selector: 'app-drone-detection-page',
  templateUrl: './drone-detection.page.html',
  styleUrls: ['./drone-detection.page.scss'],
  standalone: false,
})
export class DroneDetectionPage implements OnInit {
  @ViewChild('webcam', { static: false }) webcam!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;

  model: any;
  ctx!: CanvasRenderingContext2D;
  detectInterval: any;
  isCameraOn = false;
  detectedObjects: { class: string, score: number }[] = [];
  coordinates = '';
  address = '';
  map: any;
  marker: any;
  lastGeocodeTime = 0;

  constructor(private zone: NgZone) {}

  ngOnInit() {}

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoEl = this.webcam.nativeElement;
      videoEl.srcObject = stream;
      videoEl.onloadedmetadata = () => {
        videoEl.play();
        this.isCameraOn = true;

        const canvasEl = this.canvas.nativeElement;
        canvasEl.width = videoEl.videoWidth;
        canvasEl.height = videoEl.videoHeight;
        this.ctx = canvasEl.getContext('2d')!;
        this.loadModelAndStartDetection();
      };
    } catch (err) {
      alert('Camera access denied or not available.');
    }
  }

  stopCamera() {
    const videoEl = this.webcam.nativeElement;
    if (videoEl.srcObject) {
      (videoEl.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      videoEl.srcObject = null;
    }
    clearInterval(this.detectInterval);
    this.isCameraOn = false;
    this.detectedObjects = [];
    this.coordinates = '';
    this.address = '';
  }

  async loadModelAndStartDetection() {
    this.model = this.model || await cocoSsd.load();
    this.startDetectionLoop();
  }

  startDetectionLoop() {
    this.detectInterval = setInterval(async () => {
      const canvasEl = this.canvas.nativeElement;
      this.ctx.drawImage(this.webcam.nativeElement, 0, 0, canvasEl.width, canvasEl.height);
      const predictions = await this.model.detect(canvasEl);
      const filtered = predictions.filter((p: any) => p.score > 0.6);

      this.zone.run(() => {
        this.detectedObjects = filtered.map((p: any) => ({
          class: p.class,
          score: +(p.score * 100).toFixed(1)
        }));
      });

      if (filtered.length > 0 && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const now = Date.now();
          if (now - this.lastGeocodeTime > 5000) {
            this.lastGeocodeTime = now;

            const { latitude, longitude } = position.coords;
            this.zone.run(() => {
              this.coordinates = `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`;
            });

            this.initOrUpdateMap(latitude, longitude);
            this.fetchAddress(latitude, longitude);
          }
        });
      }
    }, 700);
  }

  initOrUpdateMap(lat: number, lng: number) {
    const mapElement = this.mapContainer.nativeElement;
    if (!this.map) {
      this.map = new google.maps.Map(mapElement, {
        center: { lat, lng },
        zoom: 16
      });
      this.marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        title: 'Detected Location'
      });
    } else {
      this.map.setCenter({ lat, lng });
      this.marker.setPosition({ lat, lng });
    }
  }

  async fetchAddress(lat: number, lng: number) {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB-VhhAehwaTHs5k03m_dj8eNplm7VIXQY`);
      const data = await response.json();
      if (data.status === 'OK' && data.results.length > 0) {
        this.zone.run(() => {
          this.address = data.results[0].formatted_address;
        });
      } else {
        this.zone.run(() => {
          this.address = 'Could not fetch address.';
        });
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      this.zone.run(() => {
        this.address = 'Could not fetch address.';
      });
    }
  }
}
