package JPA;

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
        assertEquals("Matt", a1.getfName());
        assertEquals("Sheer", a1.getlName());
        assertEquals("James", a2.getfName());
        assertEquals("Dean", a2.getlName());

        assertNotEquals("Matt", a1.getlName());
        assertNotEquals("Dean", a1.getlName());
        assertNotEquals("James", a2.getlName());
        assertNotEquals("Sheer", a2.getlName());

        assertNotEquals("Matt", a1.getlName());
        assertNotEquals("Dean", a1.getlName());
        assertNotEquals("James", a2.getlName());
        assertNotEquals("Sheer", a2.getlName());
    }

    @Test
    public void setters() {
        a1.setfName("Mike");
        assertEquals("Mike", a1.getfName());
        assertNotEquals("Matt", a1.getfName());

        a2.setlName("Dawn");
        assertEquals("Dawn", a2.getlName());
        assertNotEquals("Dean", a2.getlName());

        a3.setfName("Bart");
        assertEquals("Bart", a3.getfName());
        assertNotEquals(null, a3.getfName());

        a3.setlName("Kernel");
        assertEquals("Kernel", a3.getlName());
        assertNotEquals(null, a3.getlName());
    }
}
