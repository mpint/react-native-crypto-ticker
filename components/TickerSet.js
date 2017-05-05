import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import Ticker from './Ticker';

class TickerSet extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  render() {
    return (
      <View style={this.props.style}>
        <View style={styles.instructions}>
          <Text style={styles.instructionsText}>
            press to refresh, long press to get news
          </Text>
          <Text style={styles.instructionsText}>
            (data takes a few minutes to refresh)
          </Text>
        </View>
        <View style={styles.tickers}>
          {this.props.currencies.map((c, i) => (
            <Ticker
              key={i}
              style={styles.ticker}
              symbol={c.symbol}
              image={c.image}
              autorefresh={this.props.autorefresh}
              refreshInterval={this.props.refreshInterval}
              onLongPress={this.props.onTickerLongPress.bind(null, c)} />)
          )}
        </View>
      </View>
    );
  }
}

TickerSet.propTypes = {
  onTickerLongPress: PropTypes.func,
  currencies: PropTypes.array,
  autorefresh: PropTypes.bool,
  refreshInterval: PropTypes.number,
};

const styles = StyleSheet.create({
  instructions: {
    marginBottom: 20,
    alignItems: 'center',
  },
  instructionsText: {
    color: '#999',
  },
  tickers: {
    flexDirection: 'row',
  },
  ticker: {
    flex: 1,
    alignItems: 'center',
  }
});

export default TickerSet;