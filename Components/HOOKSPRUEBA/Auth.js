import React, { useContext } from 'react';
import { SafeAreaView, View,Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from './UI/Card';
import { AuthContext } from './Context/auth-context';

const Auth = props => {
    const authContext = useContext(AuthContext);
    const loginHandler = () => {
        authContext.login();
    };

    return(
        <SafeAreaView>
            <View>
                <Card>
                    <Text>You are not authenticated!</Text>
                    <Text>Please continue.</Text>
                    <TouchableOpacity
                        onPress={loginHandler}
                    >
                        <Text>
                            Log in
                        </Text>
                    </TouchableOpacity>
                </Card>
            </View>
        </SafeAreaView>
    )
}

export default Auth;