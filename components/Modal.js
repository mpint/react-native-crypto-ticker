import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import ModalWrapper from 'react-native-modal-wrapper';

class Modal extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ModalWrapper
        containerStyle={{ flexDirection: 'row', alignItems: 'flex-end' }}
        onRequestClose={this.props.onClose}
        style={{ flex: 1 }}
        visible={true}>
        <View style={{ padding: 20 }}>
          {this.props.children}
        </View>
      </ModalWrapper>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
};


export default Modal;