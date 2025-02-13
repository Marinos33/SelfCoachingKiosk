import ExerciseItem from '@/model/ExerciseItem';
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Checkbox, DataTable, Text, IconButton } from 'react-native-paper';

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
  const [page, setPage] = React.useState<number>(0);
  const itemsPerPage = Math.floor(screenHeight / rowHeight) - 1;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      {items.slice(from, to).map((item) => (
        <TouchableOpacity key={item.Id} onPress={() => onEditPress(item)}>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell style={styles.imageCell}>
              <Image source={{}} style={styles.image} />
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
    height: rowHeight, // Adjust the height as needed
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
