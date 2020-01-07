import React, { ReactNode, Component } from "react";
import { Button, Icon, Header, Body, Title, Left, Right, Container, Content, Card, CardItem, Text } from 'native-base';

import styles from './styles';
import { ResultActions } from "./interface";
import { Pagador, Tabela } from "../../model";

export class HeaderView extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render(): ReactNode {
        const { navigation } = this.props;
        return (
            <Header style={styles.header}>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                
                <Body>
                    <Title> Resultado </Title>
                </Body>
                
                <Right />
            </Header>
        );
    }
}

type Props = { pagador: Pagador, tabela: Tabela, actions: ResultActions };

export class ResultScreenView extends Component<Props, any> {

    constructor(props: Props) {
        super(props);
    }

    public render(): ReactNode {
        const { pagador, tabela, actions } = this.props;

        return (
            <Container>
                <Content>

                    <Card>
                        <CardItem header>
                            <Body>
                                <Text> <b>Total de Imposto a Pagar</b> </Text>
                            </Body>
                        </CardItem>
                        
                        <CardItem>
                            <Body>
                                <Text> <b>R$ {pagador.totalAPagar.toFixed(2)}</b> </Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                            <Body>
                                <Text>Faixa até R$ {tabela.faixaIsento.toFixed(2)} (Isento)</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text> R$ {pagador.valorFaixaIsento.toFixed(2)} * 0% = R$ 0.00 </Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                            <Body>
                                <Text> Faixa entre R$ {tabela.faixaIsento.toFixed(2)} e R$ {actions.tetoFaixa075()} </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text> R$ {pagador.valorFaixa075.toFixed(2)} * 7.5% = R$ {(pagador.valorFaixa075 * 0.075).toFixed(2)} </Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                            <Body>
                                <Text> Faixa entre R$ {actions.tetoFaixa075()} e R$ {actions.tetoFaixa150()} </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text> R$ {pagador.valorFaixa150.toFixed(2)} * 15% = R$ {(pagador.valorFaixa150 * 0.15).toFixed(2)} </Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                            <Body>
                                <Text> Faixa entre R$ {actions.tetoFaixa150()} e R$ {actions.tetoFaixa225()} </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text> R$ {pagador.valorFaixa225.toFixed(2)} * 22.5% = R$ {(pagador.valorFaixa225 * 0.225).toFixed(2)} </Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                            <Body>
                                <Text> Faixa acima de R$ {actions.tetoFaixa225()} </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text> R$ {pagador.valorFaixa275.toFixed(2)} * 27.5% = R$ {(pagador.valorFaixa275 * 0.275).toFixed(2)} </Text>
                            </Body>
                        </CardItem>
                    </Card>

                </Content>
            </Container>
        );
    }
}