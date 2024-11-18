import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CarritoPrenda } from '../../../models/carritoprenda';
import { CarritoprendaService } from '../../../services/carritoprenda.service';

@Component({
  selector: 'app-listarcarritoprenda',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule,
    RouterLink, 
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './listarcarritoprenda.component.html',
  styleUrl: './listarcarritoprenda.component.css'
})
export class ListarcarritoprendaComponent {
  displayedColumns: string[] = [
    'idcarrito_prenda',
    'carrito',
    'prenda',
    'cantidad',
    'accion01',
    'accion02'
  ];
  dataSource: MatTableDataSource<CarritoPrenda> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private eS:CarritoprendaService) {}
  ngOnInit(): void {
    this.eS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);   
      this.dataSource.paginator = this.paginator;   
    });
  }
  eliminar(id: number) {
    this.eS.eliminar(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}