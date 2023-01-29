import React, {useState, useEffect} from 'react';

import {Text, View, FlatList} from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [alreadySavedPages, setAlreadySavedPages] = useState([]);

  useEffect(() => {
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
        return <Text style={{fontSize:50}}>{item.breed}</Text>;
      }}
    />
  );
};

export default App;
