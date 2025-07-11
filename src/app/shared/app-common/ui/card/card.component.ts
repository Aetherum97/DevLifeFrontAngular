import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
// import { MatDialogActions } from '../../../../../../node_modules/@angular/material/dialog/index';

/**
 * @title Card overview
 */
@Component({
  selector: 'app-card-component',
  templateUrl: 'card.component.html',
  styleUrl: 'card.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatDialogContent,
    // MatDialogActions,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() image?: string;

  @Input() elevation = 2;

  @ViewChild('detailsTemplate') detailsTpl!: TemplateRef<any>;

  constructor(private dialog: MatDialog) {}

  openDetails(): void {
    this.dialog.open(this.detailsTpl, {
      width: '600px',
      autoFocus: false,
    });
  }
}
