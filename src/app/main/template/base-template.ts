import { MessageService } from "primeng/api";

export abstract class BaseTemplate{
  constructor( protected messageService: MessageService){

  }
 
   //display success/failure message
   show(severity: string,summary: string, message: string) {
    this.messageService.add({ severity: severity, summary: summary, detail:message });
}
}