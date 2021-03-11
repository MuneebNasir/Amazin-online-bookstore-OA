package jpa;

import com.bookstore.jpa.publisher.Publisher;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class PublisherTest {
    Publisher pb1;
    Publisher pb2;

    @BeforeEach
    public void setup() {
        pb1 = new Publisher("Hachette Livre", "France");
        pb2 = new Publisher("HarperCollins", "US");
    }

    @Test
    public void getters() {
        assertEquals("Hachette Livre", pb1.getName());
        assertNotEquals("France", pb1.getName());
        assertNotEquals("US", pb1.getName());

        assertEquals("France", pb1.getLocation());
        assertNotEquals("HarperCollins", pb1.getLocation());
        assertNotEquals("US", pb1.getLocation());
    }

    @Test
    public void setters() {
        pb1.setName("Macmillan Publishers");
        assertEquals("Macmillan Publishers", pb1.getName());
        assertNotEquals("", pb1.getName());
        assertNotEquals(null, pb1.getName());

        pb1.setLocation("London");
        assertEquals("London", pb1.getLocation());
        assertNotEquals("France", pb1.getLocation());
        assertNotEquals("", pb1.getLocation());
        assertNotEquals(null, pb1.getLocation());
    }
}
