const init = {
  dataNote: {
    key: '',
    data: {
      name: '',
      value: ''
    }
  },
  actionUpdate: false
};

export default (state = init, { type, payload }) => {
  switch (type) {
    case 'app/saveNote':
      return { ...state, dataNote: payload };
    case 'app/actionUpdate':
      return { ...state, actionUpdate: payload };
    default:
      return state;
  }
};
