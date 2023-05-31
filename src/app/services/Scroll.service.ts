import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ScrollService {
  constructor(private router: Router) {}
  async scrollToElementById(id: string) {
    var element = this.__getElementById(id);
    if(element)
    this.scrollToElement(element);
    else
    {
        await this.router.navigate(['home']);
        console.log(element);

        element = this.__getElementById(id);
        console.log(id);
        console.log(element);
        setTimeout(() => {
            this.scrollToElement(element);
        }, 100);
        
    }

    

  }

  private __getElementById(id: string): any {
    console.log("element id : ", id);
    // const element = <HTMLElement>document.querySelector(`#${id}`);
    const element = document.getElementById(id);
    return element;
  }

  scrollToElement(element: HTMLElement) {
    console.log(element);
    element.scrollIntoView({ behavior: "smooth" });
  }
}