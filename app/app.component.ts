import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ChessboardComponent} from './chess/ChessboardComponent';

@Component({
    selector: 'my-app',
    templateUrl: 'app/ApplicationComponent.html',
    directives: [CORE_DIRECTIVES, ChessboardComponent]
})
export class AppComponent {


}