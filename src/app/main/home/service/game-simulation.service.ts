import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimulationRequest } from '../../models/interface/simulation-request';
import { SimulationResponse } from '../../models/interface/simulation-response';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GameSimulationService {
  constructor(private http:HttpClient) { }
   // perform simulation for games
 gameSimulation(request:SimulationRequest) {
  return this.http.post<SimulationResponse>(environment.apiBase+'api/montyHall', request);
}
}
