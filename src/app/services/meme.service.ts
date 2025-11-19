import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  UploadResponse, 
  MemeGenerateRequest, 
  MemeGenerateResponse 
} from '../models/meme.model';

@Injectable({
  providedIn: 'root'
})
export class MemeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  uploadImage(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResponse>(`${this.apiUrl}/memes/upload`, formData);
  }

  generateMeme(request: MemeGenerateRequest): Observable<MemeGenerateResponse> {
    return this.http.post<MemeGenerateResponse>(`${this.apiUrl}/memes/generate`, request);
  }
}
