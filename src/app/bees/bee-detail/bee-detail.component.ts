import {
  Component,  Input, OnInit, OnChanges, SimpleChanges
} from '@angular/core';
import { Bee } from '../../models/bee';
import { BeeService } from '../../services/bee.service';

@Component({
  selector: 'app-bee-detail',
  templateUrl: './bee-detail.component.html',
  styleUrls: ['./bee-detail.component.scss']
})
export class BeeDetailComponent implements OnChanges {
  @Input() public selectedBeeId: string;

  public selectdBee: Bee = undefined;

  constructor(private service: BeeService) {
  }



  public ngOnChanges(changes: SimpleChanges): void {

    console.log(changes.selectedBeeId.currentValue);
    this.service.getBee(changes.selectedBeeId.currentValue).subscribe(x => this.selectdBee = x);
    // if (this.bees.length > 0) {
    //   let filteredBee =  this.bees.find(obj => obj.id === this.selectedBeeId);
    //   if (filteredBee.length > 0 ) {
    //     this.selectedBee = filteredBee[0];
    //   }
    // }
  }

}
