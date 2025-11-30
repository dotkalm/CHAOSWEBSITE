export interface StatementItem {
  quote: string;
  attribution?: string;
}

export interface StatementsConfig {
  cycleMs: number;   // total cycle duration (default: 15000)
  gapMs: number;     // gap between statements (default: 1000)
  items: StatementItem[];
}

export interface StatementsTimingConfig {
  totalMs: number;    // total cycle duration
  gapMs: number;      // gap duration
  visibleMs: number;  // calculated: totalMs - gapMs
}
