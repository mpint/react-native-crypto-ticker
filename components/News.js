import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Linking, ScrollView, Image } from 'react-native';
import { fetchRedditPosts, cryptoSymbolToName } from '../requests';

class News extends React.Component {
  constructor() {
    super();
    this.state = {
      newsList: []
    };
  }

  componentWillMount = () => {
    this.getNews(this.props.symbol);
  }

  getNews = (currency) => {
    fetchRedditPosts(currency)
      .then(posts => this.setState({ newsList: posts }))
      .catch(err => this.setState({ err }))
  }

  render() {
    let _scrollView = ScrollView;
    return (
      <View style={styles.newsContainer}>
        <Text style={styles.newsHeaderText}>
          <Image source={this.props.image} style={styles.logo} />
          {`Latest r/${cryptoSymbolToName(this.props.symbol)} posts`}
        </Text>

        {!this.state.newsList.length ? <Text>Loading...</Text> :
          <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; }}
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}>
            {this.state.newsList.map(
              (n, i) => (<Text key={i} style={styles.newsListItem} onPress={() => Linking.openURL(n.url)}>{n.title}</Text>)
            )}
          </ScrollView >
        }
      </View>
    );
  }
}

News.propTypes = {
  symbol: PropTypes.string,
};

const styles = StyleSheet.create({
  newsHeaderText: {
    fontSize: 18,
  },
  newsListItem: {
    paddingTop: 3,
    paddingBottom: 3,
    textDecorationLine: 'underline'
  },
  logo: {
    height: 50,
    width: 50,
  },
});

export default News;