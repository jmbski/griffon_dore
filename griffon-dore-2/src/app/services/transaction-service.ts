import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { 
    LocalObject
} from '@app/models';
import { DataService } from './data-service';

@Injectable({providedIn: 'root'})
export class TransactionService implements LocalObject {
    public readonly LOCAL_ID: string = 'transaction-service';
    
    // #region public properties
    public base_url = 'http://localhost:5000/services/';
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        private http: HttpClient,
        private dataService: DataService,
    ) {

    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public async test(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.http.get(this.base_url + 'test').subscribe((response?: unknown) => {
                if(response == null) {
                    reject('No response from server');
                    return;
                }
                if(typeof response === 'string') {
                    resolve(response);
                    return;
                }
                reject('Invalid response from server');
            });
        });
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}