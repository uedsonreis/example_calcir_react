import { Pagador } from './pagador';
import { Deducao } from './deducao';

export class Tabela {

    public static readonly taxaPadraoINSS = 0.11;
    public static readonly inssLimite1 = 1751.81 * 13; //1659.38 * 13;
    public static readonly inssLimite2 = 2919.72 * 13; //2765.66 * 13;
    public static readonly inssLimite3 = 5839.45 * 13; //5531.31 * 13;

    public static readonly INSS: number = 0.11;
    public static readonly P075: number = 0.075;
    public static readonly P150: number = 0.150;
    public static readonly P225: number = 0.225;
    public static readonly P275: number = 0.275;

    public anoExercicio: number = 2019;
    public faixaIsento: number = 22847.76;
    public faixa075: number = 11072.04; // 22.847,76 - 33.919,80
    public faixa150: number = 11092.80; // 33.919,80 - 45.012,60
    public faixa225: number = 10963.56; // 45.012,60 - 55.976,16
    public tetoEducacao: number = 3561.50;

    public recebeuDe: Pagador[];

    public getTetoPGBL(pagador: Pagador): number {
        return pagador.ganhoAnual * 0.12;
    }

    private calcularINSS(pagador: Pagador): number {
        var taxa: number = Tabela.taxaPadraoINSS;

        if (pagador.ganhoAnual <= Tabela.inssLimite1) {
            taxa = 0.08;
        } else if (pagador.ganhoAnual <= Tabela.inssLimite2) {
            taxa = 0.09;
        }

        if (pagador.ganhoAnual > Tabela.inssLimite3) {
            return (Tabela.inssLimite3 * taxa);
        } else {
            return (pagador.ganhoAnual * taxa);
        }
    }

    private dedutivo(deducao: Deducao): number {
        if (deducao.teto != null && deducao.teto < deducao.valor) {
            return deducao.teto;
        } else {
            return deducao.valor;
        }
    }

    public calcularIRPF(pagador: Pagador): void {
        var totalAPagar: number = 0.0;
        var valorBase: number = pagador.ganhoAnual - this.calcularINSS(pagador);

        pagador.pagou.forEach(deducao => {
            valorBase = valorBase - this.dedutivo(deducao);
        });

        if (valorBase <= this.faixaIsento) {
            pagador.valorFaixaIsento = valorBase;
        } else {
            pagador.valorFaixaIsento = this.faixaIsento;
            valorBase = valorBase - this.faixaIsento;

            if (valorBase <= this.faixa075) {
                pagador.valorFaixa075 = valorBase;
                totalAPagar = valorBase * Tabela.P075;
            } else {
                pagador.valorFaixa075 = this.faixa075;
                totalAPagar = totalAPagar + this.faixa075 * Tabela.P075;
                valorBase = valorBase - this.faixa075;

                if (valorBase <= this.faixa150) {
                    pagador.valorFaixa150 = valorBase;
                    totalAPagar = totalAPagar + valorBase * Tabela.P150;
                } else {
                    pagador.valorFaixa150 = this.faixa150;
                    totalAPagar = totalAPagar + this.faixa150 * Tabela.P150;
                    valorBase = valorBase - this.faixa150;

                    if (valorBase <= this.faixa225) {
                        pagador.valorFaixa225 = valorBase;
                        totalAPagar = totalAPagar + valorBase * Tabela.P225;
                    } else {
                        pagador.valorFaixa225 = this.faixa225;
                        totalAPagar = totalAPagar + this.faixa225 * Tabela.P225;
                        valorBase = valorBase - this.faixa225;

                        pagador.valorFaixa275 = valorBase;
                        totalAPagar = totalAPagar + valorBase * Tabela.P275;
                    }
                }
            }
        }

        pagador.totalAPagar = totalAPagar;
        this.adicionar(pagador);
    }

    public adicionar(pagador: Pagador): boolean {
        var index: number = this.recebeuDe.indexOf(pagador);
        if (index > -1) {
            return false;
        } else {
            this.recebeuDe.push(pagador);
            return true;
        }
    }

    public remover(pagador: Pagador): boolean {
        var index: number = this.recebeuDe.indexOf(pagador);
        if (index > -1) {
            this.recebeuDe.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }
}

export default new Tabela();