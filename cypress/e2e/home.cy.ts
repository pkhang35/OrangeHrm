describe('OrangeHRM Change Password Tests', () => {
  const baseUrl = 'http://localhost/orangehrm/orangehrm-5.7/web/index.php/auth/'; 
  beforeEach(() => {
    
    cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/auth/login');

    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin'); 
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.oxd-button').click();

   
    cy.visit(`http://localhost/orangehrm/orangehrm-5.7/web/index.php/pim/updatePassword`);
  });

  it('TC01 - Mật khẩu mới quá ngắn', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('Abc1!');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Abc1!');
    cy.get('.oxd-button--secondary').click();
    cy.contains('Should have at least 8 characters').should('be.visible');

  });

  it('TC02 - Mật khẩu mới quá dài', () => {
    const longPassword = 'ThisIsAVeryLongPasswordThatExceedsTheLimitOfSixtyFourCharacters12345@!';
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type(longPassword);
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(longPassword);
    cy.get('.oxd-button--secondary').click();
    cy.contains('Should not exceed 64 characters').should('be.visible');
  });

  it('TC03 - Mật khẩu không có chữ cái viết hoa', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('password123!');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('password123!');
    cy.get('.oxd-button--secondary').click();
    cy.contains('Your password must contain minimum 1 upper-case letter').should('be.visible');
  });

  it('TC04 - Mật khẩu không có chữ cái viết thường', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('PASSWORD123!');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('PASSWORD123!');
    cy.get('.oxd-button--secondary').click();
    cy.contains('Your password must contain minimum 1 lower-case letter').should('be.visible');
  });

  it('TC05 - Mật khẩu không có ký tự đặc biệt', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('Password123');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Password123');
    cy.get('.oxd-button--secondary').click();
    cy.contains('Your password must contain minimum 1 special character').should('be.visible');
  });

  it('TC06 - Mật khẩu không có số', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('Password!');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Password!');
    cy.get('.oxd-button--secondary').click();
    cy.contains('Your password must contain minimum 1 number').should('be.visible');
  });

  it('TC07 - Mật khẩu mới chứa khoảng trắng', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('New Password123!');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('New Password123!');
    cy.get('.oxd-button--secondary').click();
    cy.contains('Your password should not contain spaces').should('be.visible');
  });

  it('TC08 - Mật khẩu mới không khớp với xác nhận', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('Password!@2004');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Password!@2005');
    cy.get('.oxd-button--secondary').click();
    cy.contains('Passwords do not match').should('be.visible');
  });

  it('TC09 - Mật khẩu mới và xác nhận để trống', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').clear();
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear();
    cy.get('.oxd-button--secondary').click();
    cy.contains('Passwords do not match').should('be.visible');
  });

  it('TC10 - Xác nhận mật khẩu để trống', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('Password!@2004');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear();
    cy.get('.oxd-button--secondary').click();
    cy.contains('Passwords do not match').should('be.visible');
  });

  it('TC11 - Cả 3 trường đều để trống', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear();
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').clear();
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear();
    cy.get('.oxd-button--secondary').click();
    cy.contains('Required').should('be.visible');
  });
  it('TC12 - Mật khẩu cũ không chính xác', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
      .type('wrongpassword');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input')
      .type('Newpassword123!');  
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
      .type('Newpassword123!');
    cy.get('.oxd-button--secondary').click();

    cy.get('.oxd-text--toast-message') 
      .should('be.visible') 
      .and('contain', 'Current Password is Incorrect'); 
});




  it('TC13 - Mật khẩu mới trùng với mật khẩu cũ', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.oxd-button--secondary').click();
    cy.contains('New password must not overlap with old password').should('be.visible');
  });

  it('TC14 - Mật khẩu mới chỉ toàn ký tự đặc biệt', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('!!!@@@###');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('!!!@@@###');
    cy.get('.oxd-button--secondary').click();
    cy.contains('Your password must contain minimum 1 lower-case letter').should('be.visible');
  });

  it('TC15 - Mật khẩu cũ để trống', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear();
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.oxd-button--secondary').click();
    cy.contains('Required').should('be.visible');
  });

  it('TC16 - Mật khẩu hợp lệ nhưng yếu', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk123!@');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk123!@');
    cy.get('.oxd-button--secondary').click();
    cy.contains('Your password meets the minimum requirements, but it could be guessable').should('be.visible');
  });



  // Security Test Cases
  it('SEC01 - Thử brute force mật khẩu cũ', () => {
    for (let i = 0; i < 6; i++) {
      cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(`wrongpassword${i}`);
      cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('NewPassword123!');
      cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('NewPassword123!');
      cy.get('.oxd-button--secondary').click();
    }
    cy.contains('Tài khoản đã bị khóa. Vui lòng thử lại sau').should('be.visible');
  });

  it("SEC02 - SQL Injection vào mật khẩu cũ", () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type("' OR '1'='1");
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('Password2004@!');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Password2004@!');
    cy.get('.oxd-button--secondary').click();
    cy.get('.oxd-text--toast-message') // Đảm bảo đây là selector đúng
      .should('be.visible') // Kiểm tra thông báo lỗi hiển thị
      .and('contain', 'Current Password is Incorrect'); // Kiểm tra nội dung thông báo
  });

  it("SEC03 - XSS Injection vào mật khẩu mới", () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type("<script>alert('Hacked!')</script>");
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type("<script>alert('Hacked!')</script>");
    cy.get('.oxd-button--secondary').click();
    cy.contains('Your password must contain minimum 1 number').should('be.visible');
  });
  it('TC17 - Đổi mật khẩu thành công', () => {
    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('Newpassword123!');
    cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Newpassword123!');
    cy.get('.oxd-button--secondary').click();
    cy.get('.oxd-text--toast-message') // Đảm bảo đây là selector đúng
    .should('be.visible') // Kiểm tra thông báo lỗi hiển thị
    .and('contain', 'Successfully Saved'); // Kiểm tra nội dung thông báo
  });
});
