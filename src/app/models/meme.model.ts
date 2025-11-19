export interface UploadResponse {
    image_url: string;
    blob_name: string;
    message: string;
}

export interface MemeGenerateRequest {
    image_url: string;
    style: 'humorous' | 'advertising' | 'motivational' | 'sarcastic' | 'professional';
}

export interface MemeGenerateResponse {
    image_url: string;
    caption: string;
    style: string;
    description: string;
}
