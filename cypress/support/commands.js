// Кастомные команды, которых нет в cypress

Cypress.Commands.add('logout', () => {
    cy.request('GET', 'https://api.pokemonbattle.me/v2/pokemons?page=1').then((response) => {
        expect(response.status).to.eq(200);
    });
});

Cypress.Commands.add('generateRandomEmail', () => {
  const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
  const domains = ['gmail.com', 'yandex.ru', 'mail.ru', 'rambler.ru'];
  const usernameLength = Math.floor(Math.random() * (12 - 8 + 1)) + 8;

  let username = '';
  for (let i = 0; i < usernameLength; i++) {
    username += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${username}@${randomDomain}`;
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })