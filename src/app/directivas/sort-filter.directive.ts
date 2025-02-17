import { Directive, Input, Output, EventEmitter, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSortable]',
  standalone: true,
})
export class SortFilterDirective<T> {
  @Input() sortableBy!: keyof T; // Restringimos las claves al tipo genérico T
  @Input() data: T[] = [];
  @Output() dataChanged = new EventEmitter<T[]>();

  private sortCriteria: Array<{ property: keyof T; ascending: boolean }> = [];
  private filterCriteria: { property: keyof T; value: string } | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') toggleSort() {
    // Encontrar si ya existe un criterio de ordenación para la propiedad actual
    const existingIndex = this.sortCriteria.findIndex((crit) => crit.property === this.sortableBy);

    if (existingIndex !== -1) {
      // Cambiar dirección si el campo ya está en los criterios
      this.sortCriteria[existingIndex].ascending = !this.sortCriteria[existingIndex].ascending;
    } else {
      // Añadir el nuevo campo a los criterios
      this.sortCriteria.push({ property: this.sortableBy, ascending: true });
    }

    this.updateSortClasses();
    this.applyChanges();
  }

  @HostListener('input', ['$event.target.value']) onFilter(value: string) {
    // Establecer el criterio de filtrado basado en el valor de entrada
    this.filterCriteria = { property: this.sortableBy, value };
    this.applyChanges();
  }

  private applyChanges() {
    let filteredData = [...this.data];

    if (this.filterCriteria) {
      // Filtrar los datos según el criterio de filtrado
      filteredData = filteredData.filter(item =>
        String(item[this.filterCriteria!.property]).toLowerCase().includes(this.filterCriteria!.value.toLowerCase())
      );
    }

    // Ordenar los datos según los criterios de ordenación
    filteredData.sort((a, b) => {
      for (const criterion of this.sortCriteria) {
        const { property, ascending } = criterion;

        if (a[property] < b[property]) {
          return ascending ? -1 : 1;
        } else if (a[property] > b[property]) {
          return ascending ? 1 : -1;
        }
      }
      return 0; // Si todos los criterios son iguales, considerar los elementos iguales
    });

    // Emitir los datos filtrados y ordenados
    this.dataChanged.emit(filteredData);
  }

  private updateSortClasses() {
    const th = this.el.nativeElement;
    // Remover clases de ordenación existentes
    this.renderer.removeClass(th, 'sort-asc');
    this.renderer.removeClass(th, 'sort-desc');

    // Añadir la clase de ordenación correspondiente
    const criterion = this.sortCriteria.find(crit => crit.property === this.sortableBy);
    if (criterion) {
      this.renderer.addClass(th, criterion.ascending ? 'sort-asc' : 'sort-desc');
    }
  }
}
