package com.bookstore.jpa.publisher;

import com.bookstore.jpa.book.Book;
import javax.persistence.*;
import java.util.Collection;


@Entity
public class Publisher {

    @Id
    @GeneratedValue(generator = "publisher", strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String location;

    @OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    private Collection<Book> books;

    public Publisher() {

    }

    public Publisher(String name, String location) {
        this.name = name;
        this.location = location;
    }

    public Publisher(String name, String location, Collection<Book> books) {
        this.name = name;
        this.location = location;
        this.books = books;
    }

    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Collection<Book> getBooks() {
        return books;
    }

    public void setBooks(Collection<Book> books) {
        this.books = books;
    }
}
