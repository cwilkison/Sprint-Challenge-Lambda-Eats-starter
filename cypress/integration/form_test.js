describe("test our form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3001/pizza");
    })
    it("add text to input to name", () => {
        cy.get('input[name="name"]')
        .type("Cole Wilkison")
        .should("have.value", "Cole Wilkison");
        cy.get("textarea")
        .type("Insert special instructions here")
        .should("have.value", "Insert special instructions here");
        cy.get('[type="checkbox"]')
        .check()
        .should("be.checked");
        cy.get("button").click();
    })
})