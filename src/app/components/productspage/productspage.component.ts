import { Component, HostListener, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-productspage',
  templateUrl: './productspage.component.html',
  styleUrls: ['./productspage.component.scss'],
})
export class ProductspageComponent implements OnInit {
  constructor(private mainServ: MainService) {}
  limit: number = 5;
  offset: number = 0;
  productsData: any = [];
  searchText: string = '';
  selectedIndex: any;
  isLoading: boolean = true;
  sortByAscending: boolean = false;
  totalLength: number = 20;
  ngOnInit(): void {
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
      if (data) {
        this.isLoading = false;
      }
      console.log(data)
      this.productsData = data;
      this.limit += this.limit;
    });
  }

  onScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      if (this.limit <= this.totalLength) {
        this.getProducts();
      }
    }
  }

  sortByPrice() {
    if (!this.sortByAscending) {
      this.productsData = this.productsData
        .slice()
        .sort((a: any, b: any) => a.price - b.price);
    } else {
      this.productsData = this.productsData
        .slice()
        .sort((a: any, b: any) => b.price - a.price);
    }
    this.sortByAscending = !this.sortByAscending;
  }

  cardClicked(data: any, i: number) {
    console.log(data,"INDEX",i)
    this.manageClickedCardColor(i);
  }
  manageClickedCardColor(index: number) {
    localStorage.setItem('selectedCardIndex', index.toString());
    if (index !== this.selectedIndex) {
      this.selectedIndex = index;
    }
  }
}
