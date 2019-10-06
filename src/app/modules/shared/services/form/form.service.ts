import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
/**
 * Сервис для работы с формами
 */
@Injectable()
export class FormService {
  /**
   * Regexp для строк вне пробела
   */
  public readonly nonWhiteSpaceRegexp: RegExp;

  /**
   * Regexp для пароля
   */
  public readonly passwordRegexp: RegExp;

  /**
   * Regexp для числового значения
   */
  public readonly numberRegexp: RegExp;

  /**
   * Regexp для числового значения
   */
  public readonly yearRegexp: RegExp;

  /**
   * Regexp для числового значения c буквами
   */
  public readonly alphaNumericRegexp: RegExp;

  /**
   * Regexp для числового значения (float)
   */
  public readonly floatRegexp: RegExp;

  /**
   * Максимальная длина для полей формы (валидация)
   */
  public readonly maxLengthForm: number = 250;

  /**
   * Максимальная длина для полей формы (UI)
   */
  public readonly maxLength: number = 251;

  /**
   * Максимальная длина для числовых полей
   */
  public readonly maxIntLength: number = 9;

  /**
   * Максимальная длина для дробных полей
   */
  public readonly maxFloatLength: number = 5;

  /**
   * Максимальная длина для полей формы (валидация)
   */
  public readonly maxLengthLargeForm: number = 1024;

  /**
   * Максимальная длина для полей формы (UI)
   */
  public readonly maxLengthLarge: number = 1025;

  /**
   * Конструктор
   */
  constructor(
  ) {
    this.nonWhiteSpaceRegexp = /[^\s]+/;
    this.passwordRegexp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])[A-Za-z\d].{7,}/;
    this.numberRegexp = /^-?\d{1,9}$/;
    this.floatRegexp = /^(-?[0-9]){1,9}([,.]?)([0-9]{1,5})?$/;
    this.yearRegexp = /^[0-9]{4}$/;
    this.alphaNumericRegexp = /[A-Za-zА-Яа-я0-9]+/;
  }

  /**
   * Валидация формы
   * @param form Форма
   * @return Валидна ли форма
   */
  public validateForm(form: FormGroup): boolean {
    if (form.invalid) {
      const controls = form.controls;
      // Если форма не валидна, то помечаем все контролы как touched
      Object.keys(controls)
        .forEach((controlName) => controls[controlName].markAsTouched({ onlySelf: true }));
      // Прерывание выполнения метода

      return false;
    } else {
      return true;
    }
  }

  /**
   * Отключен ли выпадающий список
   * @param data Данные
   * @return boolean
   */
  public disabledDropdown(data: any[]): boolean {
    return !(Array.isArray(data) && !!data.length);
  }

  /**
   * Отключение контрола формы
   * @param form Форма
   * @param name наименование
   */
  public disableControl(form: FormGroup, name: string): void {
    form.get(name).disable();
    form.get(name).clearValidators();
    form.get(name).updateValueAndValidity();
  }

}
