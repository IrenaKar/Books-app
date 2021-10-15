let books = [
    {
      title: "Silmarilion",
      author: "JRR Tolkien",
      maxPages: 365,
      onPage: 100,
    },
    {
      title: "The Reader",
      author: "Bernhard Schlink",
      maxPages: 218,
      onPage: 218,
    },
    {
      title: "Anna Karenina",
      author: "Leo Tolstoy",
      maxPages: 864,
      onPage: 250,
    },
    {
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      maxPages: 480,
      onPage: 352,
    },
    {
      title: "Midnight's Children",
      author: "Salman Rushdie",
      maxPages: 446,
      onPage: 446,
    },
  ];
  
  let tBody = document.querySelector("table > tbody");
  let listOfBooks = document.querySelector(".books");
  let readBooks = document.querySelector(".read");
  
  let booksUl = document.createElement("ul");
  let pagesUl = document.createElement("ul");
  listOfBooks.appendChild(booksUl);
  readBooks.appendChild(pagesUl);
  
  let isInEditingMode = false;
  let editingIndex;
  let showBookLi;
  let result;
  
  function addUlBook(book) {
    let showBookLi = document.createElement("li");
    showBookLi.innerHTML = `${book.title} by ${book.author}`;
    booksUl.appendChild(showBookLi);
  
    if (book.maxPages === book.onPage || result === 100) {
      let showBookLi = document.createElement("li");
      showBookLi.innerHTML = `You already read ${book.title} by ${book.author}`;
      showBookLi.style.color = "green";
      pagesUl.appendChild(showBookLi);
    } else {
      let showBookLi = document.createElement("li");
      showBookLi.innerHTML = `You still need to read ${book.title} by ${book.author}`;
      showBookLi.style.color = "red";
      pagesUl.appendChild(showBookLi);
    }
  }
  books.forEach((book) => {
    addUlBook(book);
  });
  
  function booksAded(book) {
    const tr = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const tdAuthor = document.createElement("td");
    const tdPages = document.createElement("td");
    const tdOnPage = document.createElement("td");
    const tdProgress = document.createElement("td");
    const tdEdit = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-danger");
    tdEdit.appendChild(editBtn);
    editBtn.addEventListener("click", onEditRow);
    tdTitle.innerHTML = book.title;
    tdAuthor.innerHTML = book.author;
    tdPages.innerHTML = book.maxPages;
    tdOnPage.innerHTML = book.onPage;
    editBtn.innerHTML = "Edit Pages";
  
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdPages);
    tr.appendChild(tdOnPage);
    tr.appendChild(tdProgress);
    tr.appendChild(tdEdit);
    tBody.appendChild(tr);
  
    let outer = document.createElement("div");
    outer.classList.add("progress");
    let inner = document.createElement("div");
    inner.classList.add("progress-bar", "bg-success");
    const result = (book.onPage / book.maxPages) * 100;
    inner.innerText = Math.round(result) + "%";
    inner.style.width = result + "%";
    outer.appendChild(inner);
    tdProgress.appendChild(outer);
  }
  
  books.forEach((book) => {
    booksAded(book);
  });
  
  let addTitle = document.querySelector("#title");
  let addAuthor = document.querySelector("#author");
  let addPages = document.querySelector("#current-page");
  let addMaxPages = document.querySelector("#max-pages");
  let addBookBtn = document.querySelector(".addButton");
  let editBookBtn = document.querySelector(".editButton");
  addBookBtn.innerHTML = "Add to list";
  class Books {
    constructor(title, author, page, maxPages) {
      this.title = title;
      this.author = author;
      this.onPage = parseInt(page);
      this.maxPages = parseInt(maxPages);
    }
  }
  
  addBookBtn.addEventListener("click", () => {
    if (isInEditingMode) {
      books[editingIndex - 1].title = addTitle.value;
      books[editingIndex - 1].author = addAuthor.value;
      books[editingIndex - 1].onPage = parseInt(addPages.value);
      books[editingIndex - 1].maxPages = parseInt(addMaxPages.value);
  
      const allTrs = document.querySelectorAll("table tr");
      const currentTr = allTrs[editingIndex];
      const allTds = currentTr.querySelectorAll("td");
  
      allTds[0].innerHTML = addTitle.value;
      allTds[1].innerHTML = addAuthor.value;
      allTds[2].innerHTML = parseInt(addMaxPages.value);
      allTds[3].innerHTML = parseInt(addPages.value);
      allTds[4].innerHTML = "";
  
      let outer = document.createElement("div");
      outer.classList.add("progress");
  
      let inner = document.createElement("div");
      inner.classList.add("progress-bar", "bg-success");
  
      result = (addPages.value / addMaxPages.value) * 100;
      inner.innerText = Math.round(result) + "%";
      inner.style.width = result + "%";
      outer.appendChild(inner);
      allTds[4].appendChild(outer);
      isInEditingMode = false;
      console.log(result);
    } else {
      let titleValue = addTitle.value;
      let authorValue = addAuthor.value;
      let maxPagesValue = addMaxPages.value;
      let onPageValue = addPages.value;
  
      const newBook = new Books(
        titleValue,
        authorValue,
        onPageValue,
        maxPagesValue
      );
      books.push(newBook);
      console.log(books);
  
      const tr = document.createElement("tr");
      const tdTitle = document.createElement("td");
      const tdAuthor = document.createElement("td");
      const tdPages = document.createElement("td");
      const tdOnPage = document.createElement("td");
      const tdProgress = document.createElement("td");
      const tdEdit = document.createElement("td");
      const editBtn = document.createElement("button");
  
      editBtn.classList.add("btn", "btn-danger");
      tdEdit.appendChild(editBtn);
  
      editBtn.addEventListener("click", onEditRow);
  
      tdTitle.innerHTML = titleValue;
      tdAuthor.innerHTML = authorValue;
      tdOnPage.innerHTML = onPageValue;
      tdPages.innerHTML = maxPagesValue;
      editBtn.innerHTML = "Edit Pages";
  
      tr.appendChild(tdTitle);
      tr.appendChild(tdAuthor);
      tr.appendChild(tdPages);
      tr.appendChild(tdOnPage);
      tr.appendChild(tdProgress);
      tr.appendChild(tdEdit);
  
      tBody.appendChild(tr);
  
      let li = document.createElement("li");
      li.innerHTML = `${newBook.title} by ${newBook.author}`;
      booksUl.appendChild(li);
  
      if (newBook.maxPages === newBook.onPage || result === 100) {
        let li = document.createElement("li");
        li.innerHTML = `You already read ${newBook.title} by ${newBook.author}`;
        li.style.color = "green";
        pagesUl.appendChild(li);
      } else {
        let li = document.createElement("li");
        li.innerHTML = `You still need to read ${newBook.title} by ${newBook.author}`;
        li.style.color = "red";
        pagesUl.appendChild(li);
      }
  
      let outer = document.createElement("div");
      outer.classList.add("progress");
  
      let inner = document.createElement("div");
      inner.classList.add("progress-bar", "bg-success");
  
      result = (newBook.onPage / newBook.maxPages) * 100;
      inner.innerText = Math.round(result) + "%";
      inner.style.width = result + "%";
  
      outer.appendChild(inner);
      tdProgress.appendChild(outer);
    }
  
    addTitle.value = "";
    addAuthor.value = "";
    addPages.value = "";
    addMaxPages.value = "";
    addBookBtn.innerHTML = "Add to list";
  });
  
  function onEditRow(e) {
    isInEditingMode = true;
    const tr = e.currentTarget.parentNode.parentNode;
    editingIndex = tr.rowIndex;
    const currentItem = books[editingIndex - 1];
  
    addTitle.value = currentItem.title;
    addAuthor.value = currentItem.author;
    addPages.value = currentItem.onPage;
    addMaxPages.value = currentItem.maxPages;
    addBookBtn.innerHTML = "Edit pages";
  }
  