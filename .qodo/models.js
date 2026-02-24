class Book {
  constructor(isbn, title, author) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
  }
}

class BookCopy {
  constructor(copyId, isbn, status = "Available") {
    this.copyId = copyId;
    this.isbn = isbn;
    this.status = status; // Available, Issued
  }
}

class Member {
  constructor(memberId, name, maxLoans = 3) {
    this.memberId = memberId;
    this.name = name;
    this.maxLoans = maxLoans;
  }
}

class Loan {
  constructor(loanId, copyId, memberId, issueDate, dueDate) {
    this.loanId = loanId;
    this.copyId = copyId;
    this.memberId = memberId;
    this.issueDate = issueDate;
    this.dueDate = dueDate;
    this.returnDate = null;
  }

  isActive() {
    return this.returnDate === null;
  }

  markReturned(dateStr) {
    this.returnDate = dateStr;
  }
}

module.exports = { Book, BookCopy, Member, Loan };