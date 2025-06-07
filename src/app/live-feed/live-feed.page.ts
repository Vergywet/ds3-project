import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.page.html',
  styleUrls: ['./live-feed.page.scss'],
  standalone: false,
})
export class LiveFeedPage implements OnInit, OnDestroy {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  mediaStream: MediaStream | null = null;
  isStreaming: boolean = false;
  private pauseSubscription: any;

  constructor(
    private alertController: AlertController,
    private platform: Platform
  ) {
    // Handle app state changes
    this.pauseSubscription = this.platform.pause.subscribe(() => {
      // Keep camera running when app goes to background
      if (this.isStreaming) {
        this.keepAlive();
      }
    });
  }

  ngOnInit() {
    // Start camera when component initializes
    this.startCamera();
  }

  async keepAlive() {
    if ('wakeLock' in navigator) {
      try {
        // @ts-ignore - Wake Lock API
        const wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => {
          console.log('Wake Lock released');
        });
      } catch (err) {
        console.error('Wake Lock error:', err);
      }
    }
  }

  async startCamera() {
    if (this.isStreaming) return;

    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment'
        },
        audio: false // Disable audio to save resources
      };

      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (this.videoElement?.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.mediaStream;
        this.videoElement.nativeElement.play();
        
        // Enable background mode
        this.videoElement.nativeElement.setAttribute('playsinline', '');
        this.videoElement.nativeElement.setAttribute('webkit-playsinline', '');
        
        this.isStreaming = true;
        await this.keepAlive();
      }
    } catch (error) {
      console.error('Camera access error:', error);
      await this.showAlert(
        'Camera Error',
        'Failed to access camera. Please check permissions.'
      );
    }
  }

  stopCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => {
        // Don't stop tracks, just mute them
        track.enabled = false;
      });
    }
    
    if (this.videoElement?.nativeElement) {
      // Don't clear srcObject to maintain the stream
      this.videoElement.nativeElement.pause();
    }
    
    this.isStreaming = false;
  }

  async toggleCamera() {
    if (this.isStreaming) {
      this.stopCamera();
    } else {
      await this.startCamera();
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

  // Remove ionViewWillLeave to keep camera running when switching tabs

  ngOnDestroy() {
    // Only cleanup when component is actually destroyed
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    
    if (this.pauseSubscription) {
      this.pauseSubscription.unsubscribe();
    }
  }
}
