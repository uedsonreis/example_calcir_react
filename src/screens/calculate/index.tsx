import React, { Component, ReactNode } from 'react';
import { Header, Title, Body, Container } from 'native-base';

import { Pagador } from '../../model';
import { CalculateScreenView } from './view';

type State = { pagador: Pagador };

export class CalculateScreen extends Component<any, State> {

    static navigationOptions = () => {
        return {
            header: () => (
                <Header >
                    <Body>
                        <Title> Cálculo do IRPF </Title>
                    </Body>
                </Header>
            ),
        };
    };

    constructor(props: any) {
        super(props);

        this.state = { pagador: new Pagador() };
    }

    public calculate(): void {
        if ((this.state.pagador.ganhoAnual === undefined) || (this.state.pagador.ganhoAnual <= 0)) {
            this.state.pagador.ganhoAnual = 0.00;
        }

        this.state.pagador.pagou.forEach(deducao => {
            if ((deducao.valor === undefined) || (deducao.valor <= 0)) {
                deducao.valor = 0.00;
            }
        });

        this.props.navigation.navigate('result', { pagador: this.state.pagador});
    }

    public render(): ReactNode {
        return (
            <CalculateScreenView pagador={this.state.pagador} actions={this} />
        );
    }

}