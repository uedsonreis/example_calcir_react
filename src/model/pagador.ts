import { Deducao } from './deducao';

export class Pagador {

  public ganhoAnual: number;
  public cpf: string;
  public nome: string;
  public readonly pagou: Array<Deducao> = new Array<Deducao>();

  public totalAPagar: number;
  public valorFaixaIsento: number;
  public valorFaixa075: number;
  public valorFaixa150: number;
  public valorFaixa225: number;
  public valorFaixa275: number;

}