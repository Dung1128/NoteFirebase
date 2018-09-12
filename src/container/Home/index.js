import { unionBy } from 'lodash';
import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  RefreshControl,
  ListView
} from 'react-native';
import _ from 'lodash';
import {
  Container,
  Spinner,
  Card,
  Fab,
  Button,
  Icon,
  List,
  ListItem,
  SwipeRow
} from 'native-base';
import Contacts from 'react-native-contacts';
import moment from 'moment';
import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';
import * as noteActions from '../../store/actions/note';
import Item from './Item';
import ItemContacts from './ItemContacts';
import Preload from '../Preload';
import material from '../../theme/variables/material';
import { firebaseApp } from '../../firebaseConfig';
import styles from './styles';

@connect(
  null,
  { ...commonActions, ...noteActions }
)
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      hasMore: true,
      paginate: 20,
      start: 0,
      dataSource: [],
      loadingSpiner: false,
      active: true
    };
    this.database = firebaseApp.database();
    this.Note = this.database.ref('note').child('dataNote');
  }

  componentDidMount() {
    // this.database.ref('note').on('value', snap => {
    //   let items = [];
    //   snap.forEach(data => {
    //     items.push({
    //       key: data.key,
    //       data: data.val()
    //     });
    //   });

    //   this.setState({
    //     dataSource: items
    //   });
    // });

    this.database
      .ref('note')
      .child('dataNote')
      .on('value', dataSnapshot => {
        let items = [];
        dataSnapshot.forEach(data => {
          items.push({
            key: data.key,
            data: data.val()
          });
        });
        this.setState({
          dataSource: _.reverse(items)
        });
      });
  }

  renderItem(item) {
    return (
      <SwipeRow
        style={styles.swipe}
        right={
          <Button
            style={{ marginTop: 5 }}
            danger
            onPress={() => this.deleteRow(item)}
          >
            <Icon active name="trash" />
          </Button>
        }
        rightOpenValue={-75}
        body={
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              this.props.forwardTo('detailNote', { data: item });
              this.props.saveNote(item);
            }}
          >
            <Card style={styles.card}>
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {item.data.name}
              </Text>
              {item.data.value && (
                <Text style={styles.textNormal} numberOfLines={2}>
                  {item.data.value}
                </Text>
              )}
              <Text style={styles.textDate}>{item.data.date}</Text>
            </Card>
          </TouchableOpacity>
        }
      />
    );
  }

  deleteRow(data) {
    this.Note.child(data.key).remove();
  }

  render() {
    const { data, loading } = this.state;
    if (loading) {
      return <Preload />;
    }

    console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
    return (
      <Container style={styles.container}>
        {this.state.dataSource.length !== 0 && (
          <FlatList
            style={styles.listView}
            data={this.state.dataSource}
            keyExtractor={(item, index) => index + '.'}
            renderItem={({ item }) => this.renderItem(item)}
          />
        )}

        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.props.forwardTo('addNote')}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}
