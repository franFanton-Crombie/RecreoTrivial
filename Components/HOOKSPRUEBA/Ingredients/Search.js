import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View,TextInput , StyleSheet ,Text } from 'react-native';
import Card from '../UI/Card';

const Search = (props) => {
    const [search , setSearch] = useState('');
    const { onLoadedIngredients } = props;

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const query = search.length === 0 
                ? ''
                : `?orderBy="name"&equalTo="${search}"`;
            fetch('https://react-hooks-update-2a961-default-rtdb.firebaseio.com/ingredients.json' + query)
            .then(response => response.json()
            ).then(responseData => {
                
                const loadedIngredients = [];
                for(const key in responseData){
                    loadedIngredients.push({
                        id: key,
                        name: responseData[key].name,
                        amount: responseData[key].amount
                    });
                }
                onLoadedIngredients(loadedIngredients);
            });
        },500);

        return () => clearTimeout(timeoutId);
    }, [search, onLoadedIngredients]);
    return(
        <Card>
            <View style={styles.container}>
                <Text style={styles.searchText}>
                    Search
                </Text>
                <TextInput
                    style={styles.search} 
                    value={search}
                    onChangeText={setSearch}/>
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
        flexDirection: 'row'
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