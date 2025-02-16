CREATE TABLE `exercises_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`image` blob,
	`machineName` text NOT NULL,
	`description` text,
	`weight` text NOT NULL,
	`numberOfSeries` text NOT NULL,
	`repsPerSeries` text NOT NULL,
	`restBetweenSeries` text,
	`tempo` text,
	`notes` text
);
