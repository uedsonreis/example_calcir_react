import React, { Component, ReactNode } from 'react';
import { Text } from 'native-base';

import { ResultScreenView } from './view';


export class ResultScreen extends Component<any, any> {

    static navigationOptions = () => {
        return {
            headerTitle: () => <Text>Resultado</Text>,
        };
    };

    constructor(props: any) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <ResultScreenView />
        );
    }

}