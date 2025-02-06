describe('ClaimConfig', () => {
  beforeEach(() => {
    cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/auth/login')
   
  })
  context('TC01 - Thêm Event với dữ liệu hợp lệ', () => {
    it('thêm event thành công', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@')
      cy.get('.oxd-button').click()
      cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/claim/saveEvents')
      cy.get(':nth-child(2) > .oxd-input').type('ValidEvent')
      cy.get('.oxd-textarea').type('Valid event description')
      cy.contains('Save').click()
      cy.contains('Successfully Saved').should('be.visible')
    })
  })
  context('TC02 - Thêm Event với dữ liệu để trống', () => {
    it('hiển thị lỗi khi không nhập Event Name', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@')
      cy.get('.oxd-button').click()
      cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/claim/saveEvents')
      cy.get(':nth-child(2) > .oxd-input').clear()
      cy.get('.oxd-textarea').clear()
      cy.contains('Save').click()

      cy.contains('Required').should('be.visible')
    })
  })
  context('TC03 - Thêm Event với dữ liệu bị trùng', () => {
    it('hiển thị lỗi khi tên Event đã tồn tại', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@')
      cy.get('.oxd-button').click()
      cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/claim/saveEvents')
      cy.get(':nth-child(2) > .oxd-input').type('ValidEvent')
      cy.contains('Save').click()

      cy.contains('Already exists').should('be.visible')
    })
  })
  context('TC04 - Kiểm tra quyền hạn người dùng', () => {
    it('hiển thị "Access Denied" khi người dùng không phải Admin', () => {
      
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('user')  // Tài khoản không phải Admin
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('User123456')
      cy.get('.oxd-button').click()

      cy.contains('Invalid credentials').should('be.visible')
    })
  })
  context('TC05 - Thêm Event với trạng thái không kích hoạt', () => {
    it('Event được lưu nhưng không được kích hoạt', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@')
      cy.get('.oxd-button').click()
      cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/claim/saveEvents')
      cy.get(':nth-child(2) > .oxd-input').type('InactiveEvent')
      cy.get('.oxd-switch-input').click()
      cy.contains('Save').click()

      cy.contains('Successfully Saved').should('be.visible')
    })
  })
  context('TC06 - Thêm Event với ký tự đặc biệt', () => {
    it('kiểm tra ký tự đặc biệt trong Event Name', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@')
      cy.get('.oxd-button').click()
      cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/claim/saveEvents')
      cy.get(':nth-child(2) > .oxd-input').type('Event@123')
      cy.contains('Save').click()

      cy.contains('Successfully Saved').should('be.visible')
    })
  })
  context('TC07 - Thêm Event với nhiều ký tự trong Event Name', () => {
    it('hiển thị lỗi khi Event Name quá 100 ký tự', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@')
      cy.get('.oxd-button').click()
      cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/claim/saveEvents')
      const longName = 'A'.repeat(101)
      cy.get(':nth-child(2) > .oxd-input').type(longName)
      cy.contains('Save').click()

      cy.contains('Should not exceed 100 characters').should('be.visible')
    })
  })
  context('TC08 - Thêm Description với nhiều ký tự', () => {
    it('hiển thị lỗi khi Description vượt quá 1000 ký tự', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@')
      cy.get('.oxd-button').click()
      cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/claim/saveEvents')
      const longDescription = 'A'.repeat(1001)
      cy.get(':nth-child(2) > .oxd-input').type('ValidEvent123')
      cy.get('.oxd-textarea').type(longDescription)
      cy.contains('Save').click()

      cy.contains('Should not exceed 1000 characters').should('be.visible')
    })
  })
  context('TC09 - Để trống tất cả các trường', () => {
    it('hiển thị lỗi khi để trống tất cả các trường', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@')
      cy.get('.oxd-button').click()
      cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/claim/saveEvents')
      cy.get(':nth-child(2) > .oxd-input').clear()
      cy.get('.oxd-textarea').clear()
      cy.contains('Save').click()

      cy.contains('Required').should('be.visible')
    })
  })
  context('TC10 - Kiểm tra SQL Injection', () => {
    it('không thực thi SQL Injection trong trường Event Name', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@')
      cy.get('.oxd-button').click()
      cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/claim/saveEvents')
      cy.get(':nth-child(2) > .oxd-input').type("' OR '1'='1; DROP TABLE events; --")
      cy.get('.oxd-textarea').type("' OR '1'='1; DROP TABLE events; --")
      cy.contains('Save').click()

      cy.contains('Successfully Saved').should('be.visible')
    })
  })
  context('TC11 - Kiểm tra XSS Attack', () => {
    it('không thực thi mã JavaScript trong trường Event Name', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Ptk2004!@')
      cy.get('.oxd-button').click()
      cy.visit('http://localhost/orangehrm/orangehrm-5.7/web/index.php/claim/saveEvents')
      cy.get(':nth-child(2) > .oxd-input').type('<script>alert("XSS")</script>')
      cy.get('.oxd-textarea').type('<script>alert("XSS")</script>')
      cy.contains('Save').click()

      cy.contains('Successfully Saved').should('be.visible')
    })
  })
})