/**
 * Интерфейс для схемы.
 */
export interface Hall {

  /**
   * Идентификатор
   */
  id: string;
  /**
   * Павильон.
   */
  pavilion: string;
  /**
   * Площадь.
   */
  square: number;
  /**
   * Можно забронировать.
   */
  freeToBook: string;
  /**
   * Свободно
   */
  availible: string;
  /**
   * Резерв.
   */
  reserve: string;
}
