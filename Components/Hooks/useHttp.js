import React,{useState,useEffect} from 'react';
import database from '@react-native-firebase/database';

const useHttp = () => {
    const [users, setUsers] = useState([]);

    const valirdarCuenta = () => {
        console.log(users);
    }

    useEffect(() => {
        database()
            .ref('/users/')
            .once('value')
            .then(snapshot => {
                setUsers(snapshot.val());
            });
    }, []);

    return{
        valirdarCuenta
    }
}

export default useHttp;