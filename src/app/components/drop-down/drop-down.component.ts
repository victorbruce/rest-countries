import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss',
})
export class DropDownComponent {
  @Input() options: string[] = [];
  @Input() selectedOption: string | null = null;
  @Output() selectedOptionChange = new EventEmitter<string | null>();

  dropdownOpen = false;

  constructor(private elRef: ElementRef) {}

  toggleDropDown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.selectedOptionChange.emit(option);
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    this.dropdownOpen = false;
  }
}
