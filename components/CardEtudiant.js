import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { argonTheme } from '../constants';
import { useUserData } from '../contexts/useUserData';
import { fetchDiagnostic } from './fetchElement/fetchDiagnostics';

const CardEtudiant = (props) => {

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

  const { path } = useUserData();

  const fdetails = async (diagnostic_id) => {
    
    // navigation.navigate('details_diagnostic')

  }

  return (
    <Block row={horizontal} card flex style={cardContainer}>
      <TouchableWithoutFeedback onPress={() => fdetails(item.id)}>
        <Block flex style={imgContainer}>
          {/* <Image
            source={{ uri: `${path}/uploads/${item.imagePath}` }}
            style={imageStyles}
            onError={(e) => {
              console.error("Erreur de chargement de l'image : ", e.nativeEvent.error);
              // Affichez une image de secours ou un message d'erreur ici
            }}
          /> */}

        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => fdetails(item.id)}>
        <Block flex space="between" style={styles.cardDescription}>
          <Text size={14} style={styles.cardTitle}>Nom : {item.firstName}</Text>
          <Text size={14} style={styles.cardTitle}>Prenom : {item.lastName}</Text>
          <Text size={14} style={styles.cardTitle}>CNE : {item.cne}</Text>
          {/* <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold> Hour : {
            `${new Date(item.dateDiagnostic).getHours()}:${String(new Date(item.dateDiagnostic).getMinutes()).padStart(2, '0')}`
          }</Text> */}
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
}


CardEtudiant.propTypes = {
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

export default withNavigation(CardEtudiant);