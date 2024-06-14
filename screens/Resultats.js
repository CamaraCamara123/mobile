import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUserData } from '../contexts/useUserData';
import { View, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../contexts/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CardEtudiant from '../components/CardEtudiant';



const { width } = Dimensions.get('screen');

const Resultats = ({ navigation }) => {
    const { updateEtudiant,updateEtudiants,etudiants, path } = useUserData()
    const [searchValue, setSearchValue] = useState('');
    const { logout } = useAuth()

    useEffect(() => {
        const fetchUserData = async () => {
            const token = await AsyncStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const response = await axios.get(`${path}/etudiants`);
                if (response.status == 200) {
                    updateEtudiants(response.data);
                }
            } catch (error) {
                logout();
                navigation.navigate("Login");
            }
        };
        fetchUserData();

    }, []);

    const filteredEtudiants = etudiants.filter((etudiant) => {
        return (
            etudiant.cne.toLowerCase().includes(searchValue.toLowerCase()) ||
            etudiant.username.toLowerCase().includes(searchValue.toLowerCase())
        );
    });

    const addNote = () => {
        navigation.navigate("Capture")
    }
    const renderetudiants = () => {
        return (
            <Block flex center style={styles.home}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>etudiants</Text>
                    </View>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Chercher par CNE ou username"
                            value={searchValue}
                            onChangeText={(text) => setSearchValue(text)}
                        />
                        <Icon
                            name="search"
                            size={20}
                            style={styles.searchIcon}
                        />
                    </View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.etudiants}>
                    <Block flex>
                        {etudiants &&
                            filteredEtudiants.map((etu, index) => (
                                <Block key={index}>
                                    <CardEtudiant item={etu} horizontal />
                                </Block>
                            ))}
                    </Block>
                </ScrollView>
                <View style={styles.addContainer}>
                    <TouchableOpacity onPress={addNote}>
                        <Icon
                            name="plus"
                            size={40}
                            style={styles.addIcon}
                            color="green"
                        />
                    </TouchableOpacity>
                </View>
            </Block>
        )
    }

    return (
        <Block flex center style={styles.home}>
            {renderetudiants()}
        </Block>
    );
}

const styles = StyleSheet.create({
    home: {
        width: width,
    },
    etudiants: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE,
    },
    searchContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 50,


    },
    header: {
        backgroundColor: "#00BFFF",
        padding: 10,
        elevation: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        maxHeight: 150,
        paddingTop: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,


    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        width: 350,
        borderRadius: 15,
        backgroundColor: 'white'
    },
    searchIcon: {
        marginRight: 5,
        marginLeft: 5
    },
    addIcon: {
        alignSelf: 'flex-end',
    },
    addContainer: {
        alignItems: 'center'
    },
    titleContainer: {
        justifyContent: 'center',
        textAlign: 'center'
    },
    title: {
        fontSize: 40,
        alignSelf: 'center',
        fontWeight: '900',
        color: 'white'
    }
});

export default Resultats;
