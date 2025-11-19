import { Routes } from '@angular/router';
import { MemeGeneratorComponent } from './components/meme-generator/meme-generator.component';

export const routes: Routes = [
  { path: '', component: MemeGeneratorComponent },
  { path: '**', redirectTo: '' }
];
