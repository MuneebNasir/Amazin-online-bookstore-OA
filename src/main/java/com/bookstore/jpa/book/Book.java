package com.bookstore.jpa.book;

import com.bookstore.jpa.author.Author;
import com.bookstore.jpa.publisher.Publisher;
import javax.persistence.*;

@Entity
public class Book {
    @Id
    @GeneratedValue(generator = "book", strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String description;
    private String imageURL;
    private Integer publicationYear;
    private String ISBN;
    private Double price;
    private Integer stockCount;
    private Double rating;
    private Genre genre;
    private Length length;
    private AgeGroup ageGroup;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn
    private Author author;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn
    private Publisher publisher;

    public Book() {

    }

    public Book(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public Book(String title, String description, String imageURL, Integer publicationYear, String ISBN, Double price, Integer stockCount, Double rating) {
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
        this.publicationYear = publicationYear;
        this.ISBN = ISBN;
        this.price = price;
        this.stockCount = stockCount;
        this.rating = rating;
    }

    public Book(String title, String description, String imageURL, Integer publicationYear, String ISBN, Double price, Integer stockCount, Double rating, Genre genre, Length length, AgeGroup ageGroup) {
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
        this.publicationYear = publicationYear;
        this.ISBN = ISBN;
        this.price = price;
        this.stockCount = stockCount;
        this.rating = rating;
        this.genre = genre;
        this.length = length;
        this.ageGroup = ageGroup;
    }

    public Book(String title, String description, String imageURL, Integer publicationYear, String ISBN, Double price, Integer stockCount, Double rating, Genre genre, Length length, AgeGroup ageGroup, Author author, Publisher publisher) {
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
        this.publicationYear = publicationYear;
        this.ISBN = ISBN;
        this.price = price;
        this.stockCount = stockCount;
        this.rating = rating;
        this.genre = genre;
        this.length = length;
        this.ageGroup = ageGroup;
        this.author = author;
        this.publisher = publisher;
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

    public Author getAuthor() {
        return author;
    }

    public void setAuthors(Author author) {
        this.author = author;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Length getLength() {
        return length;
    }

    public void setLength(Length length) {
        this.length = length;
    }

    public AgeGroup getAgeGroup() {
        return ageGroup;
    }

    public void setAgeGroup(AgeGroup ageGroup) {
        this.ageGroup = ageGroup;
    }
}
