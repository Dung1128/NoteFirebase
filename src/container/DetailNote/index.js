import React from 'react';
import { Container, Content, Text } from 'native-base';
import styles from './styles';

export default class DetailNote extends React.PureComponent {
  render() {
    // console.log(this.props.route.params.data);
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.textTitle}>
            {this.props.route.params.data.data.name}
          </Text>
          <Text style={styles.textNormal}>
            {this.props.route.params.data.data.value}
          </Text>
          <Text style={{ ...styles.textDate, textAlign: 'right' }}>
            {this.props.route.params.data.data.date}
          </Text>
        </Content>
      </Container>
    );
  }
}
