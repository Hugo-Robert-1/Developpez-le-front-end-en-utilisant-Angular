export interface PieChartData {
  name: string; //country
  value: number; // nombre total de médailles
  extra: { id: number }; // attribut extra permettant d'ajouter des données supplémentaires, ici l'id du pays
}
