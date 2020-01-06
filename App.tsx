import React, { Component, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { CalculateScreen } from './src/screens/calculate';
import { ResultScreen } from './src/screens/result';

export default class App extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = { isReady: false };
    }

    async componentDidMount() {
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        this.setState({ isReady: true });
    }

    public render(): ReactNode {
        if (!this.state.isReady) return <AppLoading />;
        
        const salesOrderStack: any = createStackNavigator(
            { calculate: CalculateScreen, result: ResultScreen }
        );
        
        const AppContainer: any = createAppContainer(salesOrderStack);

        return ( <AppContainer /> );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});