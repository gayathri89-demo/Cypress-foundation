describe("MySQL Database Tests", () => {
  it("should verify DemoTable records", () => {
    cy.task(
      "queryDatabase",
      "SELECT * FROM DemoTable ORDER BY id"
    ).then((rows) => {
      expect(rows).to.have.length(3);

      expect(rows[0]).to.deep.include({
        id: 1,
        name: "John",
        role: "Tester",
      });

      expect(rows[1]).to.deep.include({
        id: 2,
        name: "Anita",
        role: "Developer",
      });

      expect(rows[2]).to.deep.include({
        id: 3,
        name: "Ravi",
        role: "Automation Engineer",
      });
    });
  });
});