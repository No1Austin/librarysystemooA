const { Loan } = require("./models");

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function addDaysISO(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

class LibraryService {
  constructor(repo) {
    this.repo = repo;
  }

  issueBook(isbn, memberId) {
    const member = this.repo.findMember(memberId);
    if (!member) return "ERROR: Member not found.";

    const active = this.repo.countActiveLoans(memberId);
    if (active >= member.maxLoans) {
      return `ERROR: Member has ${active} active loans (max ${member.maxLoans}).`;
    }

    const copy = this.repo.findAvailableCopy(isbn);
    if (!copy) return "ERROR: No available copies for this ISBN.";

    const loanId = `LN-${this.repo.loans.size + 1}`;
    const issueDate = todayISO();
    const dueDate = addDaysISO(14);

    const loan = new Loan(loanId, copy.copyId, memberId, issueDate, dueDate);
    this.repo.createLoan(loan);
    this.repo.setCopyStatus(copy.copyId, "Issued");

    return `SUCCESS: Issued copy ${copy.copyId}, loan ${loanId}, due ${dueDate}`;
  }

  returnBook(copyId, memberId) {
    const loan = this.repo.findActiveLoan(copyId, memberId);
    if (!loan) return "ERROR: No active loan found for that copy + member.";

    const returned = todayISO();
    loan.markReturned(returned);
    this.repo.setCopyStatus(copyId, "Available");

    if (returned > loan.dueDate) {
      return `SUCCESS: Returned (OVERDUE). Due was ${loan.dueDate}, returned ${returned}`;
    }
    return "SUCCESS: Returned on time.";
  }
}

module.exports = { LibraryService };