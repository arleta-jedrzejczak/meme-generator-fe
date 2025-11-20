import { Injectable, signal } from '@angular/core';
import { TLanguage } from './types/service.types';

interface Translations {
    title: string;
    subtitle: string;
    uploadImage: string;
    chooseStyle: string;
    result: string;
    caption: string;
    aiDescription: string;
    regenerate: string;
    newImage: string;
    upload: string;
    generateCaption: string;
    clickToSelect: string;
    imageUploaded: string;
    captionGenerated: string;
    captionCopied: string;
    uploadFailed: string;
    generationFailed: string;
    humorous: string;
    advertising: string;
    motivational: string;
    sarcastic: string;
    professional: string;
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private currentLanguage = signal<TLanguage>('en');

    private translations: Record<TLanguage, Translations> = {
        en: {
            title: 'AI Meme Generator',
            subtitle: 'Upload an image and generate AI-powered captions',
            uploadImage: 'Upload Image',
            chooseStyle: 'Choose Style',
            result: 'Result',
            caption: 'Caption',
            aiDescription: 'AI Description',
            regenerate: 'Regenerate',
            newImage: 'New Image',
            upload: 'Upload',
            generateCaption: 'Generate Caption',
            clickToSelect: 'Click to select an image',
            imageUploaded: 'Image uploaded successfully',
            captionGenerated: 'Caption generated',
            captionCopied: 'Caption copied',
            uploadFailed: 'Failed to upload image',
            generationFailed: 'Failed to generate caption',
            humorous: 'Humorous',
            advertising: 'Advertising',
            motivational: 'Motivational',
            sarcastic: 'Sarcastic',
            professional: 'Professional'
        },
        pl: {
            title: 'Generator Memów AI',
            subtitle: 'Prześlij obraz i wygeneruj podpisy za pomocą AI',
            uploadImage: 'Prześlij obraz',
            chooseStyle: 'Wybierz styl',
            result: 'Wynik',
            caption: 'Podpis',
            aiDescription: 'Opis AI',
            regenerate: 'Generuj ponownie',
            newImage: 'Nowy obraz',
            upload: 'Prześlij',
            generateCaption: 'Generuj podpis',
            clickToSelect: 'Kliknij aby wybrać obraz',
            imageUploaded: 'Obraz przesłany pomyślnie',
            captionGenerated: 'Podpis wygenerowany',
            captionCopied: 'Podpis skopiowany',
            uploadFailed: 'Nie udało się przesłać obrazu',
            generationFailed: 'Nie udało się wygenerować podpisu',
            humorous: 'Humorystyczny',
            advertising: 'Reklamowy',
            motivational: 'Motywacyjny',
            sarcastic: 'Sarkastyczny',
            professional: 'Profesjonalny'
        }
    };

    constructor() {
        const saved = localStorage.getItem('TLanguage') as TLanguage;
        if (saved && (saved === 'en' || saved === 'pl')) {
            this.currentLanguage.set(saved);
        }
    }

    public setLanguage(lang: TLanguage): void {
        this.currentLanguage.set(lang);
        localStorage.setItem('Language', lang);
    }

    public getTranslations(): Translations {
        return this.translations[this.currentLanguage()];
    }

    public translate(key: keyof Translations): string {
        return this.translations[this.currentLanguage()][key];
    }
}
