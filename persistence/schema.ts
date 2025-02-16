import { blob, int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const exercicesTable = sqliteTable('exercises_table', {
  id: int().primaryKey({ autoIncrement: true }),
  image: blob(),
  machineName: text().notNull(),
  description: text(),
  weight: text().notNull(),
  numberOfSeries: text().notNull(),
  repsPerSeries: text().notNull(),
  restBetweenSeries: text(),
  tempo: text(),
  notes: text(),
});
