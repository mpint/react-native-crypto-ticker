import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

class Button extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };
  }

  onPress = () => {
    this.setState({ active: !this.state.active });
    this.props.onPress();
  }

  render() {
    const buttonState = this.state.active ? styles.buttonActive : styles.buttonInactive;
    const buttonTextState = this.state.active ? styles.buttonTextActive : styles.buttonTextInactive;
    const buttonStyle = [
      this.props.style,
      styles.button,
      buttonState
    ];

    return (
      <TouchableHighlight
        onPress={this.onPress}
        underlayColor="white"
        activeOpacity={0.7}>
        <View style={buttonStyle}>
          <Text style={buttonTextState}>
            {this.props.label}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
};

Button.defaultProps = {
  label: 'Add text'
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#33AAFF',
    backgroundColor: '#33AAFF',
  },
  buttonActive: {
    backgroundColor: '#33AAFF',
  },
  buttonInactive: {
    backgroundColor: '#FFF',
  },
  buttonTextActive: {
    fontSize: 14,
    color: '#FFF',
  },
  buttonTextInactive: {
    fontSize: 14,
    color: '#33AAFF',
  }
});

export default Button;
