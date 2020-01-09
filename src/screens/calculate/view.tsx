import React, { ReactNode, Component } from 'react';
import { Button, Content, Input, Label, List, ListItem, Text, Container, Header, Body, Title } from 'native-base';

import { Pagador, Deducao } from '../../model';
import { CalculateActions } from './interface';
import tabelaIRPF from '../../model/tabela';
import styles from './styles';

export class HeaderView extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <Header style={styles.header}>
                <Body>
                    <Title style={styles.title}> Cálculo do IRPF </Title>
                </Body>
            </Header>
        );
    }
}

type State = { saude: Deducao, educacao: Deducao, demais: Deducao };
type Props = { pagador: Pagador, actions: CalculateActions };

export class CalculateScreenView extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        const saude = new Deducao();
        const educacao = new Deducao();
        educacao.teto = tabelaIRPF.tetoEducacao;
        const demais = new Deducao();

        this.props.pagador.pagou.push(educacao);
        this.props.pagador.pagou.push(saude);
        this.props.pagador.pagou.push(demais);

        this.state = { saude, educacao, demais };
    }

    public render(): ReactNode {
        const { pagador, actions } = this.props;
        return (
            <Container>
                <Content>

                    <List>
                        <ListItem>
                            <Label> Ganho Anual (R$): </Label>
                            <Input onChangeText={text => pagador.ganhoAnual = Number(text)} />
                        </ListItem>
                        <ListItem>
                            <Label> Deduções com Saúde (R$): </Label>
                            <Input onChangeText={text => this.state.saude.valor = Number(text)} />
                        </ListItem>
                        <ListItem>
                            <Label> Deduções com Educação (R$): </Label>
                            <Input onChangeText={text => this.state.educacao.valor = Number(text)} />
                        </ListItem>
                        <ListItem>
                            <Label> Demais Deduções (R$): </Label>
                            <Input onChangeText={text => this.state.demais.valor = Number(text)} />
                        </ListItem>
                    </List>
        
                    <Button onPress={() => actions.calculate()} style={styles.calculateButton} block>
                        <Text>Calcular</Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}