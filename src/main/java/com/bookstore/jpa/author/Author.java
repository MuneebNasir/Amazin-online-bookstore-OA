package com.bookstore.jpa.author;

import com.bookstore.jpa.book.Book;

import javax.persistence.*;

@Entity
public class Author {

    @Id
    @GeneratedValue(generator = "author", strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;
    private String lastName;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Book book;

    public Author() {

    }

    public Author(String firstName, String lastName, Book book) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.book = book;
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

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}
