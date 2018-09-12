import Home from './container/Home';
import ChangeLogs from './container/ChangeLogs';
import VIPGroups from './container/VIPGroups';
import Search from './container/Search';
import Notification from './container/Notification';
import AddNote from './container/AddNote';
import DetailNote from './container/DetailNote';

export default {
  home: {
    title: 'Note',
    Page: Home,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },
  addNote: {
    title: 'Add Note',
    Page: AddNote,
    headerType: 'home',
    footerType: 'none',
    cache: false
  },
  detailNote: {
    title: 'Details',
    Page: DetailNote,
    headerType: 'back',
    footerType: 'none',
    cache: false
  },
  changeLogs: {
    title: 'ChangeLogs',
    Page: ChangeLogs,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },
  vipGroups: {
    title: 'VIPGroups',
    Page: VIPGroups,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },
  search: {
    title: 'Search',
    Page: Search,
    headerType: 'back',
    footerType: 'none'
  },
  notification: {
    title: 'Notification',
    Page: Notification,
    headerType: 'back',
    footerType: 'none'
  },
  notFound: {
    title: 'home',
    Page: Home,
    headerType: 'none',
    footerType: 'none',
    cache: true
  }
};
