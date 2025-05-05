import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SimulationResponse } from '../../models/interface/simulation-response';
import { GameSimulationService } from '../../home/service/game-simulation.service';
import { MessageService } from 'primeng/api';
import { SimulationRequest } from '../../models/interface/simulation-request';
import { BaseTemplate } from '../../template/base-template';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-simulation-form',
  templateUrl: './simulation-form.component.html',
  styleUrl: './simulation-form.component.scss',
})
export class SimulationFormComponent
  extends BaseTemplate
  implements OnInit, OnDestroy
{
  //initialize output data
  @Output() response = new EventEmitter<SimulationResponse>();
  //initialize numberofgames
  numberOfGames: number = 1;
  //initializee switched status
  public isSwitched: boolean = false;
  //initialize simulation response
  simulationResponse: SimulationResponse = {
    numberOfSimulations: 0,
    gameWinningResponses: [],
    winningPercentage: 0,
  };
  //initialize initial loading state
  isLoading: boolean = false;
  //set regex for non zero leading numbers
  nonZeroLeadingRegex = /^[1-9]\d*$/;
  //initialize destroy subject
  destroy$ = new Subject<void>();
  constructor(
    private gameService: GameSimulationService,
    messageService: MessageService
  ) {
    super(messageService);
  }

  ngOnInit(): void {}
  //handle click event of start game button
  startGame() {
    this.isLoading = true;
    this.getGameResult();
  }
  //handle to enter only numbers in input field
  allowOnlyNumbers(event: KeyboardEvent) {
    const char = event.key;
    // avoid '.', 'e', '-', '+', and non-numeric characters
    if (!/^[0-9]$/.test(char)) {
      event.preventDefault();
    }
  }
  //block paste string with non-numeric characters
  blockPastetext(event: ClipboardEvent) {
    const pasted = event.clipboardData?.getData('text');
    if (!/^\d+$/.test(pasted || '')) {
      event.preventDefault();
    }
  }
  //get result of game simulations
  getGameResult() {
    //initialize simulation request
    const req: SimulationRequest = {
      numberOfSimulations: this.numberOfGames,
      isSwitched: this.isSwitched,
    };
    //call game simulation service
    this.gameService
      .gameSimulation(req)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          //get simulation response
          this.simulationResponse = <SimulationResponse>data;
          //emit the response
          this.response.emit(this.simulationResponse);
        },
        error: (error) => {
          //display error message
          this.show('error', 'Error', error.error.message);
          this.isLoading = false;
        },
      });
  }
  //validate button to start simulator
  validateStartSimulatorButton() {
    return this.numberOfGames <= 0;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
