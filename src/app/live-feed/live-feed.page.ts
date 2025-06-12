// Import necessary Angular and Ionic modules
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { CameraService } from '../services/camera.service'; // Custom service to handle camera logic

@Component({
  selector: 'app-live-feed', // Component selector
  templateUrl: './live-feed.page.html', // Template file
  styleUrls: ['./live-feed.page.scss'], // Styling file
  standalone: false, // Part of a module, not a standalone component
})
export class LiveFeedPage implements OnInit, OnDestroy {

  // Access the <video> element in the template by reference name 'videoElement'
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  // Boolean flag to check if camera is streaming
  isStreaming: boolean = false;

  // Platform pause/resume subscriptions for handling app lifecycle
  private pauseSubscription: any;
  private resumeSubscription: any;

  constructor(
    private cameraService: CameraService, // Injecting camera service
    private alertController: AlertController, // Alert controller for showing errors/messages
    private platform: Platform // Platform service for subscribing to pause/resume events
  ) {
    // Subscribe to pause event - e.g., when the app is sent to the background
    this.pauseSubscription = this.platform.pause.subscribe(() => {
      console.log('[LiveFeed] App paused');
    });

    // Subscribe to resume event - when the app returns to the foreground
    this.resumeSubscription = this.platform.resume.subscribe(() => {
      console.log('[LiveFeed] App resumed');
      this.attachCameraStream(); // Re-attach the camera stream on resume
    });
  }

  // Lifecycle hook that runs on component initialization
  ngOnInit() {
    this.initCamera(); // Start the camera
  }

  // Lifecycle hook when entering the view
  async ionViewWillEnter() {
    this.attachCameraStream(); // Ensure the stream is re-attached
  }

  // Initialize camera and attach stream
  async initCamera() {
    const stream = await this.cameraService.startCamera(); // Start camera using the service
    this.isStreaming = this.cameraService.isCameraRunning(); // Update streaming state
    if (stream) {
      this.attachCameraStream(); // Bind video stream to video element
      await this.keepAlive(); // Prevent screen from sleeping
    } else {
      await this.showAlert('Camera Error', 'Failed to access camera. Please check permissions.');
    }
  }

  // Attach the camera stream to the video HTML element
  attachCameraStream() {
    const stream = this.cameraService.getStream(); // Get media stream from service
    if (stream && this.videoElement?.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.srcObject = stream; // Bind stream to video element
      video.setAttribute('playsinline', ''); // Ensures inline playback (especially on iOS)
      video.setAttribute('webkit-playsinline', ''); // iOS Safari-specific attribute
      video.play().catch(err => console.error('Video play error:', err)); // Start video playback
    }
  }

  // Prevent the device screen from sleeping while camera is active
  async keepAlive() {
    if ('wakeLock' in navigator) {
      try {
        // @ts-ignore: Wake Lock is still experimental
        const wakeLock = await navigator.wakeLock.request('screen'); // Request screen wake lock
        wakeLock.addEventListener('release', () => {
          console.log('Wake Lock released'); // Log when lock is released
        });
      } catch (err) {
        console.error('Wake Lock error:', err); // Log error
      }
    }
  }

  // Toggle camera stream on/off
  async toggleCamera() {
    if (this.cameraService.isCameraRunning()) {
      this.stopCamera(); // Stop camera if running
    } else {
      await this.startCamera(); // Start camera if not running
    }
  }

  // Start the camera stream and attach to video element
  async startCamera() {
    const stream = await this.cameraService.startCamera(); // Start stream
    this.isStreaming = this.cameraService.isCameraRunning(); // Update state
    if (stream) {
      this.attachCameraStream(); // Attach stream to UI
    } else {
      await this.showAlert('Camera Error', 'Could not start the camera.');
    }
  }

  // Stop the camera and detach video stream
  stopCamera() {
    this.cameraService.stopCamera(); // Stop camera in service
    this.isStreaming = this.cameraService.isCameraRunning(); // Update state
    this.detachCamera(); // Remove stream from UI
  }

  // Clear video element's stream and stop playback
  detachCamera() {
    if (this.videoElement?.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.pause(); // Pause video
      video.srcObject = null; // Remove stream reference
    }
  }

  // Show an alert dialog with given title and message
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Cleanup logic when component is destroyed
  ngOnDestroy() {
    this.detachCamera(); // Stop video playback
    this.cameraService.stopCamera(); // Stop camera stream
    if (this.pauseSubscription) this.pauseSubscription.unsubscribe(); // Unsubscribe from pause event
    if (this.resumeSubscription) this.resumeSubscription.unsubscribe(); // Unsubscribe from resume event
  }
}