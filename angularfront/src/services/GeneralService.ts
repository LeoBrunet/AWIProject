export module GeneralServiceInterface {
  export const baseUrl = 'https://nicolas-ig.alwaysdata.net/api';

  // CONSTANTES CALCULS DES COUTS
  export const averageMinuteRate: number = 0.175; // Taux horaire moyen commis de cuisine en France en 2022
  export const averageMinuteRateFluid: number = 0.0198;
  export const sellingPriceMultiplierCoefficient: number = 1.3;
  export const imagePath = "https://nicolas-ig.alwaysdata.net/api/file/";
}
