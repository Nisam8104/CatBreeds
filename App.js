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
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      renderItem={({item, index}) => {
        return (
          <View style={styles.cards}>
            <View style={styles.center}>
              <Text style={styles.textBold}> {index + 1}</Text>
              <Text style={styles.textBold}>Breed: {item.breed}</Text>
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
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,

    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  text: {
    fontSize: 15,
    color: 'black',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBold: {
    fontSize: 15,
    color: 'red',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 20,
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
