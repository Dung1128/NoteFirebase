import React from 'react';
import { TextInput, View, Alert } from 'react-native';
import { Container, Content, Text, Input, Button } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import * as commonActions from '../../store/actions/common';
import * as noteActions from '../../store/actions/note';
import * as noteSelector from '../../store/selectors/note';
import material from '../../theme/variables/material';
import { firebaseApp } from '../../firebaseConfig';
import styles from './styles';

@connect(
  state => ({
    getNote: noteSelector.getNote(state),
    getActionUpdate: noteSelector.getUpdate(state)
  }),
  { ...commonActions, ...noteActions }
)
export default class AddNote extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.getNote.data.name,
      value: this.props.getNote.data.value
    };
    this.database = firebaseApp.database();
    this.Note = this.database.ref('note').child('dataNote');
  }

  submit() {
    if (this.state.name.toString() === '') {
      return Alert.alert('Notification', 'Name is not empty!');
    }

    this.Note.push({
      name: this.state.name,
      value: this.state.value,
      date: moment(new Date()).format('DD-MM-YYYY HH:mm')
    });
    this.props.saveNote({
      key: '',
      data: {
        name: '',
        date: '',
        value: ''
      }
    });

    this.setState({
      name: '',
      value:''
    })
  }

  _edit() {
    const data = {
      name: this.state.name,
      value: this.state.value,
      date: moment(new Date()).format('DD-MM-YYYY HH:mm')
    };
    this.Note.child(this.props.getNote.key).update(data);
    this.props.resetTo('home');
    this.props.saveNote({
      key: '',
      data: {
        name: '',
        date: '',
        value: ''
      }
    });
    this.props.actionUpdate(false);
  }

  render() {
    console.log('this.props.getNote', this.props.getNote);
    return (
      <Container style={styles.Container}>
        <Content>
          <View style={styles.titleView}>
            <Text style={styles.textNormal}>Title :</Text>
            <TextInput
              onChangeText={val => this.setState({ name: val })}
              underlineColorAndroid="transparent"
              value={this.state.name}
              style={styles.inputTitle}
              placeholder="Title"
            />
          </View>
          <View style={styles.viewNote}>
            <Text style={styles.textNormal}>Note :</Text>
            <TextInput
              onChangeText={val => this.setState({ value: val })}
              multiline
              value={this.state.value}
              underlineColorAndroid="transparent"
              style={styles.inputNote}
              placeholder="Title"
            />
          </View>
          {this.props.getActionUpdate ? (
            <Button
              onPress={() => {
                this._edit();
              }}
              style={styles.btnAdd}
            >
              <Text>Update</Text>
            </Button>
          ) : (
            <Button onPress={() => this.submit()} style={styles.btnAdd}>
              <Text>Add</Text>
            </Button>
          )}
        </Content>
      </Container>
    );
  }
}
