import { Buffer as BufferPkg } from 'buffer';
import ExerciseItem from '@/model/ExerciseItem';

export const mapDbToExerciseItem = (dbItem: any): ExerciseItem => ({
  Id: dbItem.id,
  Image: dbItem.image ? BufferPkg.from(dbItem.image).toString('base64') : null,
  MachineName: dbItem.machineName,
  Description: dbItem.description,
  Weight: dbItem.weight,
  NumberOfSeries: dbItem.numberOfSeries,
  RepsPerSeries: dbItem.repsPerSeries,
  RestBetweenSeries: dbItem.restBetweenSeries,
  Tempo: dbItem.tempo,
  Notes: dbItem.notes,
  Status: false,
});

export const mapExerciseItemToDb = (item: ExerciseItem): any => ({
  id: item.Id,
  image: item.Image ? BufferPkg.from(item.Image, 'base64') : null,
  machineName: item.MachineName,
  description: item.Description,
  weight: item.Weight,
  numberOfSeries: item.NumberOfSeries,
  repsPerSeries: item.RepsPerSeries,
  restBetweenSeries: item.RestBetweenSeries,
  tempo: item.Tempo,
  notes: item.Notes,
});
