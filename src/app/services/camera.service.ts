import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private stream: MediaStream | null = null;
  private isStreaming = false;

  async startCamera(): Promise<MediaStream | null> {
    if (!this.isStreaming) {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment'
        },
        audio: false
      };
      try {
        this.stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.isStreaming = true;
      } catch (err) {
        console.error('Camera error:', err);
        return null;
      }
    }
    return this.stream;
  }

  getStream(): MediaStream | null {
    return this.stream;
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
      this.isStreaming = false;
    }
  }

  isCameraRunning(): boolean {
    return this.isStreaming;
  }
}
