//books array
var books = [
  // {
  //   title: 'Harry Potter',
  //   author: 'J.K. Rowling',
  //   imageURL: 'https://books.google.com/books/content?id=WV8pZj_oNBwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //   isbn: '9781921479311',
  //   pageCount: 268
  // }
];

//functions

var fetch = function (query) {
  // console.log(query);
  var searchQuery = "https://www.googleapis.com/books/v1/volumes?q=" + query;
  // console.log(searchQuery);
  $.ajax({
    method: "GET",
    url: searchQuery,
    dataType: "json",
    success: function(data) {
      addBooks(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

var addBooks = function (data) {
  $('.books').empty();
    for (var i=0; i<10; i++) {
      // console.log(data.items[i]);
    books.push(data.items[i].volumeInfo);
  }
  renderBooks();
  // console.log(books);
};

var renderBooks = function () {
  // $('.books').empty();

  for (var i=0; i<books.length; i++){
    // console.log(books[i]);
    var source = $('#book-template').html();
    var bookTemplate = Handlebars.compile(source);
    var bookInfo = bookTemplate(
      {title: books[i].title,
      author: books[i].authors[0],
      pageCount: books[i].pageCount,
      isbn: books[i].industryIdentifiers[1].identifier,
      imageURL: books[i].imageLinks.thumbnail}
    );
    $('.books').append(bookInfo);
  }
};

renderBooks();

//click handlers
$('.search').on('click', function () {
  var search = $('#search-query').val();
  // console.log(search);
  fetch(search);
});
