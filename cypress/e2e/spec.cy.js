describe('My First Test', () => {
  it('Login', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('planner')
    cy.get('input[type="password"]').type('planner')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/urban-planner')
    cy.contains('KirunaExplorer')
    cy.contains('planner')
    cy.contains('Dashboard')
    cy.contains('New document')
    cy.contains('Link documents')
  })
})

describe('My First Test', () => {
  it('Visit the planner page', () => {
    cy.visit('http://localhost:5173/urban-planner')
  })
})