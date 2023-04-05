import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnviosService } from 'src/app/services/envios/envios.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.scss']
})
export class EnviosComponent implements OnInit {

  constructor(private enviosScv:EnviosService) { }

  ngOnInit(): void {
    this.enviosScv.obtenerLocalidades().subscribe(res=>console.log(res))
  }



}
