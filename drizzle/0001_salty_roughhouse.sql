PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_exercises_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`image` text,
	`machineName` text NOT NULL,
	`description` text,
	`weight` text NOT NULL,
	`numberOfSeries` text NOT NULL,
	`repsPerSeries` text NOT NULL,
	`restBetweenSeries` text,
	`tempo` text,
	`notes` text
);
--> statement-breakpoint
INSERT INTO `__new_exercises_table`("id", "image", "machineName", "description", "weight", "numberOfSeries", "repsPerSeries", "restBetweenSeries", "tempo", "notes") SELECT "id", "image", "machineName", "description", "weight", "numberOfSeries", "repsPerSeries", "restBetweenSeries", "tempo", "notes" FROM `exercises_table`;--> statement-breakpoint
DROP TABLE `exercises_table`;--> statement-breakpoint
ALTER TABLE `__new_exercises_table` RENAME TO `exercises_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;