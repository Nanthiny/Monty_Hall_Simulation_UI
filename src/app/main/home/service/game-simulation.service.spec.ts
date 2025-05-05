import { TestBed } from '@angular/core/testing';

import { GameSimulationService } from './game-simulation.service';

describe('GameSimulationService', () => {
  let service: GameSimulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSimulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
