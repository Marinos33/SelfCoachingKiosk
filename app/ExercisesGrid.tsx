import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { DataTable, Text } from 'react-native-paper';

export default function ExercisesGridComponent() {
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(8);

  const [items] = React.useState([
    {
      key: 1,
      Image: 'https://picsum.photos/600/600',
      MachineName: 'Machine name',
      Description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Description',
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
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.MachineName}</Text>
              <Text style={styles.description}>{item.Description}</Text>
            </View>
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
      />
    </DataTable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    height: Dimensions.get('window').width / 3.5, // Adjust the height as needed
    width: '100%',
  },
  imageCell: {
    flex: 3, // 30% of the width
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCell: {
    flex: 7, // 70% of the width
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '95%', // Adjust the width as needed
    height: '95%', // Adjust the height as needed
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 5, // Adjust the margin as needed
  },
});
