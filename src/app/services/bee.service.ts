import { Injectable } from '@angular/core';
import { SkyAuthHttp, SkyAppConfig } from '@blackbaud/skyux-builder/runtime';
import { Observable } from 'rxjs/Observable';
import { Bee } from '../models/bee';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class BeeService {
  private apiBaseUri: string = this.config.skyux.appSettings.buzzbaudSvcUrl;
  constructor(private skyAuthHttp: SkyAuthHttp, private config: SkyAppConfig) {
  }

  public getBees(): Observable<Array<Bee>> {
    return this.skyAuthHttp.get(this.apiBaseUri + 'bees').map(response => response.json().bees)
    .catch(this.handleError);
  }

  public getBee(beeId: string): Observable<Bee> {
    return this.skyAuthHttp.get(this.apiBaseUri + `bees/${encodeURIComponent(beeId)}`).map(response => response.json())
    .catch(this.handleError);
  }

  public updateBee(bee: Bee): Observable<Array<Bee>>  {
    return this.skyAuthHttp.put(this.apiBaseUri + `bees/${bee.id}`, bee).map(response => response.json().bees);
  }

  public deleteBee(beeId: string) {
    return this.skyAuthHttp.delete(this.apiBaseUri + `bees/${beeId}`);
  }

  public createBee(bee: Bee): Observable<Array<Bee>> {
    return this.skyAuthHttp.post(this.apiBaseUri + 'bees', bee).map(response => response.json().bees);
  }

  private handleError() {
    return Observable.throw('The data could not be loaded.');
  }

}
