import { Component, HostListener, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';
import * as products from '../../../assets/data/data.json';

@Component({
  selector: 'app-productspage',
  templateUrl: './productspage.component.html',
  styleUrls: ['./productspage.component.scss'],
})
export class ProductspageComponent implements OnInit {
  constructor(private mainServ: MainService) {}
  limit: number = 10;
  offset: number = 0;
  productsData: any = [];
  searchText: string = '';
  selectedIndex: any;
  isLoading: boolean = true;
  sortByAscending: boolean = false;
  totalLength:number=20;
  ngOnInit(): void {
    console.log("products",products);
    this.getProducts();
    if (localStorage.getItem('selectedCardIndex')) {
      this.selectedIndex = parseInt(
        localStorage.getItem('selectedCardIndex') as string
      );
    }
  }

  getProducts() {
    this.isLoading = true;
    let dataToPass = {
      limit: this.limit,
    };
    this.mainServ.getProductsFakeAPI(dataToPass).subscribe((data: any) => {
      console.log('data', data);
      if (data) {
        this.isLoading = false;
      }
      this.productsData = [...this.productsData, ...data];
      this.limit += this.limit;
    });
  }

  onScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      if(this.limit <= this.totalLength){
      this.getProducts();
      }
    }
  }

  sortByPrice() {
    this.sortByAscending = !this.sortByAscending;
    console.log("sort", this.sortByAscending)
    let num=0;
    if(this.sortByAscending ){
      num = 1;
    }
    else{
      num =-1;
    }
    this.productsData = this.productsData.sort(num)
  }

  cardClicked(data: any, i: number) {
    console.log('Number', i, 'data', data);
    this.manageClickedCardColor(i);
  }
  manageClickedCardColor(index: number) {
    localStorage.setItem('selectedCardIndex', index.toString());
    if (index !== this.selectedIndex) {
      this.selectedIndex = index;
    }
  }
}
