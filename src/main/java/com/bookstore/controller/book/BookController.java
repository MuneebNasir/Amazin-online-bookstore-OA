package com.bookstore.controller.book;

import com.bookstore.jpa.author.Author;
import com.bookstore.jpa.author.AuthorRepository;
import com.bookstore.jpa.book.Book;
import com.bookstore.jpa.book.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import com.bookstore.jpa.publisher.Publisher;
import com.bookstore.jpa.publisher.PublisherRepository;

/**
 * Book API Controller
 *
 * @author Youssef Saghbini
 */

@Controller
public class BookController {

    public double JACCARD_VALUE = 0.5;

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private PublisherRepository publisherRepository;


    @ResponseBody
    @GetMapping(path = "/api/allBookIDs", produces = "application/json")
    public ResponseEntity<Collection> retrieveAllBookIDs() {
        Collection bookCollection = new ArrayList<>();
        for (Book book : bookRepository.findAll()) {
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
    public ResponseEntity<HttpStatus> addNewBook(@RequestBody Book book,
                                                 @RequestParam(name = "authorId") Long authorId,
                                                 @RequestParam(name = "publisherId") Long publisherId) {
        Author author;
        Optional<Author> authorRetrieval = authorRepository.findById(authorId);
        author = authorRetrieval.isPresent() ? authorRetrieval.get() : null;

        Publisher publisher;
        Optional<Publisher> publisherRetrieval = publisherRepository.findById(publisherId);
        publisher = publisherRetrieval.isPresent() ? publisherRetrieval.get() : null;

        Book newBook = new Book(
                book.getTitle(),
                book.getDescription(),
                book.getPublicationYear(),
                book.getISBN(),
                book.getPrice(),
                book.getStockCount(),
                book.getRating(),
                book.getGenre(),
                book.getLength(),
                book.getAgeGroup(),
                author,
                publisher
        );
        bookRepository.save(newBook);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @ResponseBody
    @PutMapping(path = "/api/updateBook/{id}", consumes = "application/json")
    public ResponseEntity<Book> updateBook(@RequestBody Book book,
                                           @PathVariable("id") long id) {

        Book tempBook = bookRepository.findById(id);
        if (tempBook == null) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
        if (
                !book.getTitle().isEmpty() ||
                        !book.getDescription().isEmpty() ||
                        !book.getPublicationYear().toString().isEmpty() ||
                        !book.getISBN().isEmpty() ||
                        !book.getPrice().toString().isEmpty() ||
                        !book.getStockCount().toString().isEmpty() ||
                        !book.getRating().toString().isEmpty()
        ) {

            tempBook.setTitle(book.getTitle());
            tempBook.setDescription(book.getDescription());
            tempBook.setPublicationYear(book.getPublicationYear());
            tempBook.setISBN(book.getISBN());
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

    @ResponseBody
    @GetMapping(path = "/api/recommendBooks")
    public ResponseEntity<Collection> recommendBooks(@RequestParam(name = "bookId") String userBookId) {
        Collection<Book> books = bookRepository.findAll();
        long id = Long.parseLong(userBookId);
        Book userBook = bookRepository.findById(id);

        // Filter the total list of books, based on whether they are similar enough to the passed in UserBook
        List<Book> filteredBooks = books
                .stream()
                .filter(book -> calcJaccardDistance(book, userBook) >= JACCARD_VALUE)
                .collect(Collectors.toList());

        return new ResponseEntity<>(filteredBooks, HttpStatus.OK);
    }

    /**
     * Calculate the Jaccard distance between two books - an algorithmic way to determine the "likeness" between two
     * sets of data. In this case, the "sets" of data checked for similarity between the two books are Genre, Length,
     * and AgeGroup.
     *
     * @param book     book from collection of books currently being iterated over
     * @param userBook master book, from which we are finding books that are "similar enough" to
     * @return The Jaccard value, as a decimal value between 0 and 1
     */
    private static double calcJaccardDistance(Book book, Book userBook) {
        int sharedSize = 0;
        int totalSize = 0;

        if (book.getGenre() == userBook.getGenre()) {
            sharedSize += 1;
            totalSize += 1;
        } else {
            totalSize += 2;
        }
        if (book.getLength() == userBook.getLength()) {
            sharedSize += 1;
            totalSize += 1;
        } else {
            totalSize += 2;
        }
        if (book.getAgeGroup() == userBook.getAgeGroup()) {
            sharedSize += 1;
            totalSize += 1;
        } else {
            totalSize += 2;
        }
        return ((double) sharedSize) / ((double) totalSize);
    }

}
