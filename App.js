import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TickerSet from './components/TickerSet';
import Button from './components/Button';
import Modal from './components/Modal';
import News from './components/News';

import btcImg from './assets/btc.png';
import ltcImg from './assets/ltc.png';
import ethImg from './assets/eth.png';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currencyList: [
        { symbol: 'btc', image: btcImg },
        { symbol: 'ltc', image: ltcImg },
        { symbol: 'eth', image: ethImg }
      ],
      showModal: false,
      autorefreshTickerSet: false,
      autorefreshTickerInterval: 90000,
      selectedCurrency: {},
      refreshTicker: null,
      refreshTickerId: '',
    };
  }



  toggleAutorefresh = () => {
    if (this.state.autorefreshTickerSet) {
      clearInterval(this.state.refreshTickerId);
      this.setState({
        autorefreshTickerSet: false,
        refreshTicker: null,
      });

    } else {
      const id = setInterval(() => {
        this.setState({
          refreshTicker: this.state.refreshTicker !== 0 ? this.state.refreshTicker - 1 : this.state.autorefreshTickerInterval / 1000
        });
      }, 1000);

      this.setState({
        autorefreshTickerSet: true,
        refreshTickerId: id,
        refreshTicker: this.state.autorefreshTickerInterval / 1000,
      });
    }

  }

  updateModal = (isVisible, currency) => {
    this.setState({
      showModal: isVisible,
      selectedCurrency: currency,
    });
  }

  onTickerLongPress = (currency) => {
    this.updateModal(true, currency);
  }

  render() {
    const refreshLabel = (count) => `${count || ''} auto refresh`;
    return (
      <View style={styles.container}>
        {this.state.showModal &&
          <Modal
            onClose={this.updateModal.bind(null, false, '', this.state.selectedCurrency)}>
            <News
              symbol={this.state.selectedCurrency.symbol}
              image={this.state.selectedCurrency.image}
            />
          </Modal>
        }

        <TickerSet
          style={styles.tickerSet}
          currencies={this.state.currencyList}
          onTickerLongPress={this.onTickerLongPress}
          autorefresh={this.state.autorefreshTickerSet}
          refreshInterval={this.state.autorefreshTickerInterval} />

        <Button
          label={refreshLabel(this.state.refreshTicker)}
          onPress={this.toggleAutorefresh} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tickerSet: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default App;