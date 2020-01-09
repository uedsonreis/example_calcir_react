import React, { Component, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreen from 'react-native-splash-screen';

import { CalculateScreen } from './src/screens/calculate';
import { ResultScreen } from './src/screens/result';

export default class App extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {
        SplashScreen.hide();
    }

    public render(): ReactNode {
        const salesOrderStack: any = createStackNavigator(
            { calculate: CalculateScreen, result: ResultScreen }
        );
        
        const AppContainer: any = createAppContainer(salesOrderStack);

        return ( <AppContainer /> );
    }
}