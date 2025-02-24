import ExerciseItem from '@/model/ExerciseItem';
import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Checkbox, DataTable, Text } from 'react-native-paper';
import { useAssets } from 'expo-asset';

const rowHeight = Dimensions.get('window').width / 4.5; // Adjust the height as needed
const screenHeight = Dimensions.get('window').height;

interface ExercisesGridComponentProps {
  items: ExerciseItem[];
  onCheckboxPress: (key: number) => void;
  onEditPress: (exercise: ExerciseItem) => void;
}

export default function ExercisesGridComponent({
  items,
  onCheckboxPress,
  onEditPress,
}: ExercisesGridComponentProps) {
  const [assets] = useAssets([require('../assets/images/notfound.jpg')]);

  const [page, setPage] = React.useState<number>(0);
  const itemsPerPage = Math.floor(screenHeight / rowHeight) - 1;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const onTouchRow = (item: ExerciseItem) => {
    onEditPress(item);
  };

  return (
    <DataTable>
      {items.slice(from, to).map((item) => (
        <TouchableOpacity key={item.Id} onPress={() => onTouchRow(item)}>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell style={styles.imageCell}>
              <Image
                source={
                  item.Image
                    ? { uri: `data:image/jpeg;base64,${item.Image}` }
                    : assets
                    ? assets[0]
                    : null // Use the default image from assets if available
                }
                style={styles.image}
                contentFit="contain"
              />
            </DataTable.Cell>
            <DataTable.Cell numeric style={styles.textCell}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.MachineName}</Text>
                <Text style={styles.description}>{item.Description}</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell numeric style={styles.wightCell}>
              <Text style={styles.text}>{item.Weight}</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric style={styles.checkboxCell}>
              <Checkbox
                status={item.Status ? 'checked' : 'unchecked'}
                onPress={() => onCheckboxPress(item.Id)}
              />
            </DataTable.Cell>
          </DataTable.Row>
        </TouchableOpacity>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        onItemsPerPageChange={() => {}}
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
    height: rowHeight,
    width: '100%',
  },
  imageCell: {
    flex: 2.5, // x% of the width
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCell: {
    flex: 4, // x% of the width
    justifyContent: 'center',
    alignItems: 'center',
  },
  wightCell: {
    flex: 2.5, // x% of the width
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCell: {
    flex: 1, // x% of the width
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '95%',
    height: '95%',
  },
  text: {
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 5,
  },
});
