import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchBox',
  standalone: true,
  templateUrl: './searchBox.component.html'
})
export default class SearchBoxComponent  {

  @Input()
    public placeholder: string = "";

  @Output()
    public value = new EventEmitter<string>();

  uniqueSearch( value: string):void{
    this.value.emit( value );
  }

}
