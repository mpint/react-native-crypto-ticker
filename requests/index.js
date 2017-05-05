export function fetchExchangeRate(currency) {
  return fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${currency}`, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache'
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return {
        usd: responseJson.data.rates.USD,
        btc: responseJson.data.rates.BTC,
      };
    })
    .catch((err) => err);
}

export function fetchRedditPosts(currency) {
  return fetch(`https://www.reddit.com/r/${cryptoSymbolToName(currency)}/new.json?sort=new`)
    .then((response) => response.json())
    .then((responseJson) => responseJson.data.children)
    .then((postList) => {
      return postList.map((p) => {
        return {
          url: p.data.url,
          title: p.data.title
        }
      });
    })
    .catch((err) => err);
}

export function cryptoSymbolToName(symbol) {
  return symbol === 'btc' ? 'bitcoin' :
    symbol === 'ltc' ? 'litecoin' :
      'ethereum';
}