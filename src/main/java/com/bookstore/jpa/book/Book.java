package com.bookstore.jpa.book;

import com.bookstore.jpa.author.Author;
import com.bookstore.jpa.enums.Format;
import com.bookstore.jpa.publisher.Publisher;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Book {

    @Id
    @GeneratedValue(generator = "book", strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String imageURL;
    private Integer publicationYear;
    private String ISBN;
    private Double price;
    private Integer stockCount;
    private Double rating;

    @JoinColumn()
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Collection<Author> authors;

    @ManyToOne(fetch = FetchType.LAZY)
    private Publisher publisher;

    @Enumerated(EnumType.STRING)
    private Format format;

//    private Long genreID;

    public Book() {

    }

    public Book(String title, String description, String imageURL, Integer publicationYear, String ISBN, Format format, Double price, Integer stockCount, Double rating) {
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
        this.publicationYear = publicationYear;
        this.ISBN = ISBN;
        this.format = format;
        this.price = price;
        this.stockCount = stockCount;
        this.rating = rating;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Integer getPublicationYear() {
        return publicationYear;
    }

    public void setPublicationYear(Integer publicationYear) {
        this.publicationYear = publicationYear;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public String getFormat() {
        return format.toString();
    }

    public void setFormat(Format format) {
        this.format = format;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStockCount() {
        return stockCount;
    }

    public void setStockCount(Integer stockCount) {
        this.stockCount = stockCount;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Collection<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(Collection<Author> authors) {
        this.authors = authors;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }
}
