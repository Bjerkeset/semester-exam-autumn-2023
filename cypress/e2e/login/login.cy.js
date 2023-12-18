describe("Declined Login Request Test", () => {
  it("Submits invalid login credentials and expects server error", () => {
    // Broaden the intercept pattern to ensure it captures the request
    cy.intercept("POST", "**/auth").as("failedLoginRequest");

    const email = "yoyoyo@noroff.no";
    const incorrectPassword = "wrongpassword";

    cy.visit("http://localhost:3000/auth");
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(incorrectPassword);
    cy.get('button[type="submit"]').click();

    cy.contains("Invalid email or password").should("be.visible");
    // Wait for the 'failedLoginRequest' to complete
    cy.wait("@failedLoginRequest").then((interception) => {
      // Expect the status code to be 500 for server error
      // The Server error is becouse of Nextjs Server Actions.
      expect(interception.response.statusCode).to.eq(500);
    });
  });
});

describe("Successful Login Request Test", () => {
  it("Submits valid login credentials and expects success", () => {
    // Intercept the POST request to the correct URL
    cy.intercept("POST", "**/auth").as("loginRequest");

    cy.visit("http://localhost:3000/auth");

    // Input the email and password
    const email = "bendik@noroff.no";
    const password = "bjerkeset1508";
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Wait for the 'loginRequest' to complete and verify its properties
    cy.wait("@loginRequest").then((interception) => {
      // Expect the status code to be 200 for successful login
      expect(interception.response.statusCode).to.eq(200);
      // Additional assertions can be added here if needed
    });
  });
});
