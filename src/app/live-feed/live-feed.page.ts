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

  isStreaming = false;
  isLoading = false;

  private wakeLock: any = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedBlobs: Blob[] = [];
  private pauseSubscription: any;
  private resumeSubscription: any;

  constructor(
    private cameraService: CameraService,
    private alertController: AlertController,
    private platform: Platform
  ) {
    this.pauseSubscription = this.platform.pause.subscribe(() => {
      this.releaseWakeLock(); // Release wake lock but keep stream alive
    });

    this.resumeSubscription = this.platform.resume.subscribe(() => {
      if (this.isStreaming) {
        this.attachCameraStream(); // Reattach stream on app resume
        this.keepAlive();
      }
    });
  }

  ngOnInit() {
    this.initCamera(); // Auto start camera and recording
  }

  // FIXED: Use ionViewDidEnter to rebind stream when returning to tab
  async ionViewDidEnter() {
    if (this.isStreaming) {
      this.attachCameraStream(); // Rebind stream to <video> element
    }
  }

  async initCamera() {
    this.isLoading = true;
    const stream = await this.cameraService.startCamera();
    this.isStreaming = this.cameraService.isCameraRunning();

    if (stream) {
      this.attachCameraStream();
      await this.keepAlive();
      await this.startRecording(); // Auto start recording
    } else {
      await this.showAlert('Camera Error', 'Failed to access camera. Please check permissions.');
    }

    this.isLoading = false;
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
        // @ts-ignore
        this.wakeLock = await navigator.wakeLock.request('screen');
        this.wakeLock.addEventListener('release', () => {
          console.log('Wake Lock released');
        });
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
      }
    } catch (err) {
      console.error('Error releasing wake lock:', err);
    }
  }

  async startRecording() {
    const stream = this.cameraService.getStream();
    if (!stream) return;

    try {
      this.recordedBlobs = [];
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8,opus'
      });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordedBlobs.push(event.data);
        }
      };

      this.mediaRecorder.start();
      console.log('Recording started...');
    } catch (err) {
      console.error('MediaRecorder error:', err);
    }
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder = null;
      console.log('Recording stopped.');
    }
  }

  stopCamera() {
    this.stopRecording();
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
    this.stopCamera();
    if (this.pauseSubscription) this.pauseSubscription.unsubscribe();
    if (this.resumeSubscription) this.resumeSubscription.unsubscribe();
  }
}
