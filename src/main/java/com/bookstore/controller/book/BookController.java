package com.bookstore.controller.book;
import com.bookstore.jpa.author.Author;
import com.bookstore.jpa.author.AuthorRepository;
import com.bookstore.jpa.book.Book;
import com.bookstore.jpa.book.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Book API Controller
 * @author Youssef Saghbini
 */

@Controller
public class BookController {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping(path = "/api/books")
    public String booksView(Model model) {
        Collection<Book> books = bookRepository.findAll();
        model.addAttribute("allBooks", books);
        model.addAttribute("newBook", new Book());
        return "AmazinBookStore-books";
    }

    @ResponseBody
    @GetMapping(path = "/api/allBookIDs", produces = "application/json")
    public ResponseEntity<Collection> retrieveAllBookIDs() {
        Collection bookCollection = new ArrayList<>();
        for (Book book: bookRepository.findAll()){
            bookCollection.add(book.getId());
        }

        return new ResponseEntity<>(bookCollection, HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping(path = "/api/booksViewAll", produces = "application/json")
    public ResponseEntity<Collection> retrieveAllBookDetails() {
        return new ResponseEntity<>(bookRepository.findAll(), HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping(path = "/api/book/{id}")
    ResponseEntity<Book> getById(@PathVariable("id") long id) {
        return new ResponseEntity<>(bookRepository.findById(id), HttpStatus.OK);
    }

    @ResponseBody
    @PostMapping(path = "/api/addNewBook", consumes = "application/json")
    public ResponseEntity<HttpStatus> addNewBook(@RequestBody Book book, @RequestParam(name = "authorId") Long authorId) {
        Author author;
        Optional<Author> authorRetrieval = authorRepository.findById(authorId);
        author = authorRetrieval.isPresent() ? authorRetrieval.get() :  null;

        Book newBook = new Book(
                book.getTitle(),
                book.getDescription(),
                book.getImageURL(),
                book.getPublicationYear(),
                book.getISBN(),
               // Format.valueOf(book.getFormat()),
                book.getPrice(),
                book.getStockCount(),
                book.getRating(),
                author,
                null
        );
        bookRepository.save(newBook);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @ResponseBody
    @PutMapping(path = "/api/updateBook/{id}", consumes = "application/json")
    public ResponseEntity<Book> updateBook(@RequestBody Book book,
                                                     @PathVariable("id") long id) {

        Book tempBook = bookRepository.findById(id);
        if (tempBook == null){
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
        if (
                !book.getTitle().isEmpty() ||
                !book.getDescription().isEmpty() ||
                !book.getImageURL().isEmpty() ||
                !book.getPublicationYear().toString().isEmpty() ||
                !book.getISBN().isEmpty() ||
                //!book.getFormat().isEmpty() ||
                !book.getPrice().toString().isEmpty() ||
                !book.getStockCount().toString().isEmpty() ||
                !book.getRating().toString().isEmpty()
        ){

            tempBook.setTitle(book.getTitle());
            tempBook.setDescription(book.getDescription());
            tempBook.setImageURL(book.getImageURL());
            tempBook.setPublicationYear(book.getPublicationYear());
            tempBook.setISBN(book.getISBN());
           // tempBook.setFormat(Format.valueOf(book.getFormat()));
            tempBook.setPrice(book.getPrice());
            tempBook.setStockCount(book.getStockCount());
            tempBook.setRating(book.getRating());

        }
        bookRepository.save(tempBook);

        return new ResponseEntity<>(tempBook, HttpStatus.OK);
    }

    @ResponseBody
    @DeleteMapping(path = "/api/removeBook")
    ResponseEntity<HttpStatus> removeBook(@RequestParam(name = "id") Long id) {
        bookRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping(path = "/api/searchByTitle")
    ResponseEntity<Collection> searchByTitle(@RequestParam(name = "title") String title) {
        return new ResponseEntity<>(bookRepository.findByTitleContaining(title), HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping(path = "/api/findByIds")
    ResponseEntity<Collection> searchByIds(@RequestParam(name = "ids") List<Long> ids) {
        return new ResponseEntity<>(bookRepository.findByIdIn(ids), HttpStatus.OK);
    }
}
