import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IMemeGenerateRequest, IMemeGenerateResponse, IMemeUploadResponse } from '../models/meme.model';


@Injectable({
    providedIn: 'root'
})
export class MemeService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    public uploadImage(file: File): Observable<IMemeUploadResponse> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<IMemeUploadResponse>(`${this.apiUrl}/memes/upload`, formData);
    }

    public generateMeme(request: IMemeGenerateRequest): Observable<IMemeGenerateResponse> {
        return this.http.post<IMemeGenerateResponse>(`${this.apiUrl}/memes/generate`, request);
    }
}
