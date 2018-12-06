import {
  Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges
} from '@angular/core';
import { Bee } from '../../models/bee';
import { Router } from '@angular/router';
import { BeeService } from '../../services/bee.service';
import {
  SkyModalService,
  SkyModalCloseArgs,
  SkyWaitService
} from '@blackbaud/skyux/dist/core';
import { BeeEditComponent } from '../bee-edit/bee-edit.component';

@Component({
  selector: 'app-bee-list',
  templateUrl: './bee-list.component.html',
  styleUrls: ['./bee-list.component.scss']
})
export class BeeListComponent implements OnInit {

  public bees: Array<Bee> = [];

  constructor(private beeService: BeeService,
              private modal: SkyModalService,
              private router: Router,
              private waitSvc: SkyWaitService) { }

  public ngOnInit(): void {
    this.GetBees();
  }

  public GetBees() {
    this.waitSvc.beginBlockingPageWait();
    this.beeService.getBees()
      .subscribe(bees => {
        this.waitSvc.endBlockingPageWait();
        this.bees = bees;
      },
        error => {
          this.waitSvc.endBlockingPageWait();
          console.log(error);
        });
  }

  public showBee(beeSelected: Bee) {
    this.router.navigate(['bees', beeSelected.id]);
  }

  public deleteBee(beeSelected: Bee) {
    this.bees = this.bees.filter(obj => obj !== beeSelected);
    this.beeService.deleteBee(beeSelected.id)
      .subscribe(bees => { },
        error => console.log(error));
  }

  public UpdateBee(beeIn: Bee) {
    let context = new BeeAddEditModalContext('Edit', beeIn);
    const options: any = {
      providers: [{ provide: BeeAddEditModalContext, useValue: context }],
      size: 'large'
    };

    const modalInstance = this.modal.open(BeeEditComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      console.log(`Modal closed with reason: ${result.reason} and data: ${result.data}`);
    });
  }

  public CreateBee() {
    let context = new BeeAddEditModalContext('Create');
    const options: any = {
      providers: [{ provide: BeeAddEditModalContext, useValue: context }],
      size: 'large'
    };

    const modalInstance = this.modal.open(BeeEditComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'save') { this.GetBees(); }
    });
  }
}

export class BeeAddEditModalContext {
  public action: string;

  constructor(performAction: string, public selectedBee?: Bee) {
    this.action = performAction;
  }
}
