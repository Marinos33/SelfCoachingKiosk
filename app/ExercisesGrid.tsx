import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function ExercisesGridComponent() {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );

  const [items] = React.useState([
    {
      key: 1,
      Image: 'https://picsum.photos/600/600',
      MachineName: 'Machine name',
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key} style={styles.row}>
          <DataTable.Cell style={styles.imageCell}>
            <Image source={{ uri: item.Image }} style={styles.image} />
          </DataTable.Cell>
          <DataTable.Cell numeric style={styles.textCell}>
            <Text style={styles.text}>{item.MachineName}</Text>
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
}

const styles = StyleSheet.create({
  row: {
    height: Dimensions.get('window').width / 5, // Adjust the height as needed
    width: '100%',
    backgroundColor: 'blue',
  },
  imageCell: {
    flex: 3, // 30% of the width
    justifyContent: 'center',
    backgroundColor: 'red',
    alignItems: 'center',
  },
  textCell: {
    flex: 7, // 70% of the width
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  image: {
    width: '95%', // Adjust the width as needed
    height: '95%', // Adjust the height as needed
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
  },
});
