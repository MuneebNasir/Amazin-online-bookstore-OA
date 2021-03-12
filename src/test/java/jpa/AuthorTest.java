package jpa;

import com.bookstore.jpa.author.Author;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class AuthorTest {
    Author a1;
    Author a2;
    Author a3;

    @BeforeEach
    public void setup() {
        a1 = new Author("Matt", "Sheer");
        a2 = new Author("James", "Dean");
        a3 = new Author();
    }

    @Test
    public void getters() {
        assertEquals("Matt", a1.getFirstName());
        assertEquals("Sheer", a1.getLastName());
        assertEquals("James", a2.getFirstName());
        assertEquals("Dean", a2.getLastName());

        assertNotEquals("Matt", a1.getLastName());
        assertNotEquals("Dean", a1.getLastName());
        assertNotEquals("James", a2.getLastName());
        assertNotEquals("Sheer", a2.getLastName());

        assertNotEquals("Matt", a1.getLastName());
        assertNotEquals("Dean", a1.getLastName());
        assertNotEquals("James", a2.getLastName());
        assertNotEquals("Sheer", a2.getLastName());
    }

    @Test
    public void setters() {
        a1.setFirstName("Mike");
        assertEquals("Mike", a1.getFirstName());
        assertNotEquals("Matt", a1.getFirstName());

        a2.setLastName("Dawn");
        assertEquals("Dawn", a2.getLastName());
        assertNotEquals("Dean", a2.getLastName());

        a3.setFirstName("Bart");
        assertEquals("Bart", a3.getFirstName());
        assertNotEquals(null, a3.getFirstName());

        a3.setLastName("Kernel");
        assertEquals("Kernel", a3.getLastName());
        assertNotEquals(null, a3.getLastName());
    }
}
