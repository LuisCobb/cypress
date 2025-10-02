
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json" // импортнём локаторы 
import * as data from "../helpers/default_data.js"           // подтянем данные из файла

describe('Тесты авторизации для login.qa.studio', () => {
    
       beforeEach('Начало теста', function () {
         cy.visit('/');
           });

    it('1/6 Позитивный кейс авторизации', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно');
        cy.get(result_page.close).should('be.visible');
    });

    it('2/6 Логика восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).should('be.visible').click();
        cy.generateRandomEmail().then((email) => {
            cy.get(recovery_password_page.email).type(email);
        });
        cy.get(recovery_password_page.send_button).click();
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
        cy.get(result_page.close).should('be.visible');
    });

    it('3/6 Негативный кейс авторизации A', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(data.dispass);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
        cy.get(result_page.close).should('be.visible');
    });

    it('4/6 Негативный кейс авторизации B', function () {
        cy.get(main_page.email).type(data.disloginb);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
        cy.get(result_page.close).should('be.visible');
    });

    it('5/6 Негативный кейс валидации', function () {
        cy.get(main_page.email).type(data.dislogin);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
    });

    it('6/6 Приведение к строчным буквам', function () {
        cy.get(main_page.email).type(data.disLogin);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно');
        cy.get(result_page.close).should('be.visible');
    });
});