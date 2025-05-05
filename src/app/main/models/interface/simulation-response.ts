export interface SimulationResponse {
  numberOfSimulations: number;
  gameWinningResponses: GameWinningResponses[];
  winningPercentage:number;
}
export interface GameWinningResponses{
  label:string;
  value:number;
}
