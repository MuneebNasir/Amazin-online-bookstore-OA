package com.bookstore.controller;

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

/**
 * Book API Controller
 * @author Youssef Saghbini
 */

@Controller
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @GetMapping(path = "/api/AmazinBookStore-books")
    public String booksView(Model model) {
        Collection<Book> books = bookRepository.findAll();
        model.addAttribute("allBooks", books);
        model.addAttribute("newBook", new Book());
        return "AmazinBookStore-books";
    }

    @ResponseBody
    @GetMapping(path = "/api/AmazinBookStore-AllBookIDs", produces = "application/json")
    public ResponseEntity<Collection> retrieveAllBookIDs() {
        Collection bookCollection = new ArrayList<>();
        for (Book book: bookRepository.findAll()){
            bookCollection.add(book.getId());
        }

        return new ResponseEntity<>(bookCollection, HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping(path = "/api/AmazinBookStore-booksViewAll", produces = "application/json")
    public ResponseEntity<Collection> retrieveAllBookDetails() {
        return new ResponseEntity<>(bookRepository.findAll(), HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping(path = "/api/AmazinBookStore-book/{id}")
    ResponseEntity<Book> getById(@PathVariable("id") long id) {
        return new ResponseEntity<>(bookRepository.findById(id), HttpStatus.OK);
    }

    @ResponseBody
    @PostMapping(path = "/api/AmazinBookStore-addNewBook", consumes = "application/json")
    public ResponseEntity<HttpStatus> addNewBook(@RequestBody Book book) {

        Book newBook = new Book(
                book.getTitle(),
                book.getDescription(),
                book.getImageURL(),
                book.getPublicationYear(),
                book.getISBN(),
                book.getFormat(),
                book.getPrice(),
                book.getStockCount(),
                book.getRating()
        );
        bookRepository.save(newBook);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }



    @ResponseBody
    @PutMapping(path = "/api/AmazinBookStore-updateBook/{id}", consumes = "application/json")
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
                !book.getFormat().isEmpty() ||
                !book.getPrice().toString().isEmpty() ||
                !book.getStockCount().toString().isEmpty() ||
                !book.getRating().toString().isEmpty()
        ){

            tempBook.setTitle(book.getTitle());
            tempBook.setDescription(book.getDescription());
            tempBook.setImageURL(book.getImageURL());
            tempBook.setPublicationYear(book.getPublicationYear());
            tempBook.setISBN(book.getISBN());
            tempBook.setFormat(book.getFormat());
            tempBook.setPrice(book.getPrice());
            tempBook.setStockCount(book.getStockCount());
            tempBook.setRating(book.getRating());

        }
        bookRepository.save(tempBook);

        return new ResponseEntity<>(tempBook, HttpStatus.CREATED);
    }

    @ResponseBody
    @DeleteMapping(path = "/api/AmazinBookStore-removeBook")
    ResponseEntity<HttpStatus> removeBook(@RequestParam(name = "id") Long id) {
        bookRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
