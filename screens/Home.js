import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from '../components';
import { useUserData } from '../contexts/useUserData';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');

const Home = () => {
  const { modules } = useUserData()
  const [searchValue, setSearchValue] = useState('');

  const filteredfiliereSemestres = modules.filter((elt) => {
    return (
      elt.filiere.intituleModule.toLowerCase().includes(searchValue.toLowerCase())
    );
  });
  const renderfiliereSemestres = () => {
    return (
      <Block flex center style={styles.home}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Chercher par module"
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
          contentContainerStyle={styles.filiereSemestres}>
          <Block flex>
            {modules &&
              modules.map((m, index) => (
                <Block key={index}>
                  <Card item={m} horizontal />
                </Block>
              ))}
          </Block>
        </ScrollView>
      </Block>
    )
  }

  return (
    <Block flex center style={styles.home}>
      {renderfiliereSemestres()}
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  filiereSemestres: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  searchContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray', // Couleur de fond du champ de recherche
    borderRadius: 15,

  },
  header: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
});

export default Home;
