import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.page.html',
  styleUrls: ['./live-feed.page.scss'],
  standalone: false, // Set to false if this component is part of a module
})
export class LiveFeedPage implements OnInit, OnDestroy {
errorMessage: any;
onQualityChange() {
throw new Error('Method not implemented.');
}
hasMultipleCameras: any;
selectedQuality: any;
switchCamera() {
throw new Error('Method not implemented.');
}
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  isStreaming: boolean = false;
  private pauseSubscription: any;
  private resumeSubscription: any;
  private wakeLock: any = null;
isLoading: any;

  constructor(
    private cameraService: CameraService,
    private alertController: AlertController,
    private platform: Platform
  ) {
    this.pauseSubscription = this.platform.pause.subscribe(() => {
      console.log('[LiveFeed] App paused');
      this.releaseWakeLock();
    });

    this.resumeSubscription = this.platform.resume.subscribe(() => {
      console.log('[LiveFeed] App resumed');
      if (this.isStreaming) {
        this.attachCameraStream();
        this.keepAlive();
      }
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
    this.isStreaming = this.cameraService.isCameraRunning();
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
      if (video.srcObject !== stream) {
        video.srcObject = stream;
      }
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.play().catch(err => console.error('Video play error:', err));
    }
  }

  async keepAlive() {
    if ('wakeLock' in navigator) {
      try {
        // @ts-ignore: Wake Lock API experimental
        this.wakeLock = await navigator.wakeLock.request('screen');
        this.wakeLock.addEventListener('release', () => {
          console.log('Wake Lock released');
        });
        console.log('Wake Lock active');
      } catch (err) {
        console.error('Wake Lock error:', err);
      }
    }
  }

  async releaseWakeLock() {
    try {
      if (this.wakeLock) {
        await this.wakeLock.release();
        this.wakeLock = null;
        console.log('Wake Lock released manually');
      }
    } catch (err) {
      console.error('Error releasing wake lock:', err);
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
    this.isStreaming = this.cameraService.isCameraRunning();
    if (stream) {
      this.attachCameraStream();
      await this.keepAlive();
    } else {
      await this.showAlert('Camera Error', 'Could not start the camera.');
    }
  }

  stopCamera() {
    this.cameraService.stopCamera();
    this.detachCamera();
    this.isStreaming = false;
    this.releaseWakeLock();
  }

  detachCamera() {
    const video = this.videoElement?.nativeElement;
    if (video) {
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
    this.releaseWakeLock();
    if (this.pauseSubscription) this.pauseSubscription.unsubscribe();
    if (this.resumeSubscription) this.resumeSubscription.unsubscribe();
  }
}