package jpa;

import com.bookstore.jpa.book.Book;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class BookTest {

    Book book;

    @BeforeEach
    public void setup() {
        book = new Book(
                "The Book of Awesome",
                "Neil Pasricha",
                2011,
                "0425238903",
                17.99,
                12,
                4.25);
    }

    @Test
    public void getters() {
        assertEquals("The Book of Awesome", book.getTitle());
        assertEquals("Neil Pasricha", book.getDescription());
        assertEquals(2011, book.getPublicationYear());
        assertEquals("0425238903", book.getISBN());
        assertEquals(17.99, book.getPrice());
        assertEquals(12, book.getStockCount());
        assertEquals(4.25, book.getRating());

        assertNotEquals("Hachette Livre", book.getTitle());
        assertNotEquals("Hachette Livre", book.getDescription());
        assertNotEquals(1992, book.getPublicationYear());
        assertNotEquals("Hachette Livre", book.getISBN());
        assertNotEquals(420.69, book.getPrice());
        assertNotEquals(13, book.getStockCount());
        assertNotEquals(8008.5, book.getRating());
    }

    @Test
    public void setters() {
        book.setTitle("Best Book");
        book.setDescription("A book you can't let go.");
        book.setPublicationYear(1997);
        book.setISBN("Something-Awesome");
        book.setPrice(1.99);
        book.setStockCount(1);
        book.setRating(5.0);
        assertEquals("Best Book", book.getTitle());
        assertEquals("A book you can't let go.", book.getDescription());
        assertEquals(1997, book.getPublicationYear());
        assertEquals("Something-Awesome", book.getISBN());
        assertEquals(1.99, book.getPrice());
        assertEquals(1, book.getStockCount());
        assertEquals(5.0, book.getRating());

        assertNotEquals("The Book of Awesome", book.getTitle());
        assertNotEquals("Neil Pasricha", book.getDescription());
        assertNotEquals(2011, book.getPublicationYear());
        assertNotEquals("0425238903", book.getISBN());
        assertNotEquals(17.99, book.getPrice());
        assertNotEquals(12, book.getStockCount());
        assertNotEquals(4.25, book.getRating());

    }

}
