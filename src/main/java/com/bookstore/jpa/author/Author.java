package com.bookstore.jpa.author;

import com.bookstore.jpa.book.Book;
import javax.persistence.*;
import java.util.Collection;

@Entity
public class Author {

    @Id
    @GeneratedValue(generator = "author", strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;
    private String lastName;

    @OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    private Collection<Book> books;

    public Author() {

    }

    public Author(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Author(String firstName, String lastName, Collection<Book> books) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.books = books;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Collection<Book> getBooks() {
        return books;
    }

    public void setBooks(Collection<Book> books) {
        this.books = books;
    }
}
