import { Component, OnInit, ViewChild } from '@angular/core';
import { SimulationResponse } from '../models/interface/simulation-response';
import { MessageService } from 'primeng/api';
import { BaseTemplate } from '../template/base-template';
import { SimulationFormComponent } from '../components/simulation-form/simulation-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends BaseTemplate implements OnInit {
  //initialize numberofgames
  numberOfGames: number = 1;
  //initialize simulation response
  simulationResponse: SimulationResponse = {
    numberOfSimulations: 0,
    gameWinningResponses: [],
    winningPercentage: 0,
  };
  //declare conclusion text
  conclusionText: string = '';
  //declare chart data
  data: any;
  //declare chart options
  options: any;
  //declare child component to access its methods and properties
  @ViewChild(SimulationFormComponent) simulationFormComponent:
    | SimulationFormComponent
    | undefined;
  /**
   *constructor of the component
   */

  constructor(messageService: MessageService) {
    super(messageService);
  }
  ngOnInit(): void {
    //set chart options
    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: '#006400',
          },
        },
      },
    };
  }

  //read emitted response
  getResponse(event: SimulationResponse) {
    this.simulationResponse = event;
    //set to chart data
    this.setChartData(event);
    //call method to get conclusion
    this.getConclusion();
  }
  //set chart data based on response
  setChartData(simulationResponse: SimulationResponse) {
    this.data = {
      labels: simulationResponse.gameWinningResponses.map((item) => item.label),
      datasets: [
        {
          data: simulationResponse.gameWinningResponses.map(
            (item) => item.value
          ),
          backgroundColor: ['#4B0082', '#006400'],
        },
      ],
    };
    //hide loading spinner
    if (this.simulationFormComponent) {
      this.simulationFormComponent.isLoading = false;
    }
  }
  //set conclusion
  getConclusion() {
    //get winning chances
    const winChance =
      this.simulationResponse.gameWinningResponses.find(
        (item) => item.label === 'Chances to win'
      )?.value ?? 0;
    //get losing chances
    const looseChance =
      this.simulationResponse.gameWinningResponses.find(
        (item) => item.label === 'Chances to loose'
      )?.value ?? 0;
    //check if winning chances are greater than losing chances and player has switched the door
    if (
      (this.simulationFormComponent?.isSwitched && winChance > looseChance) ||
      (!this.simulationFormComponent?.isSwitched && looseChance > winChance)
    ) {
      //set conclusion
      this.conclusionText =
        '**Conclusion : ' +
        'Chances of winning increase if the player changes the door.![with 2/3 probability for large number of simulations]**';
    }
  }
}
