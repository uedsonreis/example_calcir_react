import { Deducao } from './deducao';

export class Pagador {

  public ganhoAnual: number;
  public cpf: string;
  public nome: string;
  public readonly pagou: Array<Deducao> = new Array<Deducao>();

  public totalAPagar: number;
  public valorFaixaIsento: number;
  public valorFaixa075: number = 0.0;
  public valorFaixa150: number = 0.0;
  public valorFaixa225: number = 0.0;
  public valorFaixa275: number = 0.0;

}