class Repository {
  constructor() {
    this.books = new Map();   // isbn -> Book
    this.copies = new Map();  // copyId -> BookCopy
    this.members = new Map(); // memberId -> Member
    this.loans = new Map();   // loanId -> Loan
  }

  // Books & Copies
  addBook(book) {
    this.books.set(book.isbn, book);
  }

  addCopy(copy) {
    this.copies.set(copy.copyId, copy);
  }

  findAvailableCopy(isbn) {
    for (const copy of this.copies.values()) {
      if (copy.isbn === isbn && copy.status === "Available") return copy;
    }
    return null;
  }

  setCopyStatus(copyId, status) {
    const copy = this.copies.get(copyId);
    if (!copy) throw new Error("Copy not found");
    copy.status = status;
  }

  // Members
  addMember(member) {
    this.members.set(member.memberId, member);
  }

  findMember(memberId) {
    return this.members.get(memberId) || null;
  }

  // Loans
  createLoan(loan) {
    this.loans.set(loan.loanId, loan);
  }

  countActiveLoans(memberId) {
    let count = 0;
    for (const loan of this.loans.values()) {
      if (loan.memberId === memberId && loan.isActive()) count++;
    }
    return count;
  }

  findActiveLoan(copyId, memberId) {
    for (const loan of this.loans.values()) {
      if (loan.copyId === copyId && loan.memberId === memberId && loan.isActive()) {
        return loan;
      }
    }
    return null;
  }
}

module.exports = { Repository };