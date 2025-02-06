describe('addproject', () => {
  beforeEach(() => {
    cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/auth/login')
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@')
    cy.get('.oxd-button').click()
    cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/time/saveProject')
  })

  it('TC01 - Để trống các trường dữ liệu trong Add Project', () => {
    cy.get('.oxd-button--secondary').click();
    cy.contains('Required').should('be.visible')  
  });

  it('TC02 - Nhập thông tin dự án đã tồn tại', () => {
    cy.get(':nth-child(2) > .oxd-input').type('dsa');
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input').type('Tranthienhuudung');
    cy.get('.oxd-autocomplete-dropdown')
      .contains('Tranthienhuudung')
      .click();
    cy.get('.oxd-button--secondary').click();
    cy.contains('Already exists').should('be.visible')
  });

  it('TC03 - Nhập ký tự đặc biệt cho tên dự án', () => {
    cy.get(':nth-child(2) > .oxd-input').type('^.^&*>.<');
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input').type('Tranthienhuudung');
    cy.get('.oxd-autocomplete-dropdown')
      .contains('Tranthienhuudung')
      .click();
    cy.get('.oxd-button--secondary').click();
    cy.get('.oxd-form-actions > .oxd-button--secondary').click();
    
    cy.contains('Inparam valid').should('be.visible')
  });

  it('TC04 - Thêm dự án khi chưa chọn khách hàng liên kết', () => {
    cy.get(':nth-child(2) > .oxd-input').type('ValidProject');
    cy.get('.oxd-button--secondary').click();
    cy.contains('Required').should('be.visible')
  });

  it('TC05 - Thêm dự án hợp lệ', () => {
    cy.get(':nth-child(2) > .oxd-input').type('NewProject');
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input').type('Tranthienhuudung');
    cy.get('.oxd-autocomplete-dropdown')
      .contains('Tranthienhuudung')
      .click();
    cy.get('.oxd-textarea').type('This is a valid project.');
    cy.get('.oxd-button--secondary').click();
    cy.get('.oxd-form-actions > .oxd-button--secondary').click();
  });

  it('TC06 - Nhập tên dự án quá dài', () => {
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input').type('Tranthienhuudung');
    cy.get('.oxd-autocomplete-dropdown')
      .contains('Tranthienhuudung')
      .click();
    cy.get(':nth-child(2) > .oxd-input').type('ThisIsAnExceptionallyLongProjectNameThatExceedsFiftyCharacters');

    cy.get('.oxd-button--secondary').click();
    cy.get('.oxd-form-actions > .oxd-button--secondary').click();
    cy.contains('Should not exceed 50 characters').should('be.visible')
  });

  it('TC07 - Kiểm tra nút hủy thao tác', () => {
    cy.get('.oxd-button--ghost').click();
    cy.url().should('not.contain', 'add-project');
  });
  it('TC08 - Thêm dự án với mô tả dài quá mức', () => {
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input').type('Tranthienhuudung');
    cy.get('.oxd-autocomplete-dropdown')
      .contains('Tranthienhuudung')
      .click();
    cy.get(':nth-child(2) > .oxd-input').type('ValidProject');
    cy.get('.oxd-textarea').type('A'.repeat(256));
    cy.get('.oxd-button--secondary').click();
    cy.contains('Should not exceed 255 characters').should('be.visible')
  });
})

