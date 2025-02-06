describe('Login Functionality Tests', () => {
    const baseUrl = 'http://localhost/orangehrm/orangehrm-5.7/web/index.php/auth/login'; // Thay đổi URL thành trang đăng nhập của bạn
    
    beforeEach(() => {
      cy.visit(baseUrl); // Mở trang đăng nhập trước mỗi test
    });
  
    it('TC01 - Only enter one field', () => {
      cy.get('input[name="username"]').type('User12%'); // Chỉ nhập Username
      cy.get('button[type="submit"]').click(); // Nhấn nút login
      cy.contains('Required').should('be.visible'); // Kiểm tra lỗi hiển thị
    });
  
    it('TC02 - Leave both fields empty', () => {
      cy.get('button[type="submit"]').click(); // Nhấn nút login mà không nhập gì
      cy.contains('Required').should('be.visible'); // Kiểm tra lỗi hiển thị cho cả 2 trường
    });
  
    it('TC03 - Username does not exist', () => {
      cy.get('input[name="username"]').type('User12%3'); // Username không tồn tại
      cy.get('input[name="password"]').type('User@1233'); // Nhập Password
      cy.get('button[type="submit"]').click();
      cy.contains('Username does not exist').should('be.visible');
    });
  
    it('TC04 - Correct username, incorrect password', () => {
      cy.get('input[name="username"]').type('User12%'); // Nhập đúng Username
      cy.get('input[name="password"]').type('User@1234'); // Nhập sai Password
      cy.get('button[type="submit"]').click();
      cy.contains('password is incorrectt').should('be.visible');
    });
  
    it('TC05 - Account disabled', () => {
      cy.get('input[name="username"]').type('User12%'); // Tài khoản bị khóa
      cy.get('input[name="password"]').type('User@1233'); 
      cy.get('button[type="submit"]').click();
      cy.contains('Account disabled').should('be.visible');
    });
  
    it('TC06 - Lock account after 5 incorrect attempts', () => {
      for (let i = 1; i <= 6; i++) {
        cy.get('input[name="username"]').type('User12%');
        cy.get('input[name="password"]').type('User@1234');
        cy.get('button[type="submit"]').click();
  
        if (i < 6) {
          cy.contains('password is incorrectt').should('be.visible'); // Sai password
        } else {
          cy.contains('account has been locked').should('be.visible'); // Khóa tài khoản
        }
        cy.reload(); // Làm mới trang để thử lại
      }
    });
  
    it('TC07 - Login as a non-admin user', () => {
      cy.get('input[name="username"]').type('User2'); // Tài khoản không phải admin
      cy.get('input[name="password"]').type('User@1235');
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/admin'); // Đảm bảo không vào trang admin
    });
  
    it('TC08 - Successful login as admin', () => {
      cy.get('input[name="username"]').type('User3'); // Tài khoản admin
      cy.get('input[name="password"]').type('User@1233');
      cy.get('button[type="submit"]').click();
      
      // Kiểm tra URL thực tế
      cy.url({ timeout: 10000 }).should('include', '/dashboard'); // Điều chỉnh URL thực tế
      
      // Kiểm tra giao diện admin
      cy.contains('Dashboard').should('be.visible'); // Hoặc kiểm tra chức năng admin cụ thể
    });
    
  });
  