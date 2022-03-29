import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";


@Component({
    selector:'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges{
    starWidth: number = 75;
    @Input() rating: number = 0;
   @Output() ratingClicked :EventEmitter <string> =
    new EventEmitter <string>();
    


    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;
      }
      onClick():void {
         this.ratingClicked.emit(`the rating ${this.rating} was clicked`)
      }
}

