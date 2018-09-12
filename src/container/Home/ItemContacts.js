import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import material from '../../theme/variables/material';
import { formatMarketCapVolumn, formatPrice } from '../../utils/common';

export default class extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;

    return (
      <View style={styles.rowItem}>
        <Text style={styles.textNormal}>
          {item.givenName} {item.familyName}
        </Text>
        <View>
          {item.phoneNumbers &&
            item.phoneNumbers.map(
              (item, index) => item && <Text key={index}>{item.number}</Text>
            )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingVertical: 10
  },
  textNormal: {
    fontWeight: 'bold'
  }
});
