import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View,TextInput , StyleSheet ,Text } from 'react-native';
import useHttp from '../Hooks/useHttp';
import Card from '../UI/Card';

const Search = (props) => {
    const [search , setSearch] = useState('');
    const { onLoadedIngredients } = props;
    const { isLoading , data , error , sendRequest , clear } = useHttp();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const query = search.length === 0 
                ? ''
                : `?orderBy="name"&equalTo="${search}"`;
            sendRequest('https://react-hooks-update-2a961-default-rtdb.firebaseio.com/ingredients.json' + query, 'GET');
        },500);

        return () => clearTimeout(timeoutId);
    }, [search, onLoadedIngredients,sendRequest]);

    useEffect(() => {
        if(!isLoading && !error && data){ 
                const loadedIngredients = [];
                for(const key in data){
                    loadedIngredients.push({
                        id: key,
                        name: data[key].name,
                        amount: data[key].amount
                    });
                }
                onLoadedIngredients(loadedIngredients);
        }
    },[data,isLoading,error,onLoadedIngredients]);
    return(
        <Card>
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                <Text style={styles.searchText}>
                    Search
                </Text>
                <TextInput
                    style={styles.search} 
                    value={search}
                    onChangeText={setSearch}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    {isLoading && <Text>Loading...</Text>}
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#5885FD',
        flexDirection: 'column'
    },
    search: {
        marginLeft: 10,
        backgroundColor:'white',
        padding: 5,
        borderRadius: 10,
        width: 300
    },
    searchText: {
        fontSize: 15,
        marginTop: 5,
    }
});

export default Search;