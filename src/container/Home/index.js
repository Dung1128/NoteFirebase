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
  ListView,
  Alert
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
      active: true,
      flat: null,
      endPage: false
    };
    this.database = firebaseApp.database();

    this.offset = 1;
    this.isMoving = false;
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    console.log('this.state.flat', this.state.flat);
    this.state.flat
      ? (this.Note = this.database
          .ref('note')
          .child('dataNote')
          .orderByKey()
          .endAt(this.state.flat.toString())
          .limitToLast(8))
      : (this.Note = this.database
          .ref('note')
          .child('dataNote')
          .orderByKey()
          .limitToLast(8));

    // this.Note = this.database
    //   .ref('note')
    //   .child('dataNote')
    //   .orderByKey()
    //   .limitToFirst(8);

    !this.state.endPage &&
      this.Note.on('value', dataSnapshot => {
        let items = [];
        dataSnapshot.forEach(data => {
          items.push({
            key: data.key,
            data: data.val()
          });
        });

        this.setState(
          {
            loadingMore: false,
            flat: items.length > 0 && items[0].key
          },
          () => {
            // items.pop();
            console.log(items.length);

            items.length > 7
              ? items.reverse().pop()
              : this.setState({ endPage: true });
            items.length < 7 && items.reverse();

            this.setState(
              {
                dataSource: [...this.state.dataSource, ...items]
              },
              () => console.log('this.state.dataSource', this.state.dataSource)
            );
          }
        );
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
    Alert.alert('Notifications', 'Do you want delete note?', [
      {
        text: 'No',
        onPress: () => console.log('no')
      },
      {
        text: 'Yes',
        onPress: () => this.Note.child(data.key).remove()
      }
    ]);
  }

  refreshList() {
    this.setState(
      {
        isRefreshing: false,
        start: 0
      },
      () => this.getList()
    );
  }

  renderFooter() {
    if (this.state.loadingMore) {
      return (
        // <View style={styles.footerList}>
        <Spinner size="small" color={material.primaryColor} />
        // </View>
      );
    }
    return <View style={{ paddingVertical: 0 }} />;
  }

  onEndReached() {
    this.setState({ loadingMore: true }, () => this.getList());
  }

  render() {
    const { data, loading } = this.state;
    if (loading) {
      return <Preload />;
    }

    return (
      <Container style={styles.container}>
        {this.state.dataSource.length !== 0 && (
          <FlatList
            style={styles.listView}
            data={this.state.dataSource}
            keyExtractor={(item, index) => index + '.'}
            renderItem={({ item }) => this.renderItem(item)}
            // load
            onEndReached={() => this.onEndReached()}
            onEndReachedThreshold={material.platform === 'ios' ? 0 : 1}
            onMomentumScrollBegin={() => {
              this.isMoving = true;
              this.onEndReachedCalledDuringMomentum = false;
              this.setState({ loadingMore: false });
            }}
            onMomentumScrollEnd={() => (this.isMoving = false)}
            shouldRasterizeIOS={this.isMoving}
            renderToHardwareTextureAndroid={this.isMoving}
            ListFooterComponent={this.renderFooter.bind(this)}
            refreshControl={
              <RefreshControl
                tintColor={material.primaryColor}
                refreshing={this.state.isRefreshing}
                onRefresh={this.refreshList.bind(this)}
              />
            }
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
