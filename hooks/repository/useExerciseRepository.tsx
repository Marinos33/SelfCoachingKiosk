import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { eq } from 'drizzle-orm';
import * as schema from '../../persistence/schema';
import migrations from '../../drizzle/migrations';

const expo = SQLite.openDatabaseSync('selfcochingkiosk.db', {
  enableChangeListener: true,
});

const db = drizzle(expo);

export const useExerciseRepository = () => {
  const { success, error } = useMigrations(db, migrations);
  const { data } = useLiveQuery(db.select().from(schema.exercicesTable));

  const addExercise = (item: any) => {
    db.insert(schema.exercicesTable).values(item).execute();
  };

  const updateExercise = (updatedItem: any) => {
    db.update(schema.exercicesTable)
      .set(updatedItem)
      .where(eq(schema.exercicesTable.id, updatedItem.id))
      .execute();
  };

  const removeExercise = (key: number) => {
    db.delete(schema.exercicesTable)
      .where(eq(schema.exercicesTable.id, key))
      .execute();
  };

  const getById = async (id: number) => {
    const exercise = await db
      .select()
      .from(schema.exercicesTable)
      .where(eq(schema.exercicesTable.id, id))
      .execute();

    return exercise[0];
  };

  return {
    data,
    addExercise,
    updateExercise,
    removeExercise,
    getById,
    success,
    error,
  };
};
