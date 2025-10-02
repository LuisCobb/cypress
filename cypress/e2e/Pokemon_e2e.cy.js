import * as pokemon_login from "../locators/pokemon_login.json";
import * as pokemon_start_page from "../locators/pokemon_start_page.json"
import * as pokemon_payments from "../locators/pokemon_payments.json";
import * as data from "../helpers/pokemon_data.js"

describe('[pokemonbattle.ru][e2e] тест на смену аватара полный цикл', () => {
    
    beforeEach('Авторизация и переход в магазин', function () {
        // Посещение сайта и авторизация
        cy.visit('https://pokemonbattle.ru/', { timeout: 14000 });
        
        // Авторизация
        cy.get(pokemon_login.email, { timeout: 5000 })
            .should('be.visible')
            .clear()
            .type(data.log);
            
        cy.get(pokemon_login.password)
            .should('be.visible')
            .clear()
            .type(data.pass);
            
        cy.get(pokemon_login.login_button, { timeout: 3000 })
            .should('be.visible')
            .click();
        
        // Переход в личный кабинет
        cy.get(pokemon_start_page.topper_in, { timeout: 5000 })
            .should('be.visible')
            .click();
            
        // Переход к аватарам
        cy.get('[data-qa="shop"]', { timeout: 3000 })
            .should('be.visible')
            .click();
    });

    it('Покупка и установка аватара', function () {
        // Выбор доступного аватара
        cy.get('.available > button', { timeout: 3000 })
            .first()
            .should('be.visible')
            .click();

        cy.wait(2000);    
        
        // Заполнение данных карты
        cy.get('.card_number', { timeout: 5000 })
            .should('be.visible')
            .type('2200000000000053');

        cy.wait(2000);
            
        cy.get('.card_csv')
            .should('be.visible')
            .type('125');
        cy.wait(500);
            
        cy.get('.card_date')
            .should('be.visible')
            .type('1032');
        cy.wait(500);
            
        cy.get('.card_name')
            .should('be.visible')
            .type('LUKA MONTISANTY');
        cy.wait(500);
        
        // Отправка формы оплаты
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment')
            .should('be.visible')
            .click();
        
        // Подтверждение оплаты (если требуется код)
        cy.get('.style_1_base_input', { timeout: 3000 })
            .should('be.visible')
            .type('56456');

        cy.wait(500);
            
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment', { timeout: 3000 })
            .should('be.visible')
            .click();
        
        // Проверка успешной покупки
        cy.get(pokemon_payments.succ, { timeout: 3000 })
            .should('be.visible')
            .and('contain', 'Покупка прошла успешно');
    });

});