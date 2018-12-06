import {
  Component, Input, OnInit
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Bee } from '../../models/bee';
import { BeeService } from '../../services/bee.service';
import { SkyModalInstance } from '@blackbaud/skyux/dist/core';
import { BeeAddEditModalContext } from '../bee-list/bee-list.component';

@Component({
  selector: 'app-bee-edit',
  templateUrl: './bee-edit.component.html',
  styleUrls: ['./bee-edit.component.scss']
})
export class BeeEditComponent implements OnInit {
  private selectedBee: Bee;
  public beeForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    genus: ['', Validators.required],
    species: ['', Validators.required],
    deadly: [true],
    alias: [''],
    communal: [true],
    endangered: [true],
    image_url: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private beeService: BeeService,
    public context: BeeAddEditModalContext, public instance: SkyModalInstance) { }

  public ngOnInit(): void {
    if (this.context.selectedBee) {
      this.selectedBee = this.context.selectedBee;
      this.beeForm.patchValue({
        name: this.selectedBee.name,
        description: this.selectedBee.description,
        genus: this.selectedBee.genus,
        species: this.selectedBee.species,
        deadly: this.selectedBee.deadly,
        alias: this.selectedBee.alias,
        communal: this.selectedBee.communal,
        endangered: this.selectedBee.endangered,
        image_url: this.selectedBee.image_url
      });
    }
  }

  public SaveBee() {
    let niceCleanBeeData = Object.assign({}, this.selectedBee, this.beeForm.value);
    if (this.context.action === 'Edit') {
      this.beeService.updateBee(niceCleanBeeData).subscribe(d => { this.instance.save(niceCleanBeeData); });
    } else {
      this.beeService.createBee(niceCleanBeeData).subscribe(d => { this.instance.save(niceCleanBeeData); });
    }
  }
}
