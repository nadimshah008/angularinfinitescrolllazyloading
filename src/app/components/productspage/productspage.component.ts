import { Component, HostListener, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';

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
  isLoading:boolean= true;
  ngOnInit(): void {
    this.getProducts();
    if (localStorage.getItem('selectedCardIndex')) {
      this.selectedIndex = parseInt(
        localStorage.getItem('selectedCardIndex') as string
      );
    }
  }

  getProducts() {
    this.isLoading= true;
    let dataToPass = {
      limit: this.limit,
      offset: this.offset,
    };
    this.mainServ.getProducts(dataToPass).subscribe((data: any) => {
      console.log('data', data);
      if(data){
        this.isLoading=false;
      }
      this.productsData = [...this.productsData, ...data];
      this.offset += this.limit;
    });
  }

  onScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      this.getProducts();
    }
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
