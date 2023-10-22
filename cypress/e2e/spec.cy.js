describe('308 redirect', () => {
  it('POST request to test', () => {
    cy.request("POST", "/test").its("body").should("eq", "POST");
  })
})