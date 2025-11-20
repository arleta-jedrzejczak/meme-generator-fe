export interface IMemeUploadResponse {
    image_url: string;
    blob_name: string;
    message: string;
}

export interface IMemeGenerateRequest {
    image_url: string;
    style: 'humorous' | 'advertising' | 'motivational' | 'sarcastic' | 'professional';
}

export interface IMemeGenerateResponse {
    image_url: string;
    caption: string;
    style: string;
    description: string;
}
