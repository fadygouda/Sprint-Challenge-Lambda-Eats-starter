describe("Form Submission Validation", function() {
    beforeEach(() => {
        cy.visit("http://localhost:3000/")
    })

    it("will check links and add input", function() {
        cy.get('[href="/pizza"]').click();
        cy.get('[data-cy="name"]').type("Fady Gouda").should("have.value", "Fady Gouda");
        cy.get('[data-cy="size"]').select("small").should("have.value", "small")
        cy.get('[data-cy="sauce"]').select("marinera").should("have.value", "marinera")
        cy.get('[data-cy="chicken"]').check().should("be.checked");
        cy.get('[data-cy="onions"]').check().should("be.checked");
        cy.get("form").submit();
    });
});