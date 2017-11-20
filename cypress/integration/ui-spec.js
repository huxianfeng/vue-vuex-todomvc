/* eslint-env mocha */
/* global cy */
describe('UI', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('loads application', () => {
    cy.get('.todoapp').should('be.visible')
  })

  it('adds and deletes an item', () => {
    const id = Math.random()
      .toString(16)
      .substr(2, 10)
    const title = `new item ${id}`

    const getNewItem = () =>
      cy
        .get('.todo-list')
        .find('li')
        .contains(id)

    cy
      .get('.todoapp')
      .find('.new-todo')
      .type(`${title}{enter}`)

    getNewItem()
      .should('be.visible')
      .parent()
      .find('.destroy')
      .click({ force: true }) // because it only becomes visible on hover

    getNewItem().should('not.exist')
  })
})