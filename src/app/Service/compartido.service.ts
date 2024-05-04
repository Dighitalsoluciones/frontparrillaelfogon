import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Item {
  id: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  private data: any[] = [];
  private dataSource = new BehaviorSubject<any>(this.data);
  currentData = this.dataSource.asObservable();

  constructor() { }

   // Array temporal para almacenar los cambios en los artículos
   tempData: Item[] = [];

   updateData(item: any) {
     let existingItem = this.data.find(i => i.id === item.id);
     if (existingItem) {
       existingItem.cantidad += item.cantidad;
       existingItem.stock += item.cantidad;
     } else {
       item.stock += item.cantidad;
       this.data.push(item);
       existingItem = item; // Actualizamos la referencia a existingItem
     }
     this.dataSource.next(this.data);
     console.log("Producto agregado"); 
     // Agrega el artículo al array temporal
     let tempItem = this.tempData.find(i => i.id === existingItem.id);
     if (tempItem) {
       tempItem.stock = existingItem.stock;
     } else {
       this.tempData.push({ id: existingItem.id, stock: existingItem.stock });
     }
   }
 
}
