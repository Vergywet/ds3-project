import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.page.html',
  styleUrls: ['./live-feed.page.scss'],
  standalone: false,
})
export class LiveFeedPage implements OnInit, OnDestroy {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  isStreaming: boolean = false; // <-- ADD THIS

  private pauseSubscription: any;
  private resumeSubscription: any;

  constructor(
    private cameraService: CameraService,
    private alertController: AlertController,
    private platform: Platform
  ) {
    this.pauseSubscription = this.platform.pause.subscribe(() => {
      console.log('[LiveFeed] App paused');
    });

    this.resumeSubscription = this.platform.resume.subscribe(() => {
      console.log('[LiveFeed] App resumed');
      this.attachCameraStream();
    });
  }

  ngOnInit() {
    this.initCamera();
  }

  async ionViewWillEnter() {
    this.attachCameraStream();
  }

  async initCamera() {
    const stream = await this.cameraService.startCamera();
    this.isStreaming = this.cameraService.isCameraRunning(); // <-- UPDATE STATE
    if (stream) {
      this.attachCameraStream();
      await this.keepAlive();
    } else {
      await this.showAlert('Camera Error', 'Failed to access camera. Please check permissions.');
    }
  }

  attachCameraStream() {
    const stream = this.cameraService.getStream();
    if (stream && this.videoElement?.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.srcObject = stream;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.play().catch(err => console.error('Video play error:', err));
    }
  }

  async keepAlive() {
    if ('wakeLock' in navigator) {
      try {
        // @ts-ignore
        const wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => {
          console.log('Wake Lock released');
        });
      } catch (err) {
        console.error('Wake Lock error:', err);
      }
    }
  }

  async toggleCamera() {
    if (this.cameraService.isCameraRunning()) {
      this.stopCamera();
    } else {
      await this.startCamera();
    }
  }

  async startCamera() {
    const stream = await this.cameraService.startCamera();
    this.isStreaming = this.cameraService.isCameraRunning(); // <-- UPDATE STATE
    if (stream) {
      this.attachCameraStream();
    } else {
      await this.showAlert('Camera Error', 'Could not start the camera.');
    }
  }

  stopCamera() {
    this.cameraService.stopCamera();
    this.isStreaming = this.cameraService.isCameraRunning(); // <-- UPDATE STATE
    this.detachCamera();
  }

  detachCamera() {
    if (this.videoElement?.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.pause();
      video.srcObject = null;
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnDestroy() {
    this.detachCamera();
    this.cameraService.stopCamera();
    if (this.pauseSubscription) this.pauseSubscription.unsubscribe();
    if (this.resumeSubscription) this.resumeSubscription.unsubscribe();
  }
}

