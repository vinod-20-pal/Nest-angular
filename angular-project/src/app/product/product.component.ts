import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../common/helper.service';
import { Environment } from 'src/environment';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {

  dialogHeader = "";
  productData: any;
  submitType: string = 'Save';
  showNew: Boolean = false;
  selectedRow: any;
  ngModel: any = {};

  constructor( public modalService: NgbModal,
    public dialog: MatDialog,
    private env:Environment,
    private helper: HelperService
  ) { }

  ngOnInit(){
    this.getProduct();
    this.helper.headerFlag.next(true);
  }
  
  /**
   * Purpose: Get product details
   */
  getProduct(){    
    const url = '/product'
    this.helper.get(url).subscribe((res) => {
      if(res){
        this.productData = res;
      }
    });
  }

  /**
   * Purpose: Delete product
   */
  delete(ind:any){
    this.selectedRow = this.productData[ind]._id;
    this.helper.delete(`${this.env.BASE_URL}/product/${this.selectedRow}`).subscribe((res) => {
      this.productData.splice(ind,1);
    });
  }

  open(model:any,type:string,index:any): void{
    if(type=='Save'){
      this.dialogHeader = "Add New Product";
      this.submitType = type;
      this.ngModel = {};
    } else if('Update'){
      this.dialogHeader= "Edit Product";
      this.submitType = type;
      this.selectedRow = this.productData[index]._id;
      this.ngModel = this.productData[index];
    }
    
    this.modalService.open(model);
  }

  onSave(title:any,description:any,price:any){
    if(this.submitType=='Save'){
      let data = {
        "title": title.value,
        "description": description.value,
        "price": price.value
      }
      console.log(data);
      this.helper.post(`${this.env.BASE_URL}/product`,data).subscribe((res) => {
        if(res){
          this.productData.push(res);
          this.modalService.dismissAll('Cross click');
        }
      })
    } else if(this.submitType=='Update'){
      let data = {
        "title": title.value,
        "description": description.value,
        "price": price.value
      }
      this.helper.patch(`${this.env.BASE_URL}/product/${this.selectedRow}`,data).subscribe((res) => {
          this.ngModel.title = title.value;
          this.ngModel.description = description.value;
          this.ngModel.price = price.value;
          this.productData[this.selectedRow] = this.ngModel;
          this.modalService.dismissAll('Cross click');
      });
    }
  }

}
