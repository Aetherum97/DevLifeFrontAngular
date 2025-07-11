import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/app-common/ui/card/card.component';

@Component({
  selector: 'app-material-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './material-page.component.html',
  styleUrl: './material-page.component.scss',
})
export class MaterialPageComponent {}
