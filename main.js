const { Book, BookCopy, Member } = require("./.qodo/models");
const { Repository } = require("./.qodo/repository");
const { LibraryService } = require("./.qodo/service");

function seed(repo) {
  repo.addBook(new Book("111", "OOP Basics", "A. Author"));
  repo.addCopy(new BookCopy("C1", "111"));
  repo.addCopy(new BookCopy("C2", "111"));
  repo.addMember(new Member("M1", "Sam", 2));
}

function main() {
  const repo = new Repository();
  seed(repo);

  const service = new LibraryService(repo);

  console.log(service.issueBook("111", "M1"));
  console.log(service.issueBook("111", "M1"));
  console.log(service.issueBook("111", "M1")); // should fail (max loans or no copies)
  console.log(service.returnBook("C1", "M1"));
  console.log(service.issueBook("111", "M1")); // should work again
}

main();