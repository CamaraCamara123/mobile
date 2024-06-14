import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import Images from "../constants/Images";
import { fetchModule } from './fetchElement/fetchData';
import { useUserData } from '../contexts/useUserData';



const Card = (props) => {

  const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = props;

  const imageStyles = [
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle
  ];
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [styles.imageContainer,
  horizontal ? styles.horizontalStyles : styles.verticalStyles,
  styles.shadow
  ];

  const { userData, updateModule, path } = useUserData()

  const fcapture = (module_id) => {
    fetchModule(path, module_id, updateModule);
    navigation.navigate("capture");
  }

  return (
    <Block row={horizontal} card flex style={cardContainer}>
      <TouchableWithoutFeedback onPress={() => fcapture(item._id)}>
        <Block flex style={imgContainer}>
          <Image source={Images.rdvImage} style={imageStyles} />
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => fcapture(item._id)}>
        <Block flex space="between" style={styles.cardDescription}>
          <Text size={14} style={styles.cardTitle}>Module : {item.intituleModule}</Text>
          <Text size={14} style={styles.cardTitle}>Niveau : {item.filiereSemestre.semestre.s} {item.filiereSemestre.filiere.libelle}</Text>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
}


Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Card);