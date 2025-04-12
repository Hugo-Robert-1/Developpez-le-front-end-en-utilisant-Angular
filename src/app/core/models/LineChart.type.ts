export interface LineChartSeries {
  name: string; // année
  value: number; // nombre de médailles
}

export interface LineChartData {
  name: string; // nom du pays
  series: LineChartSeries[]; //tableau d'objet avec les médailles par année
}
