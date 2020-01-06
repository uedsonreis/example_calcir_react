import React, { ReactNode, Component } from 'react';
import { Button, Content, Input, Label, List, ListItem, Text, Container, Header, Body, Title } from 'native-base';

import { Pagador, Deducao } from '../../model';
import tabelaIRPF from '../../model/tabela';
import styles from './styles';

type State = { saude: Deducao, educacao: Deducao, demais: Deducao };
type Props = { pagador: Pagador, actions: any };

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

        this.setState({ saude, educacao, demais });
    }

    public render(): ReactNode {
        const { pagador, actions } = this.props;
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem>
                            <Label><Text> Ganho Anual: </Text></Label>
                            <Input onChangeText={text => pagador.ganhoAnual = Number(text)} />
                        </ListItem>
                        <ListItem>
                            <Label><Text> Deduções com Saúde: </Text></Label>
                            <Input onChangeText={text => this.state.saude.valor = Number(text)} />
                        </ListItem>
                        <ListItem>
                            <Label><Text> Deduções com Educação: </Text></Label>
                            <Input onChangeText={text => this.state.educacao.valor = Number(text)} />
                        </ListItem>
                        <ListItem>
                            <Label><Text> Demais Deduções: </Text></Label>
                            <Input onChangeText={text => this.state.demais.valor = Number(text)} />
                        </ListItem>
                    </List>
        
                    <Button onPress={() => actions.login()} style={styles.calculateButton} block>
                        <Text>Calcular</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}