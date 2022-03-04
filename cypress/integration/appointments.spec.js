describe("Appointments", () => {
  //the below function groups the the common test commands and runs before each it block
  beforeEach(() => {
    //If we run the test a second time, it will fail because there will already be an appointment in the slot that we try to click, so use:
    cy.request("GET", "/api/debug/reset");
    //visit the root of the web
    cy.visit("/");
    cy.contains("Monday");
   });
  it("should book an interview", () => {
    //click the button to add a new appointment
    cy.get("[alt=Add]")
    .first()
    .click();

    //type the student name into the input field
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    //choose an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    //click the save button
    cy.contains("Save").click();

    //show the student and interviewers names:
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });
  it("should edit an interview",()=>{
    cy.get("[alt=Edit]")
    .first()
    .click({force: true});//pass { force: true } to the button to bypass the hover act

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia");

    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should cancel an interview",()=>{
    //Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]")
    .first()
    .click({force:true});

    //Clicks the confirm button
    cy.contains("Confirm").click();

  });

});