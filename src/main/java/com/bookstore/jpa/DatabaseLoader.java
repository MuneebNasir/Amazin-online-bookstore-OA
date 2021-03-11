package com.bookstore.jpa;

import com.bookstore.jpa.book.Book;
import com.bookstore.jpa.book.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final BookRepository repository;

    @Autowired
    public DatabaseLoader(BookRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Book(
                "Lord of the Rings",
                "Bretty Gud",
                "/shiggydiggy/",
                1992,
                "ABC",
                "Paperback",
                420.69,
                12,
                8008.5));
        this.repository.save(new Book(
                "My Fair Lady",
                "Bretty Bad",
                "/shiggydiggy/",
                132,
                "ABC",
                "Paperback",
                420.69,
                12,
                8008.5));
        this.repository.save(new Book(
                "Hunger Game",
                "Yeet",
                "/shiggydiggy/",
                132,
                "ABC",
                "Paperback",
                420.69,
                12,
                8008.5));
    }
}
