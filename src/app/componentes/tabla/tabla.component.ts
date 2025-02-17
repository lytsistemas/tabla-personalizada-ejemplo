import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortFilterDirective } from '../../directivas/sort-filter.directive';

// Define la interfaz Producto con las propiedades necesarias
interface Producto {
  nombre: string;
  precio: number;
  categoria: string;
  fecha: Date;
}

@Component({
  selector: 'app-tabla', // Selector del componente
  imports: [CommonModule, SortFilterDirective], // Módulos importados
  templateUrl: './tabla.component.html', // Ruta de la plantilla HTML
  styleUrls: ['./tabla.component.css'], // Ruta de los estilos CSS
  standalone: true, // Indica que el componente es independiente
})
export class TablaComponent {
  // Lista de productos con datos de ejemplo
  productos: Producto[] = [
    { nombre: 'Smartphone X Pro', precio: 899.99, categoria: 'Electrónica', fecha: new Date('2023-11-22') },
    { nombre: 'Laptop Gamer Nitro 5', precio: 1299.0, categoria: 'Electrónica', fecha: new Date('2023-12-01') },
    { nombre: 'Tablet Galaxy Tab S9', precio: 749.99, categoria: 'Electrónica', fecha: new Date('2023-12-15') },
    { nombre: 'Auriculares inalámbricos Airpods Pro', precio: 249.0, categoria: 'Electrónica', fecha: new Date('2023-11-28') },
    { nombre: 'Smartwatch Apple Watch Series 8', precio: 499.0, categoria: 'Electrónica', fecha: new Date('2023-12-10') },
    { nombre: 'Camiseta de algodón orgánico', precio: 19.99, categoria: 'Ropa', fecha: new Date('2023-11-25') },
    { nombre: 'Jeans ajustados', precio: 49.99, categoria: 'Ropa', fecha: new Date('2023-12-03') },
    { nombre: 'Zapatos deportivos Nike Air Max', precio: 129.99, categoria: 'Ropa', fecha: new Date('2023-12-18') },
    { nombre: 'Abrigo de invierno', precio: 99.99, categoria: 'Ropa', fecha: new Date('2023-12-22') },
    { nombre: 'Vestido de fiesta', precio: 199.99, categoria: 'Ropa', fecha: new Date('2023-12-25') },
  ];

  // Lista filtrada de productos, inicialmente contiene todos los productos
  filteredProductos: Producto[] = [...this.productos];

  // Método que actualiza la lista filtrada de productos
  onDataChanged(filteredData: Producto[]) {
    this.filteredProductos = filteredData;
  }
}
