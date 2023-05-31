import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { payment } from 'src/app/data/payment';
import { ParentserviceService } from 'src/app/services/parentservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css','../../../../styles/form.style.css']
})
export class PaymentComponent implements OnInit {
  Parent:string = '';
  Student:string = '';
  Amount:number = 0 ;

  constructor(private router:ActivatedRoute, private parentService:ParentserviceService, private route:Router) {

  }

  ngOnInit(): void {
    this.Parent = this.router.snapshot.paramMap.get('parent') || ''
    this.Student = this.router.snapshot.paramMap.get('student') || ''
    this.Amount = +(this.router.snapshot.paramMap.get('amount') || '')
  }

  payment:FormGroup = new FormGroup({
    cardName: new FormControl('',[Validators.required]),
    cardNumber: new FormControl('',[Validators.required, Validators.pattern("^[0-9]{16}$")]),
    cardExpiryYear: new FormControl('',[Validators.required]),
    cardExpiryMonth: new FormControl('',[Validators.required]),
    cardCvc: new FormControl('',[Validators.required, Validators.pattern("^[0-9]{3}$")])
  });

  get cardnamecontrol(){
    return this.payment.controls['cardName']
  }get cardnumbercontrol(){
    return this.payment.controls['cardNumber']
  }get cardexpyearcontrol(){
    return this.payment.controls['cardExpiryYear']
  }get cardexpmonthcontrol(){
    return this.payment.controls['cardExpiryMonth']
  }get cardcvccontrol(){
    return this.payment.controls['cardCvc']
  }

  addpayment(){
    if(this.payment.valid){
      let payment:payment = {
        parentID:this.Parent,
        studentID:this.Student,
        amount:this.Amount,
        ...this.payment.value
      }
      console.log(payment);
      this.parentService.payment(payment).subscribe({
        next:res =>{
          this.route.navigate(['parent']);
          console.log(res);
        },error:e => {
          console.log(e);
        }

      });
    }
  }
}
