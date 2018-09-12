import material from '../../theme/variables/material';

export default {
  container: {
    paddingTop: material.paddingSmall
    // paddingHorizontal: material.paddingNormal
  },
  card: {
    padding: material.paddingSmall,
    width: material.deviceWidth - 32,
    marginTop: 0,
    marginBottom: 0,
    height: 88
  },
  listView: {
    paddingHorizontal: material.paddingNormal
  },
  textNormal: {
    fontSize: material.textNormal
  },
  get textDate() {
    return {
      ...this.textNormal,
      fontSize: material.textTiny,
      textAlign: 'right'
    };
  },
  swipe: {
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 5
  }
};
