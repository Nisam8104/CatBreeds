import React, {useState, useEffect} from 'react';

import {Text, View, FlatList, StyleSheet} from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [alreadySavedPages, setAlreadySavedPages] = useState([]);

  const apiCall = async () => {
    fetch(`https://catfact.ninja/breeds?page=${page}`)
      .then(response => response.text())
      .then(res => {
        const wholeData = JSON.parse(res);
        setAlreadySavedPages([...alreadySavedPages, page]); // avoid data duplication when saving code
        if (!alreadySavedPages.includes(page)) {
          setData([...data, ...wholeData.data]);
        }
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    apiCall();
  }, [page]);

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()} // add this
      onEndReached={() => {
        console.log('reached page end next page = ', page + 1);
        setPage(page + 1);
      }}
      onEndReachedThreshold={0.5} // add this
      initialNumToRender={10} // add this
      renderItem={({item}) => {
        return (
          <View style={styles.cards}>
            <View style={styles.center}>
            <Text style={styles.text}>Breed: {item.breed}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Country: {item.country}</Text>
              <Text style={styles.text}>Origin: {item.origin}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Coat: {item.coat}</Text>
              <Text style={styles.text}>Pattern: {item.pattern}</Text>
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  cards: {
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',

    backgroundColor: 'white',
    flex: 1,
  },
  text: {
    fontSize: 15,
    color: 'black',
    justifyContent:"center",
    
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent:'space-between',
  },
  center: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default App;
