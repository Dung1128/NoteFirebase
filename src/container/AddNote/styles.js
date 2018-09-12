import material from '../../theme/variables/material';
import platform from '../../theme/variables/platform';

export default {
  Container: {
    padding: material.paddingNormal
  },
  textNormal: {
    fontSize: material.textNormal
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputTitle: {
    marginLeft: material.paddingSmall,
    fontSize: material.textNormal,
    borderBottomWidth: 1,
    borderBottomColor: material.colorBorder,
    width: '100%',
    paddingVertical: material.paddingSmall
  },
  viewNote: {
    marginVertical: material.paddingSmall
  },
  inputNote: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: material.colorBorder,
    width: '100%',
    height: 150,
    marginVertical: material.paddingSmall,
    padding: 10,
    alignItems: 'center',
    fontSize: 16,
    textAlignVertical: platform.alignText
  },
  btnAdd: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
};
