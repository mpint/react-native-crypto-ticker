import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { fetchExchangeRate } from '../requests';

class Ticker extends React.Component {
  constructor() {
    super();
    this.state = {
      change: 0,
      rates: {},
      err: null,
      autorefreshIntervalId: null
    };
  }

  componentWillMount = () => {
    this.getExchangeRate(this.props.symbol);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.autorefresh && !this.props.autorefresh) {
      const id = setInterval(
        () => this.getExchangeRate(this.props.symbol),
        this.props.refreshInterval
      );

      this.setState({ autorefreshIntervalId: id });
    } else if (!nextProps.autorefresh && this.props.autorefresh) {
      this.setState({ autorefreshIntervalId: null });
      clearInterval(this.state.autorefreshIntervalId);

    }
  }

  getExchangeRate = (currency) => {
    fetchExchangeRate(currency)
      .then(rates => this.updateTicker(rates, this.state.rates))
      .catch(err => this.setState({ err }))
  }

  updateTicker = (current, previous) => {
    const updatedChange = Number(current.usd) - Number(previous.usd);
    this.setState({
      rates: current,
      change: previous.usd ? this.state.change + updatedChange : 0
    });
  }

  render() {
    const renderChange = () => {
      const changeStyle = this.state.change >= 0 ? styles.upChange : styles.downChange;
      const formattedChange = (s) => ['$', s.slice(s[0] === '-' ? 1 : 0)].join('');
      return (
        <Text style={[styles.alignContent, changeStyle]}>
          {formattedChange(String(this.state.change.toFixed(2)))}
        </Text>
      );
    };

    const isRateDefined = () => !!Object.keys(this.state.rates).length;
    const formatRate = (currency, rate) => currency === 'btc' ? `1 BTC` : `${(rate * 1000).toFixed(2)} mBTC`;
    return (
      <TouchableHighlight
        style={[this.props.style, styles.container]}
        underlayColor="#f9f9f9"
        onLongPress={this.props.onLongPress}
        onPress={this.getExchangeRate.bind(null, this.props.symbol)}>
        <View style={styles.alignContent}>
          <Image source={this.props.image} style={styles.logo} />
          {isRateDefined() &&
            <View style={styles.alignContent}>
              <Text>
                {formatRate(this.props.symbol, this.state.rates.btc)}
              </Text>
              <Text>
                {`$${this.state.rates.usd}`}
              </Text>
              {renderChange()}
              {this.state.err &&
                <Text>
                  {this.state.err}
                </Text>
              }
            </View>
          }
        </View>
      </TouchableHighlight>
    );
  }
}

Ticker.propTypes = {
  symbol: PropTypes.string.isRequired,
  autorefresh: PropTypes.bool,
  refreshInterval: PropTypes.number,
};

Ticker.defaultProps = {
  refreshInterval: 60000
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minHeight: 120,
  },
  logo: {
    maxWidth: 40,
    maxHeight: 40,
  },
  alignContent: {
    alignItems: 'center',
  },
  upChange: {
    color: 'green',
  },
  downChange: {
    color: 'red',
  },
});

export default Ticker;