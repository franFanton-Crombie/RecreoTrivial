import React, { useContext } from 'react';
import Ingredients from './Ingredients/index';
import {SafeAreaView} from 'react-native';
import Auth from './Auth';
import AuthContextProvider from './Context/auth-context';
import {AuthContext} from './Context/auth-context';

const Index = () => {
    const authContext = useContext(AuthContext);
    let content = <Auth />
    if (!authContext.isAuth){
        content = <Ingredients/>
    }
    return (
        <AuthContextProvider>
            <SafeAreaView style={{flex: 1}}>
                {content}
            </SafeAreaView>
        </AuthContextProvider>
    )
};

export default Index;
