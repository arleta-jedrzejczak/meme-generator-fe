import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MemeService } from '../../services/meme.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { LanguageService } from '../../services/language.service';
import { IMemeGenerateResponse } from '../../models/meme.model';

@Component({
    selector: 'app-meme-generator',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatSnackBarModule,
        MatExpansionModule,
    ],
    templateUrl: './meme-generator.component.html',
    styleUrls: ['./meme-generator.component.scss']
})
export class MemeGeneratorComponent {
    protected selectedFile = signal<File | null>(null);
    protected imagePreview = signal<string | null>(null);
    protected uploadedImageUrl = signal<string | null>(null);
    protected selectedStyle = signal<'humorous' | 'advertising' | 'motivational' | 'sarcastic' | 'professional'>('humorous');
    protected generatedMeme = signal<IMemeGenerateResponse | null>(null);
    protected uploadLoading = signal<boolean>(false);
    protected generateLoading = signal<boolean>(false);
    protected error = signal<string | null>(null);

    protected canUpload = computed(() => this.selectedFile() !== null && !this.uploadLoading());
    protected canGenerate = computed(() => this.uploadedImageUrl() !== null && !this.generateLoading());

    private memeService: MemeService = inject(MemeService);
    private snackBar: MatSnackBar = inject(MatSnackBar);
    protected languageService: LanguageService = inject(LanguageService);

    protected onFileSelected(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        const file: File | undefined = input.files?.[0];

        if (file) {
            this.selectedFile.set(file);
            this.error.set(null);

            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview.set(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    protected uploadImage(): void {
        const file: File | null = this.selectedFile();
        if (!file) {
            return;
        }

        this.uploadLoading.set(true);
        this.error.set(null);

        this.memeService.uploadImage(file).subscribe({
            next: (response) => {
                this.uploadedImageUrl.set(response.image_url);
                this.uploadLoading.set(false);
                this.snackBar.open(this.languageService.translate('imageUploaded'), 'Close', {
                    duration: 3000
                });
            },
            error: (err) => {
                this.error.set(this.languageService.translate('uploadFailed'));
                this.uploadLoading.set(false);
                console.error(err);
            }
        });
    }

    protected generateMeme(): void {
        const imageUrl: string | null = this.uploadedImageUrl();
        if (!imageUrl) {
            return;
        }

        this.generateLoading.set(true);
        this.error.set(null);

        this.memeService.generateMeme({
            image_url: imageUrl,
            style: this.selectedStyle()
        }).subscribe({
            next: (response) => {
                this.generatedMeme.set(response);
                this.generateLoading.set(false);
                this.snackBar.open(this.languageService.translate('captionGenerated'), 'Close', {
                    duration: 3000
                });
            },
            error: (err) => {
                this.error.set(this.languageService.translate('generationFailed'));
                this.generateLoading.set(false);
                console.error(err);
            }
        });
    }

    protected regenerate(): void {
        this.generateMeme();
    }

    protected reset(): void {
        this.selectedFile.set(null);
        this.imagePreview.set(null);
        this.uploadedImageUrl.set(null);
        this.generatedMeme.set(null);
        this.error.set(null);
    }

    protected copyCaption(): void {
        const caption: string | undefined = this.generatedMeme()?.caption;
        if (caption) {
            navigator.clipboard.writeText(caption).then(() => {
                this.snackBar.open(this.languageService.translate('captionCopied'), 'Close', {
                    duration: 2000
                });
            });
        }
    }
}
