import React, { Component, ReactNode } from 'react';

import { ResultScreenView, HeaderView } from './view';
import { Pagador, Tabela } from '../../model';
import { ResultActions } from './interface';
import tabelaIRPF from '../../model/tabela';

type State = { pagador: Pagador, tabela: Tabela };

export class ResultScreen extends Component<any, any> implements ResultActions {

    constructor(props: any) {
        super(props);
        
        const pagador = this.props.navigation.state.params.pagador;
        tabelaIRPF.calcularIRPF(pagador);

        this.state = {
            pagador,
            tabela: tabelaIRPF
        };
    }

    public tetoFaixa075(): string {
		return (this.state.tabela.faixaIsento + this.state.tabela.faixa075).toFixed(2);
	}

	public tetoFaixa150(): string {
		return (this.state.tabela.faixaIsento + this.state.tabela.faixa075 + this.state.tabela.faixa150).toFixed(2);
	}

	public tetoFaixa225(): string {
		return (this.state.tabela.faixaIsento + this.state.tabela.faixa075 + this.state.tabela.faixa150 + this.state.tabela.faixa225).toFixed(2);
    }

    static navigationOptions = ({ navigation }) => {
        return { header: () => <HeaderView navigation={navigation} /> };
    };

    public render(): ReactNode {
        return (
            <ResultScreenView pagador={this.state.pagador} tabela={this.state.tabela} actions={this} />
        );
    }

}