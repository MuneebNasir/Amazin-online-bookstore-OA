package com.bookstore.controller.author;

import com.bookstore.jpa.author.Author;
import com.bookstore.jpa.author.AuthorRepository;
import com.bookstore.utils.StringUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AuthorController {

    @Autowired
    private AuthorRepository authorRepository;

    /**
     * Retrieve all authors
     *
     * @return ResponseEntity
     */
    @GetMapping(path = "/api/authors")
    ResponseEntity<List<Author>> getAuthors() {
        List<Author> authors = authorRepository.findAll();
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    /**
     * Retrieve author with the given id
     *
     * @param id
     * @return ResponseEntity
     */
    @GetMapping(path = "/api/author")
    ResponseEntity<Author> getAuthorById(@RequestParam(name = "id") long id) {
        Author author = authorRepository.findById(id);
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    /**
     * Retrieve all authors with given first name
     * @param firstName
     * @return ResponseEntity
     */
    @GetMapping(path = "/api/authorsByFirstName")
    ResponseEntity<List<Author>> getAuthorsByFirstName(@RequestParam(name = "firstName") String firstName) {
        List<Author> authors = authorRepository.findAuthorsByFirstName(firstName);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    /**
     * Retrieve all authors with given last name
     * @param lastName
     * @return ResponseEntity
     */
    @GetMapping(path = "/api/authorsByLastName")
    ResponseEntity<List<Author>> getAuthorsByLastName(@RequestParam(name = "lastName") String lastName) {
        List<Author> authors = authorRepository.findAuthorsByLastName(lastName);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    /**
     * Retrieve all authors with given first and last names
     * @param firstName
     * @param lastName
     * @return ResponseEntity
     */
    @GetMapping(path = "/api/authorsByFirstAndLastName")
    ResponseEntity<List<Author>> getAuthorsByFirstAndLastName(@RequestParam(name = "firstName") String firstName, @RequestParam(name = "lastName") String lastName) {
        List<Author> authors = authorRepository.findAuthorsByFirstNameAndLastName(firstName, lastName);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    /**
     * Update author information
     *
     * @param author
     * @return ResponseEntity
     */
    @PostMapping(path = "/api/create-author", consumes = "application/json")
    ResponseEntity<Author> createAuthor(@RequestBody Author author) {
        Author authorToCreate = authorRepository.save(author);
        return new ResponseEntity<>(authorToCreate, HttpStatus.CREATED);
    }

    /**
     * Update author information
     *
     * @param author
     * @param id
     * @return ResponseEntity
     */
    @PutMapping(path = "/api/update-author", consumes = "application/json")
    ResponseEntity<Author> updateAuthor(@RequestBody Author author,
                                        @RequestParam("id") long id) {
        Author authorToUpdate = authorRepository.findById(id);
        if (authorToUpdate == null) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
        if (!StringUtility.isBlank(author.getFirstName())) {
            authorToUpdate.setFirstName(author.getFirstName());
        }
        if (!StringUtility.isBlank(author.getLastName())) {
            authorToUpdate.setLastName(author.getLastName());
        }
        if (author.getBook() != null) {
            authorToUpdate.setBook(author.getBook());
        }
        authorRepository.save(authorToUpdate);

        return new ResponseEntity<>(authorToUpdate, HttpStatus.OK);
    }

    /**
     * Remove the author by the given id
     *
     * @param id
     */
    @DeleteMapping(path = "/api/remove-author")
    ResponseEntity<HttpStatus> removeAuthorById(@RequestParam(name = "id") long id) {
        authorRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}