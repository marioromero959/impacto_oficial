import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent{
  // @Input('showSpinner') showSpinner:boolean = true;
  showSpinner = this.spinnerSvc.isLoading$;
  constructor(private spinnerSvc:SpinnerService) { }
}
