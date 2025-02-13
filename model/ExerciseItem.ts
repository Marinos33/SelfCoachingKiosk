export default interface ExerciseItem {
  Id: number;
  Image: string | null;
  MachineName: string;
  Description: string | null;
  Weight: string;
  NumberOfSeries: string;
  RepsPerSeries: string;
  RestBetweenSeries: string | null;
  Tempo: string | null;
  Notes: string | null;
  Status: boolean;
}
