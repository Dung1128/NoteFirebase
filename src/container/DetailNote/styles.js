import material from '../../theme/variables/material';

export default {
  textNormal: {
    fontSize: material.textNormal
  },
  textDate: {
    fontSize: material.textTiny
  },
  container: {
    paddingHorizontal: material.paddingNormal,
    paddingVertical: material.paddingSmall
  },
  get textTitle() {
    return {
      ...this.textNormal,
      fontWeight: 'bold',
      fontSize: material.textTitle
    };
  }
};
